import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {

  @Input() formCard:any;
  inputItem = ['text','date','number','password','email'];
  constructor() { }

  ngOnInit(): void {
  }

}
