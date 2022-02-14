import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef} from '@angular/material/dialog'
import { LoginComponent } from '../authentication/login/login.component';
import { AuthenthicationService } from '../servicies/authenthication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private dialog:MatDialog,private authService:AuthenthicationService) { }
  
  isLogedIn = false;
  link = "Home";
  ngOnInit(): void {
    this.checkLoginStatus();
    this.getLink();
  }
  
 public loginButton = false;
  onLoginOpen(){
    this.loginButton = !this.loginButton;
    this.dialog.open(LoginComponent,{disableClose:true});
  }
  onLoginClose(){
    this.dialog.closeAll();
    this.loginButton = !this.loginButton;
  }
  checkLoginStatus(){
    this.isLogedIn = this.authService.isLoggedIn();
  }

getLink(){
  this.link = this.authService.getUserRole();
}

}
