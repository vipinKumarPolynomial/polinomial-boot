import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round-quick-reply',
  templateUrl: './round-quick-reply.component.html',
  styleUrls: ['./round-quick-reply.component.scss'],
})
export class RoundQuickReplyComponent implements OnInit {
  constructor() {}
  slideConfig = {
    variableWidth: true,
    infinite: false,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 2,
  };

  roundQuickReplyBtn = true;

  @Input() quickReplys: any = [];

  ngOnInit(): void {
  }
  buttonStatus(status) {
    this.roundQuickReplyBtn = status;
  }
}
