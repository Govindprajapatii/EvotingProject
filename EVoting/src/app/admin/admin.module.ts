import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { AddElectionComponent } from './add-election/add-election.component';
import { VotersProfileComponent } from './voters-profile/voters-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotersTableComponent } from './voters-table/voters-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BlockedVotersTableComponent } from './blocked-voters-table/blocked-voters-table.component';
import { ElectionsComponent } from './elections/elections.component';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    SidenavComponent,
    AdminComponent,
    AdminDashboardComponent,
    ProfileComponent,
    AddElectionComponent,
    VotersProfileComponent,
    VotersTableComponent,
    BlockedVotersTableComponent,
    ElectionsComponent,
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AdminModule { }
