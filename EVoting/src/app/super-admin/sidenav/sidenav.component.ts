import { Component, OnInit } from '@angular/core';
import { AuthenthicationService } from 'src/app/servicies/authenthication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authService:AuthenthicationService) { }

  ngOnInit(): void {
  }
  logOut(){
    this.authService.logOut();
    window.location.replace("./");

   }
 
}
