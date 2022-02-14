import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenthicationService } from 'src/app/servicies/authenthication.service';
import { UserService } from 'src/app/servicies/user.service';
import { map, Observable, startWith } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-voter-registration',
  templateUrl: './voter-registration.component.html',
  styleUrls: ['./voter-registration.component.scss']
})
export class VoterRegistrationComponent implements OnInit {
  constructor(private router:Router, private authService :AuthenthicationService,
    private userService:UserService) { }
  hide = true;
 colonies : string[] =[];

  filteredOptions: Observable<string[]>;
  ngOnInit(): void {

   
     this.userService.getColonies().subscribe(colonies =>
        {
          this.colonies = colonies as [];
        });
      
      this.filteredOptions = this.Colony.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
        );
 
  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.colonies.filter(option => option.toLowerCase().includes(filterValue));
  }





  VoterReg = new FormGroup(
    {
      userId : new FormControl('1234'),
      FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
      Colony: new FormControl('', [Validators.required, Validators.minLength(5)]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      Gender : new FormControl('',[Validators.required]),
      DOB: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      Role: new FormControl('Voter', [Validators.required]),
      Address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])

    }, { validators: passwordMatchValidator }
  );


  get Role(){
    return this.VoterReg.get("Role");
  }
  get FirstName() {
    return this.VoterReg.get('FirstName');
  }

  get LastName() {
    return this.VoterReg.get('LastName');
  }

  get Email() {
    return this.VoterReg.get('Email');
  }

  get Colony() {
    return this.VoterReg.get('Colony');
  }

  get Address() {
    return this.VoterReg.get('Address');
  }

  get PhoneNumber() {
    return this.VoterReg.get('PhoneNumber');
  }

  get Password() {
    return this.VoterReg.get('Password');
  }
  get ConfirmPassword() {
    return this.VoterReg.get('ConfirmPassword');
  }
  get Gender(){
    return this.VoterReg.get('Gender');
  }

  get DOB() {
    return this.VoterReg.get('DOB');
  }

  onSubmit() {

    const result = this.colonies.find(ele => ele == this.Colony.value);
    if(!result){

      alert("Select a valid colony");   
      return;
    }
    
  console.log(this.VoterReg.value);
  
    const UserData = 
      {
        "FirstName":this.FirstName.value,
        "LastName":this.LastName.value,
        "Email":this.Email.value,
        "PhoneNumber":this.PhoneNumber.value,
        "DateOfBirth":this.DOB.value,
        "Role":this.Role.value,
        "Password":this.Password.value,
        "Gender":this.Gender.value,
        "Address":this.Address.value,
        "Colony":this.Colony.value
     }
   
   ;
    this.authService.signUp(UserData).subscribe(status =>
      {
        if(status)
        {
          this.router.navigateByUrl(this.authService.getUserRole());
          Swal.fire('Thank you...', 'Registred Successfully!', 'success');    
        }
        else{
          this.VoterReg.clearValidators();
          Swal.fire('Sorry....', 'Registration Failed!.. Please Try Again.', 'error');   
        }
      });

  }

  onConfirmPassword() {
    if (this.VoterReg.hasError('passwordMismatch')) {
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