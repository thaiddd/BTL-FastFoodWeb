import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./../../admin.component.css',
  './leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  @Input() toggle: any
  constructor() { }

  ngOnInit(): void {
  }

}
