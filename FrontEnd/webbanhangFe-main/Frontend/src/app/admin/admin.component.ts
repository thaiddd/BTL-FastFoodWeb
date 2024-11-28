import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  toggleLeftBar = false

  constructor() { }

  ngOnInit(): void {
  }

  onToggleChange(value: any) {
    this.toggleLeftBar = value
  }
}
