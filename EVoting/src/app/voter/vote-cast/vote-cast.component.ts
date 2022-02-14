import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vote-cast',
  templateUrl: './vote-cast.component.html',
  styleUrls: ['./vote-cast.component.scss']
})
export class VoteCastComponent implements OnInit {
  id;

 livePool = {'id':1,'Title':'President','Option1':'Govind','Option2':'Jyoti','Option3':'Anjali','Option4':'Priya','VoteStatus':false}

  constructor(private route:ActivatedRoute,private dialogRef : MatDialogRef<VoteCastComponent>) {
   this.route.paramMap.subscribe(parms=>{
   this.id = parms.get("id");
   });
   }
  
  ngOnInit(): void {
  }

  onClose(){
  this.dialogRef.close();
  }

  onSubmit(){
    Swal.fire('Success','Your vote Submited Successfully','success');
  this.dialogRef.close();

  }



}
