import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PollsComponent } from './polls/polls.component';
import { VoterComponent } from './voter.component';
import { VoteCastComponent } from './vote-cast/vote-cast.component';

const routes: Routes = [
  { path:"",component:VoterComponent ,children:[
    {path:"",component:HomeComponent},
    {path:"Polls",component:PollsComponent},
    {path:"Profile",component:ProfileComponent},
    {path:"VoteCast/:id",component:VoteCastComponent}


  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoterRoutingModule { }
