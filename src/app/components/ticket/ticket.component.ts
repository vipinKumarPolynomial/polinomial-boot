
import { Component, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent  {

  constructor(private getApiResponseService : GetApiResponseService, private storageService: StorageService){}
  @Input() tickets :any;
  ticketBtnData;

  onButtonClick(value, data,attachment){
    this.ticketBtnData = value;
    // this.getApiResponseService.sharable.subscribe(
    //   value => {
    //     this.ticketBtnData = value
    //   },
    //   err => {
    //     console.log('error :::::', err);
    //   }
    // )
    this.getApiResponseService.updatedata(value);
    let newData:any = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: this.ticketBtnData,
    };
    if(attachment){
      newData.data = data;
    }
    this.getApiResponseService.getChat(newData).subscribe(
      (data) => {
        this.getApiResponseService.updatechat(data);
      },
      (err) => {
        console.log('err =====>', err);
      }
    );
  }

}
