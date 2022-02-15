import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  adminData;
  constructor(public dialogRef: MatDialogRef<AdminsComponent>, private superAdminService : SuperAdminService,  @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  adminForm = new FormGroup({
    FirstName : new FormControl(),
    LastName : new FormControl(''),
    Email : new FormControl(''),
    Mobile : new FormControl(''),
    Gender: new FormControl(''),
    DOB : new FormControl(''),
    Colony : new FormControl(''),
    Address : new  FormControl(''),
    Status : new FormControl(''),
    RegistrationDate : new FormControl('')
    
      })

  ngOnInit(): void {
    this.adminForm.disable();
    this.getUserById(this.data.userId);
   
  }
close(){
this.dialogRef.close();

}

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
this.adminForm.get("Status").setValue(this.adminData.status);
this.adminForm.get("RegistrationDate").setValue(this.adminData.registrationDate as Date);

});
}


}
