import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { IUserData } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthenthicationService {

private readonly apiUrl = "https://localhost:44366/api/Auth";
private readonly jwt_token = 'JWT_TOKEN';
private readonly refresh_token = 'REFRESH_TOKEN';
private userName = "";
private res :string;
constructor(private router:Router, private http:HttpClient) { }




signUp(UserData:any):Observable<boolean>{
  
UserData.PhoneNumber = UserData.PhoneNumber.toString();
  console.log(UserData);
  // var temp = {"firstName":"Govind","lastName":"Prajapati","Email":"ABC@com","password":"Govind@11"}
return this.http.post<any>(`${this.apiUrl}/Register`,UserData).pipe(
  tap(response => this.doLoginUser(UserData.Email,response)),
  mapTo(true),
  catchError(error => {
    console.log(error);
    return of(false); 
  })
);
}



logIn(user : {Email:string,Password:string,UserRole:string}): Observable<boolean>{
 return this.http.post<any>(`${this.apiUrl}/Login`, user).pipe(
   tap(response => {this.doLoginUser(user.Email, response);}),
   mapTo(true),
   catchError(error => {
   this.removeTokens();
     return of(false);
   }));
 
 

}


logOut():Observable<boolean>{
  this.loggedOutUser()
 return of(true);
    }

refreshToken() {
  return this.http.post<any>(`${this.apiUrl}/RefreshToken`, {'jwtToken':this.getJwtToken(),
    'refreshToken': this.getRefreshToken()
  }).pipe(tap((tokens: any) => {
    this.storeJwtToken(tokens.token);
    this.storeRefreshToken(tokens.refreshToken)
  }));
}


isLoggedIn() : boolean{
  if(this.getJwtToken().length<10){
    return false;
  }
  return true;
} 

private doLoginUser(userName,tokens){
 this.userName = userName;
 this.storeTokens(tokens);
}
 

private storeTokens(tokens){
 
  sessionStorage.setItem("UserRole",tokens.userRole);
  sessionStorage.setItem(this.jwt_token,tokens.token);
  sessionStorage.setItem(this.refresh_token,tokens.refreshToken)
}


private getRefreshToken(){
  return  sessionStorage.getItem(this.refresh_token);
}

getJwtToken(){
  return sessionStorage.getItem(this.jwt_token);
}

private loggedOutUser(){
this.userName = null;
this.removeTokens();
}


private removeTokens(){
  sessionStorage.removeItem(this.jwt_token);
  sessionStorage.removeItem(this.refresh_token);
  sessionStorage.removeItem("UserRole");

}

private storeJwtToken(token:any){
  sessionStorage.setItem(this.jwt_token,token);
}

getUserRole() {
  return sessionStorage.getItem("UserRole");
}

storeRefreshToken(refreshToken){
  sessionStorage.setItem(this.refresh_token,refreshToken);

}

}
