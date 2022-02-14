import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenthicationService } from '../servicies/authenthication.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

   public constructor(private authService:AuthenthicationService,
    private router:Router
    ){
   }
  canActivate(){
   if(this.authService.getUserRole() == "Admin"){
return true;
    }
    return false;    
  }
  
}
