import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-plain-quick-reply',
  templateUrl: './plain-quick-reply.component.html',
  styleUrls: ['./plain-quick-reply.component.scss']
})
export class PlainQuickReplyComponent implements OnInit {

  constructor() { }
  slideConfig = {
    variableWidth: true,
    infinite: false,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 2
  };
  plainQuickReplyBtn = true;

  @Input() quickReplys: any = [];
  @Input() isMultipleSelect: boolean = false;
  _screen: string = "chat";
  @Input() set screen(value: string) {
    this._screen = value;
  }

  ngOnInit(): void {
    if (this.isMultipleSelect == undefined || this.isMultipleSelect == null) {
      this.isMultipleSelect = false;
    }
  }

  buttonStatus(status) {
    if (this._screen == "chat") {
      this.plainQuickReplyBtn = status;
    }
  }

}
