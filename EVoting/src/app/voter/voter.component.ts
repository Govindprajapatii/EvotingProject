import { Component, OnInit } from '@angular/core';
import { AuthenthicationService } from '../servicies/authenthication.service';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss']
})
export class VoterComponent implements OnInit {

  constructor(private authService:AuthenthicationService) { }

  ngOnInit(): void {
  }
  logoutClick(){
  this.authService.logOut();
  window.location.reload();
  }

}
