import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { AppModule } from '../app.module';
import { VoterRegistrationComponent } from './voter-registration/voter-registration.component';

@NgModule({
  declarations: [
    LoginComponent,
    VoterRegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,

  ],
  

})
export class AuthenticationModule { }
