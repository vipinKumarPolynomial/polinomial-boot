import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'agent-message',
  templateUrl: './agent-message.component.html',
  styleUrls: ['./agent-message.component.scss']
})
export class AgentMessageComponent implements OnInit {

  constructor() { }
  @Input() message: any;
  @Input() agent: any;
  attachments: any;
  ngOnInit(): void {
    if (this.agent.attachments) {
      this.attachments = this.agent.attachments;
    }
  }

  downloadFile = (url) => {
    let a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

}
