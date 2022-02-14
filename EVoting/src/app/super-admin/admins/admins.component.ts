import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminsComponent>, private superAdminService : SuperAdminService) { }

  adminForm = new FormGroup({
FirstName : new FormControl('Govind'),
LastName : new FormControl('Prajapati'),
Email : new FormControl('Govind@gmail.com'),
Mobile : new FormControl('9907554821'),
Gender: new FormControl('Male'),
DOB : new FormControl('2000-07-05'),
Colony : new FormControl('E-complex'),
Address : new  FormControl('E-complex, Indore.'),
Status : new FormControl('Active'),
RegistrationDate : new FormControl('10/01/2022')

  })
  ngOnInit(): void {
    this.adminForm.disable();

  }
close(){
this.dialogRef.close();

}
}
