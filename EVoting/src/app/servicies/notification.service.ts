import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr :ToastrService) { }
 showSuccess(title,message){
   this.toastr.success(title,message);
 }
 showError(title,message){
  this.toastr.error(title,message);
}
showWarning(title,message){
  this.toastr.warning(title,message);
}
showInfo(title,message){
  this.toastr.info(title,message);
}
}
