import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.scss']
})
export class AddElectionComponent implements OnInit {

  constructor() { }

voters = ['Govind','Jatin','Jyoti','Sapana'];
ElectionTitles = ['Socity President','Socity Head','Socity Chairmain','Socity Leader'];

  newElection = new FormGroup({
        Title : new FormControl('',[Validators.required]),
        Option1 : new FormControl('',[Validators.required]),
        Option2 : new FormControl('',[Validators.required]),
        Option3 : new FormControl('',[Validators.required]),
        Option4 : new FormControl('',[Validators.required]),
        ElectionDate: new FormControl('',[Validators.required]),
        StartTime : new FormControl('',[Validators.required]),
        EndTime : new FormControl('',[Validators.required]),
        SelectVoters : new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }

onSubmit(){

}



  get Title(){
    return this.newElection.get('Title');
  }

  get ElectionDate(){
    return this.newElection.get('ElectionDate');
  }
  get StartTime(){
    return this.newElection.get('StartTime');
  }
  get EndTime(){
    return this.newElection.get('EndTime');
  }
  get SelectVoters(){
    return this.newElection.get('SelectVoters');
  }
  get Candidates(){
    return this.newElection.get('Candidates');
  }
}
