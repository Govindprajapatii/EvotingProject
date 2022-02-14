
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenthicationService } from '../servicies/authenthication.service';



@Injectable({
  providedIn: 'root'
})
export class VoterAuthGuard implements CanActivate {

   public constructor(private authService:AuthenthicationService,
    private router:Router
    ){
   }
  canActivate(){
   if(this.authService.getUserRole() == "Voter"){
return true;
    }
    return false;    
  }
  
}
