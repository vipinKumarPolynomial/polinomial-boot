import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  constructor(
    private getApiResponseService: GetApiResponseService,
    private typingAnimationService: TypingAnimationService,
    private storageService: StorageService) { }
    
  slideConfig = {
    variableWidth: true,
    infinite: false,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 2
  };

  carousalStatus = true;

  @Input() corosalData: any[] = [];

  ngOnInit(): void {
  }

  onButtonClick(data) {
    this.carousalStatus = false;
    this.typingAnimationService.update(true);
    this.getApiResponseService.updatedata(data);
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

}
