import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';

@Component({
  selector: 'app-eidt-admin',
  templateUrl: './eidt-admin.component.html',
  styleUrls: ['./eidt-admin.component.scss']
})
export class EidtAdminComponent implements OnInit {

adminData;

  constructor(private dialolgRef: MatDialogRef<EidtAdminComponent>, private superAdminService : SuperAdminService,  @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 


  }

  adminForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
    Colony: new FormControl('', [Validators.required, Validators.minLength(5)]),
    Mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    Gender: new FormControl('', [Validators.required]),
    DOB: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    Address: new FormControl('', [Validators.required, Validators.minLength(5)]),

  })

  ngOnInit(): void {
    this.getUserById(this.data.userId)
  }


//Get Admin Detail By Id
getUserById(id){
  this.superAdminService.getAdminData(id).subscribe(x=>{
    this.adminData = x;
  // console.log(this.adminData);
  this.adminForm.get("FirstName").setValue(this.adminData.firstName);
  this.adminForm.get("LastName").setValue(this.adminData.lastName);
  this.adminForm.get("Email").setValue(this.adminData.email);
  this.adminForm.get("Gender").setValue(this.adminData.gender);
  this.adminForm.get("Mobile").setValue(this.adminData.phoneNumber);
  this.adminForm.get("DOB").setValue(this.adminData.dateOfBirth);
  this.adminForm.get("Colony").setValue(this.adminData.colony);
  this.adminForm.get("Address").setValue(this.adminData.address);
  // this.adminForm.get("Status").setValue(this.adminData.status);
  // this.adminForm.get("RegistrationDate").setValue(this.adminData.registrationDate as Date);
  
  });
  }



  onSubmit() {

  }
  close() {
    this.dialolgRef.close();
  }
  get FirstName() {
    return this.adminForm.get('FirstName');
  }

  get LastName() {
    return this.adminForm.get('LastName');
  }
  get Email() {
    return this.adminForm.get('Email');
  }
  get DOB() {
    return this.adminForm.get('DOB');
  }
  get Mobile() {
    return this.adminForm.get('Mobile');
  }
  get Colony() {
    return this.adminForm.get('Colony');
  }
  get Address() {
    return this.adminForm.get('Address');
  }
  get Gender() {
    return this.adminForm.get('Gender');
  }

}
