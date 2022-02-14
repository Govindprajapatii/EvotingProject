import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SuperAdminComponent } from './super-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminsComponent } from './admins/admins.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdimnTableComponent } from './adimn-table/admin-table.component';
import { EidtAdminComponent } from './eidt-admin/eidt-admin.component';
@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    SidenavComponent,
    SuperAdminComponent,
    ProfileComponent,
    AdminsComponent,
    AdminRegistrationComponent,
    AdimnTableComponent,
    EidtAdminComponent,
   

  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    AuthenticationModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule

  ]
  
})
export class SuperAdminModule { }
