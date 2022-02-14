import { Component, OnInit } from '@angular/core';
import{MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { LoginComponent } from './authentication/login/login.component';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EVoting';

 
  constructor(private dialog :MatDialog) {  }
  ngOnInit(): void {
  }

  onLoginOpen(){
    const dialogRef = new MatDialogConfig();
    dialogRef.disableClose = true;
    dialogRef.autoFocus = true;
    dialogRef.width = '60%'; 
     this.dialog.open(LoginComponent,dialogRef);
  }

}
