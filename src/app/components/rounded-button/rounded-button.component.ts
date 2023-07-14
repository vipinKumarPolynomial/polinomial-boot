import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TypingAnimationService } from 'src/app/services/typingAnimation/typing-animation.service';

@Component({
  selector: 'app-rounded-button',
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss'],
})
export class RoundedButtonComponent implements OnInit {
  public isExist: boolean = false;
  @Input() suggestionButtonData;
  @Input() suggestionButtonValue;
  @Output() hideButtonStatus: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private getApiResponseService: GetApiResponseService,
    private storageService: StorageService,
    private typingAnimationService: TypingAnimationService
  ) {}

  onButtonClick(data) {
    this.hideButtonStatus.emit(false);
    this.getApiResponseService.updatedata(data);
    this.typingAnimationService.update(true);
    const newData = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: data,
    };
    let frameBody = document.getElementsByClassName('frame-body');
    for (let j = 0; j < frameBody.length; j++) {
      const element = frameBody[j];
      element.removeAttribute('style');
    }
    this.getApiResponseService.getChat(newData).subscribe(
      (data) => {
        this.getApiResponseService.updatechat(data);
        this.typingAnimationService.update(false);
      },
      (err) => {
        console.log('err =====>', err);
      }
    );
  }

  buttonOnlySingleTime = ['Schedule Visit', 'Customize Properties'];
  ngOnInit(): void {
    let roundedBtn = document.getElementsByClassName('rounded');

    for (let i = 0; i < roundedBtn.length; i++) {
      const element = roundedBtn[i];

      if (
        element.textContent.trim() == this.suggestionButtonData.trim() &&
        this.buttonOnlySingleTime.indexOf(this.suggestionButtonData.trim()) > -1
      ) {
        this.isExist = true;
        break;
      }
    }
    let frameBody = document.getElementsByClassName('frame-body');
    for (let j = 1; j < frameBody.length; j++) {
      const element = frameBody[j];
      element.setAttribute('style', 'height:78% !important;');
    }
    let framefooter = document.getElementsByClassName("frame-footer");
    framefooter[0].setAttribute('style', 'margin-top:2.5% !important');
  }
}
