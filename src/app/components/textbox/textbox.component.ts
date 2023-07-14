import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  @Input() inputType:any;
  @Input() iconUrl:any;
  constructor() { }

  ngOnInit(): void {
  }

}
