import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
Mode;
HasBackdrop = false;
  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }
  onResize() {
    if (window.innerWidth < 500) {
        this.Mode = 'over';
        this.HasBackdrop = true;
    }
    else{
      this.Mode = 'side';
      this.HasBackdrop = false;
    }
  
}
}
