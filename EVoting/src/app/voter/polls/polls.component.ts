import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VoteCastComponent } from '../vote-cast/vote-cast.component';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {



  numbers = [{'id':1,'title':'Presedent','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
  'ElectionDate':'2022-02-01','StartTime':'08:00','EndTime':'21:00','Status':'Active'},

  {'id':2,'title':'Sachiv','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
  'ElectionDate':'2022-02-01','StartTime':'08:00','EndTime':'22:00','Status':'Active'},

  {'id':3,'title':'Head Member','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
  'ElectionDate':'2022-02-01','StartTime':'08:00','EndTime':'19:00','Status':'Completed'},

  {'id':4,'title':'Head Person','Option1':'Govind','Option2':'jatin','Option3':'Jyoti','Option4':'Sapana','RegistrationDate':'10/10/2021',
  'ElectionDate':'2022-02-01','StartTime':'08:00','EndTime':'20:00','Status':'Upcomming'},];
 endDate = new Date();
  constructor(private dialog:MatDialog) {
    setInterval(()=>{
      this.endDate = new Date();
    },1);
   }

  ngOnInit(): void {


  }
  VoteCastClick(id){
    this.dialog.open(VoteCastComponent);
  }

  VoteCastNotActive(){
    Swal.fire('Please Try Later', 'Pool Not Active!', 'warning');    
  }
  getDateDiff (startDateData) {
    // console.log(startDateData);
    var startDate = new Date(startDateData);
    var endDate = this.endDate;
    // console.log(this.endDate);
    var diff =  startDate.getTime() - endDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    // console.log({ day: days, hour: hours, minute: minutes, second: seconds });
    
      var diffTime = hours+": "+ minutes+": "+seconds;
      return diffTime;

}
}
