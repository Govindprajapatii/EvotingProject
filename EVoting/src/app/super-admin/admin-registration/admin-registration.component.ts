import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenthicationService } from 'src/app/servicies/authenthication.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthenthicationService
    ) { }
  hide = true;

  ngOnInit(): void {
  }

  AdminReg = new FormGroup(
    {
      FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
      Colony: new FormControl('', [Validators.required, Validators.minLength(5)]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      Gender : new FormControl('',[Validators.required]),
      DOB: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      Role: new FormControl('Admin', [Validators.required]),
      Address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])

    }, { validators: passwordMatchValidator }
  );

  get FirstName() {
    return this.AdminReg.get('FirstName');
  }

  get LastName() {
    return this.AdminReg.get('LastName');
  }

  get Email() {
    return this.AdminReg.get('Email');
  }

  get Colony() {
    return this.AdminReg.get('Colony');
  }

  get Address() {
    return this.AdminReg.get('Address');
  }

  get PhoneNumber() {
    return this.AdminReg.get('PhoneNumber');
  }

  get Password() {
    return this.AdminReg.get('Password');
  }
  get ConfirmPassword() {
    return this.AdminReg.get('ConfirmPassword');
  }
  get Gender(){
    return this.AdminReg.get('Gender');
  }

  get DOB() {
    return this.AdminReg.get('DOB');
  }

  onSubmit() {

    this.authService.signUp(this.AdminReg.value).subscribe(status =>
      {
        if(status)
        {
          this.router.navigateByUrl(this.authService.getUserRole());
          Swal.fire('Thank you...', 'Registred Successfully!', 'success');    
        }
        else{

          this.AdminReg.clearValidators();
          Swal.fire('Sorry....', 'Registration Failed!.. Please Try Again.', 'error');   
        }
      });


  }

  onConfirmPassword() {
    if (this.AdminReg.hasError('passwordMismatch')) {
      this.ConfirmPassword.setErrors([{ passwordMatchValidator: true }]);
    }
    else {
      this.ConfirmPassword.setErrors(null);
    }
  }
 
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('Password').value === formGroup.get('ConfirmPassword').value)
    return null;
  else
    return { passwordMismatch: true };
};