import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eidt-admin',
  templateUrl: './eidt-admin.component.html',
  styleUrls: ['./eidt-admin.component.scss']
})
export class EidtAdminComponent implements OnInit {

  constructor(private dialolgRef : MatDialogRef<EidtAdminComponent>) { }

  adminForm = new FormGroup({
    FirstName: new FormControl('Govind', [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl('Prajapati', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('Govind@gmail.com', [Validators.required, Validators.minLength(6), Validators.email]),
      Colony: new FormControl('E-complex', [Validators.required, Validators.minLength(5)]),
      Mobile: new FormControl('9171292244', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      Gender : new FormControl('Male',[Validators.required]),
      DOB: new FormControl('2000-07-05', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      Address: new FormControl('E-complex, Indore.', [Validators.required, Validators.minLength(5)]),
    
      })
      
  ngOnInit(): void {
  }

  onSubmit(){

  }
close(){
this.dialolgRef.close();
}  
  get FirstName(){
    return this.adminForm.get('FirstName');
  }
  
  get LastName(){
    return this.adminForm.get('LastName');
  }
  get Email(){
    return this.adminForm.get('Email');
  }
  get DOB(){
    return this.adminForm.get('DOB');
  }
  get Mobile(){
    return this.adminForm.get('Mobile');
  }
  get Colony(){
    return this.adminForm.get('Colony');
  }
  get Address(){
    return this.adminForm.get('Address');
  }
  get Gender(){
    return this.adminForm.get('Gender');
  }

}
