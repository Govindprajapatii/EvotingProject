import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SuperAdminService } from '../servicies/super-admin.service';

@HostListener('window:resize', ['$event'])

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
@HostListener('window:resize', ['$event'])
export class SuperAdminComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav:MatSidenav
  Mode;
  HasBackdrop = false;
  constructor(private superAdminService : SuperAdminService) {
    this.Mode = 'side';
   }
  
  ngOnInit(): void {
    this.superAdminService.loadUserData();
    this.onResize();
  }
  
  onResize() {
      if (window.innerWidth < 500) {
          this.Mode = 'over';
          this.HasBackdrop = true;
      }
      else{
        this.Mode = 'side';
        this.HasBackdrop = false;
      }
    

  }
}
