import { HttpClient } from '@angular/common/http';
import { Injectable, IterableDiffers } from '@angular/core';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { AdminTableItem } from '../super-admin/adimn-table/admin-table-datasource';

import { IUserData } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private readonly apiUrl = "https://localhost:44366/api/Users";
  constructor(private http :HttpClient) { }

  


  loadUserData(){
    this.http.get(`${this.apiUrl}/AdminsList`).subscribe(x =>
      {
      console.log(x);
      sessionStorage.setItem('UserData',JSON.stringify(x));
      });
  }

  getAdminData(id):Observable<IUserData[]>{
    var adminData = JSON.parse(sessionStorage.getItem("UserData"));
    for(let admin of adminData)
    {

      if(admin.userId == id)
      {
        return of(admin); 
      }
    }
    return of(null);
  }



getAdminCountList(){
 let totalAdminCount = 0;
 let activeAdminCount = 0;

 var adminData = JSON.parse(sessionStorage.getItem("UserData"));

  for (let user of adminData){
     if(user.status == 'Active')
     {
       activeAdminCount += 1;
     }
  }
  totalAdminCount = adminData.length;
  return {"toatlAdminCount":totalAdminCount,"activeAdminCount":activeAdminCount};
}

getAdminsList():Observable<AdminTableItem[]>{
 var adminData = JSON.parse(sessionStorage.getItem("UserData"));
  console.log(adminData);

  return of(adminData as unknown  as AdminTableItem[]);
}

updateStatus(id,status){
 let arr = {"id": id,"Status":status}
return this.http.post(`${this.apiUrl}/UpdateAdminStatus`,arr);
}
 
}
