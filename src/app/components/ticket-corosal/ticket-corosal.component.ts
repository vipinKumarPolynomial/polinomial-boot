import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-ticket-corosal',
  templateUrl: './ticket-corosal.component.html',
  styleUrls: ['./ticket-corosal.component.scss']
})
export class TicketCorosalComponent implements OnInit {

  constructor(private getApiResponseService : GetApiResponseService, private storageService: StorageService) { }
  @Input() carouselItems : any = [];

  slideConfig = {
    variableWidth: true,
    dots: false,
    arrows: true,
    slidesToShow: 1, 
    slidesToScroll: 1,
    infinite:false,
    adaptiveHeight:false
  };
  carousalStatus = true;
  expand:boolean = false;
  ticketKey:string = "";
  ticketValue:string="";

  ticketBtnData;
  ngOnInit(): void {
  }

  onButtonClick(value, data, attachment){
    this.ticketBtnData = value;
    
    this.getApiResponseService.updatedata(value);
    this.carousalStatus = false;
    let newData:any = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: this.ticketBtnData
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

  showMore(key, value){
    this.ticketKey = key;
    this.ticketValue = value;
    this.expand = true;
  }

  showLess(){
    this.ticketKey = "";
    this.ticketValue = "";
    this.expand = false;
  }

}
