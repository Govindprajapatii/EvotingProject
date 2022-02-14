import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {
  numbers = [{'title':'Presedent','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
              'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Active'},

              {'title':'Sachiv','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
              'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Active'},

              {'title':'Head Member','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
              'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Completed'},

              {'title':'Head Person','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
              'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Upcomming'},];
  isAll = true;
  Status = 'All';
  isCompleted = false;
  isUpComming = false;
  isActive = false;
  constructor() { }

  ngOnInit(): void {
  }



  isActiveClick(){
    this.Status = 'Active';
    console.log(this.Status);
    this.isAll = false;
  this.isCompleted = false;
  this.isUpComming = false;
  this.isActive = true;
  
  }

  isUpCommingClick(){
    this.Status = 'Upcomming';
    console.log(this.Status);
    this.isAll = false;
  this.isCompleted = true;
  this.isUpComming = false;
  this.isActive = false;
  }

  isAllClick(){
    this.isAll = true;
    this.Status = 'All';
  this.isCompleted = false;
  this.isUpComming = false;
  this.isActive = false;
  
  }

  isCompletedClick(){
    this.Status = 'Completed';
    this.isAll = false;
  this.isCompleted = true;
  this.isUpComming = false;
  this.isActive = false;
  
  }

}
