import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-quick-reply',
  templateUrl: './icon-quick-reply.component.html',
  styleUrls: ['./icon-quick-reply.component.scss']
})
export class IconQuickReplyComponent implements OnInit {

  iconQuickReplyBtn = true;
  constructor() { }
  @Input() quickReplys: any = [];
  _screen: string="chat";
  @Input() set screen(value: string) {
    this._screen = value;
  }
  ngOnInit(): void { }

  slideConfig = {
    variableWidth: true,
    infinite: false,
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  buttonStatus(status) {
    if (this._screen == "chat") {
      this.iconQuickReplyBtn = status;
    }
  }

}
