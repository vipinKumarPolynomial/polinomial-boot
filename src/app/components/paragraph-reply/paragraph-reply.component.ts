import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paragraph-reply',
  templateUrl: './paragraph-reply.component.html',
  styleUrls: ['./paragraph-reply.component.scss']
})
export class ParagraphReplyComponent implements OnInit {

  constructor() { }
  @Input() paragraph;


  ngOnInit(): void {
  }

}
