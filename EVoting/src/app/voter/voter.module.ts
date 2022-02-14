import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoterRoutingModule } from './voter-routing.module';
import { VoterComponent } from './voter.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PollsComponent } from './polls/polls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoteCastComponent } from './vote-cast/vote-cast.component';


@NgModule({
  declarations: [
    VoterComponent,
    HomeComponent,
    ProfileComponent,
    PollsComponent,
    VoteCastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    VoterRoutingModule
  ]
})
export class VoterModule { }
