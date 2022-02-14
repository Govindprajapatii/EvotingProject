import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenthicationService } from 'src/app/servicies/authenthication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthenthicationService,private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
   this.authService.logOut();
   window.location.reload();
  }

}
