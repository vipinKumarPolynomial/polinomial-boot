import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApiResponseService } from 'src/app/services/getApiResponse/get-api-response.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TypingAnimationService } from 'src/app/services/typingAnimation/typing-animation.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { GetButtonIdService } from 'src/app/services/getId/get-button-id.service';

@Component({
  selector: 'app-suggestion-button',
  templateUrl: './suggestion-button.component.html',
  styleUrls: ['./suggestion-button.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(600, style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SuggestionButtonComponent implements OnInit {

  @Input() buttonName: String;
  @Input() buttonValue: String;
  @Input() image: String;
  @Output() hideButtonStatus: EventEmitter<boolean> = new EventEmitter();
  constructor(private getApiResponseService: GetApiResponseService,
    private storageService: StorageService,
    private typingAnimationService: TypingAnimationService,
    private getButtonIdService: GetButtonIdService) { }

  onButtonClick(data) {
    this.hideButtonStatus.emit(false);
    this.getApiResponseService.updatedata(data);
    this.typingAnimationService.update(true);
    this.getButtonIdService.updatedata(true);
    const newData = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: data
    }
    this.getApiResponseService.getChat(newData).subscribe(
      data => {
        this.getApiResponseService.updatechat(data);
        this.typingAnimationService.update(false);
      },
      err => {
        console.log('err =====>', err);
      }
    )
  }

  ngOnInit(): void {
  }

  checkURL(url) {
    return (url.match(/\.(svg)$/) != null);
  }
}
