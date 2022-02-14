import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = "https://localhost:44366/api/Users/AllColonies";
  constructor(private http :HttpClient) { }


  getColonies()
  {
  return this.http.get(`${this.apiUrl}`);
  }
}
