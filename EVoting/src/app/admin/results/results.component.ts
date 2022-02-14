import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {


  numbers = [{'title':'Presedent','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','Vote1':500,'Vote2':250,'Vote3':360,'Vote4':100,'total':1000,
  'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Active'},

  {'title':'Sachiv','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','Vote1':300,'Vote2':250,'Vote3':360,'Vote4':100,'total':1000,
  'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Active'},

  {'title':'Head Member','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','Vote1':300,'Vote2':250,'Vote3':360,'Vote4':100,'total':1000,
  'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Completed'},

  {'title':'Head Member','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','Vote1':300,'Vote2':250,'Vote3':360,'Vote4':100,'total':1000,
  'ElectionDate':'21-10-2022','StartTime':'08:00 AM','EndTime':'10:00 PM','Status':'Upcomming'},];
  constructor() { }

  ngOnInit(): void {
    
  }

}
