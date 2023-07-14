import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visual-reply',
  templateUrl: './visual-reply.component.html',
  styleUrls: ['./visual-reply.component.scss']
})
export class VisualReplyComponent implements OnInit {
  @Input() visualReply: any;
  constructor() { }

  ngOnInit(): void {
  }

}
