import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { VotersTableComponent } from './voters-table/voters-table.component';
import { AddElectionComponent } from './add-election/add-election.component';
import { ElectionsComponent } from './elections/elections.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {path:'',component:AdminComponent,children:[
    { path:'',component:AdminDashboardComponent},
    { path:'Profile',component:ProfileComponent},
    { path:'Voters',component:VotersTableComponent},
    { path: 'AddElection', component:AddElectionComponent},
    { path: 'Elections',component:ElectionsComponent},
    { path: 'Results', component:ResultsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
