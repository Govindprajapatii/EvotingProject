import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdimnTableComponent } from './adimn-table/admin-table.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
  { path:'',component:SuperAdminComponent,
    children:[
     { path:'',component:SuperAdminDashboardComponent},
     { path:'Admins',component:AdimnTableComponent},
     { path:'Profile',component:ProfileComponent},
     { path: 'AdminRegistration',component:AdminRegistrationComponent}

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }

