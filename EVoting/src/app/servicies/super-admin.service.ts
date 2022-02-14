import { HttpClient } from '@angular/common/http';
import { Injectable, IterableDiffers } from '@angular/core';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { EmployeeTableItem } from '../super-admin/adimn-table/admin-table-datasource';

import { IUserData } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  
  private static adminData :IUserData[] = [];

  private readonly apiUrl = "https://localhost:44366/api/Users";
  constructor(private http :HttpClient) { }

  getColonies()
  {
  return this.http.get(`${this.apiUrl}`);
  }



  loadUserData(){
    this.http.get(`${this.apiUrl}/AdminsList`).subscribe(x =>
      {
      SuperAdminService.adminData = x as IUserData[];
      });
  }

  getAdminData():Observable<IUserData[]>{

    console.log(SuperAdminService.adminData);
    return of(SuperAdminService.adminData);

  }



getAdminCountList(){

 let totalAdminCount = 0;
 let activeAdminCount = 0;
  for (let user of SuperAdminService.adminData){
     if(user.status == 'Active')
     {
       activeAdminCount += 1;
     }
  }
  totalAdminCount = SuperAdminService.adminData.length;
  return {"toatlAdminCount":totalAdminCount,"activeAdminCount":activeAdminCount};
}



getAdminsList():Observable<EmployeeTableItem[]>{
  console.log(SuperAdminService.adminData);

  return of(SuperAdminService.adminData as unknown  as EmployeeTableItem[]);
}

updateStatus(id,status){
 let arr = {"id": id,"Status":status}
return this.http.post(`${this.apiUrl}/UpdateAdminStatus`,arr);
}
 
}
