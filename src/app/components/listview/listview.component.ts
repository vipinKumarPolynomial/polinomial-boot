import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  disabled = false;
  @Input() listview:any;
  constructor() { }

  ngOnInit(): void {
  }

}
