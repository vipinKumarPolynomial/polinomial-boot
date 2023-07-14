import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApiResponseService } from 'src/app/services/getApiResponse/get-api-response.service';
import { ShowHideInputService } from 'src/app/services/showHideInput/show-hide-input.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TypingAnimationService } from 'src/app/services/typingAnimation/typing-animation.service';

@Component({
  selector: 'app-rectangle-edged-button',
  templateUrl: './rectangle-edged-button.component.html',
  styleUrls: ['./rectangle-edged-button.component.scss']
})
export class RectangleEdgedButtonComponent implements OnInit {
  @Input() suggestionButtonData : string;
  @Input() suggestionButtonText : string;
  @Input() isMultipleSelect : boolean = false;
  isClicked : boolean = false;
  @Output() hideButtonStatus:EventEmitter<boolean> = new EventEmitter(); 
  constructor(
    private getApiResponseService : GetApiResponseService
    , private storageService: StorageService
    , private typingAnimationService: TypingAnimationService
    , private showHideInputService: ShowHideInputService) { }

  onButtonClick(data) {
    this.typingAnimationService.update(true);
    if (this.isMultipleSelect) {
      this.showHideInputService.update(true);
      if (this.isClicked) {
        this.storageService.removeInputContent(data);
        this.isClicked = false;
      }
      else {
        this.storageService.addInputContent(data);
        this.isClicked = true;
      }
    } else {
      this.hideButtonStatus.emit(false);
      this.getApiResponseService.updatedata(data);
      const newData = {
        conversationId: this.storageService.getItem('conversation-id'),
        text : data
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
  }

  ngOnInit(): void {
    if (this.isMultipleSelect == undefined || this.isMultipleSelect == null) {
      this.isMultipleSelect = false;
    }
  }
}