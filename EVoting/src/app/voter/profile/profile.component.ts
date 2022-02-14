import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  voterForm = new FormGroup({
    FirstName : new FormControl('Govind'),
    LastName : new FormControl('Prajapati'),
    Email : new FormControl('Govind@gmail.com'),
    Mobile : new FormControl('9907554821'),
    Gender: new FormControl('Male'),
    DOB : new FormControl('2000-07-05'),
    Address : new  FormControl('E-complex, Indore.'),
    RegistrationDate : new FormControl('10/01/2022')
    
      })



  constructor() { }

  ngOnInit(): void {
  }

}
