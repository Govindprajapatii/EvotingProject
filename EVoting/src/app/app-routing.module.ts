import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }from './AuthGuard/auth-gaurd.guard'
import { VoterRegistrationComponent } from './authentication/voter-registration/voter-registration.component';
import { AdminAuthGuard } from './AuthGuard/AdminAuthGuard';
import { SuperAdminAuthGuard } from './AuthGuard/SuperAdminAuthGuard';
import { VoterAuthGuard } from './AuthGuard/voterAuthGuard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "",component:HomeComponent  },
  {path:"SuperAdmin",loadChildren:() => import('./super-admin/super-admin-routing.module').then((m) => m.SuperAdminRoutingModule),canActivate: [AuthGuard,SuperAdminAuthGuard]},
  { path:"Admin",loadChildren:() => import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),canActivate: [AuthGuard,AdminAuthGuard]},
  { path:"Voter",loadChildren:()=> import('./voter/voter-routing.module').then(m => m.VoterRoutingModule ),canActivate: [AuthGuard,VoterAuthGuard]},
  { path:"SignUp",component: VoterRegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
