import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss']
})
export class VoteCardComponent implements OnInit {

  @Input() voteCard:any;
  hideStatus=true;
  constructor(private getApiResponseService : GetApiResponseService,
    private typingAnimationService: TypingAnimationService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  onButtonClick(data){
    this.hideStatus=false;
    this.typingAnimationService.update(true);
    this.getApiResponseService.updatedata(data)
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
