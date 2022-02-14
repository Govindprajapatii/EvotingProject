import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthenthicationService } from 'src/app/servicies/authenthication.service';

import { NotificationService } from 'src/app/servicies/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private matDialogRef : MatDialogRef<LoginComponent>,
    private notification : NotificationService,
     private router : Router,
  private authenthicationService : AuthenthicationService

    )
     { }

  loginForm  = new FormGroup({
    Email : new FormControl('',[Validators.required,Validators.email,Validators.minLength(6)]),
    userRole : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
  }
  onLoginClose(){
    this.matDialogRef.close();
  }


async  onSubmit(){
    // this.notification.showSuccess("Success","Login Success");
    //   this.onLoginClose();
      await this.authenthicationService.logIn(this.loginForm.value).subscribe(isLoginSuccess=>{ 
        if(isLoginSuccess)
        {
          this.notification.showSuccess("Success","Login Success");
          this.onLoginClose();
          this.router.navigateByUrl(this.UserRole.value);
         }
         else{
          this.notification.showError("Error","Login Failed");
          this.onLoginClose();
         }
         setTimeout(()=>{
          window.location.reload();
         },200);
      });
       }

  get Email(){
    return this.loginForm.get("userName");
  }

  get password(){
    return this.loginForm.get("password");
  }
  get UserRole(){
    return this.loginForm.get("userRole");
  }  
}
