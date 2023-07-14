import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-query',
  templateUrl: './user-query.component.html',
  styleUrls: ['./user-query.component.scss']
})
export class UserQueryComponent implements OnInit {

  @Input() userMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
