import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(private getApiResponseService: GetApiResponseService,
    private typingAnimationService: TypingAnimationService, private storageService: StorageService) { }

  @Input() sliderData: any;
  carousalStatus = true;
  sliderValue: any;
  ngOnInit(): void {
  }

  onButtonClick() {
    this.typingAnimationService.update(true);
    this.getApiResponseService.sharable.subscribe(
      value => {
        this.sliderData = value
      },
      err => {
        console.log('error :::::', err);
      }
    )
    this.carousalStatus = false;
    this.getApiResponseService.updatedata(this.sliderData + ' INR');
    const newData = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: this.sliderData,
    };
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

}
