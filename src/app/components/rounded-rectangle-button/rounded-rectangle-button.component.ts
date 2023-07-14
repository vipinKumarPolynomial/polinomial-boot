import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-rectangle-button',
  templateUrl: './rounded-rectangle-button.component.html',
  styleUrls: ['./rounded-rectangle-button.component.scss']
})
export class RoundedRectangleButtonComponent implements OnInit {

  btnName = 'I am John';
  constructor() { }

  ngOnInit(): void {
  }

}
