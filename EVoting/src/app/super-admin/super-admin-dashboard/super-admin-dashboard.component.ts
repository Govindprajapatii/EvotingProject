import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';


@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
// @Input("inputSideNav")


 totalAdmins = 0;
 deactivatedAdmins = 0;
 activeAdmins = 0;

  constructor(private superAdminService:SuperAdminService) { }
 inputSidenav : MatSidenav;
  ngOnInit(): void {
     this.loadAdminCount();
  }
  loadAdminCount(){
     var countObject = this.superAdminService.getAdminCountList();
     this.totalAdmins = countObject.toatlAdminCount;
     this.activeAdmins = countObject.activeAdminCount;
     this.deactivatedAdmins = countObject.toatlAdminCount - countObject.activeAdminCount;
  }

}
