import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { GetButtonIdService } from '../../services/getId/get-button-id.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { StorageService } from '../../services/storage/storage.service';
import { trigger, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-image-reply',
  templateUrl: './image-reply.component.html',
  styleUrls: ['./image-reply.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger(100, [
          animate('.3s ease-out', keyframes([
            style({ opacity: 0, transform: 'translateY(30px)' }),
            style({ opacity: 1, transform: 'translateY(0)' }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class ImageReplyComponent implements OnInit {

  @Input() imageReply: any;
  //@Output() fullScreenStatus:EventEmitter<boolean> = new EventEmitter(); 
  constructor(private getApiResponseService: GetApiResponseService,
    private getButtonIdService: GetButtonIdService,
    private typingAnimationService: TypingAnimationService,
    private storageService: StorageService,
    public sanitizer: DomSanitizer) { }

    slideConfig = {
      variableWidth: true,
      infinite: false,
      dots: false,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1
    };

  ngOnInit(): void {}

  checkURL(url) {
    return (url.match(/\.(svg)$/) != null);
  }

  onButtonClick(data) {
    //this.fullScreenStatus.emit(true);

    // setTimeout(()=>{
    this.getButtonIdService.updatedata(true);
    this.typingAnimationService.update(true);
    //  },500);

    this.getApiResponseService.updatedata(data)
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
