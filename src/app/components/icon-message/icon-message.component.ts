import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-icon-message',
  templateUrl: './icon-message.component.html',
  styleUrls: ['./icon-message.component.scss']
})
export class IconMessageComponent implements OnInit {

  constructor() { }

  @Input() iconMessage: any;
  @Input() greeting: boolean;
  ngOnInit(): void {
  }

}
