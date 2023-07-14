import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {

  constructor(private getApiResponseService:GetApiResponseService,
    private storageService:StorageService) { }
  @Input() listData : any = [];
  listToShow:any = [];
  limit:number= 3;
  buttonText:string = "Show more";
  ngOnInit(): void {
    if(this.listData.data.length > this.limit){
      this.listToShow = this.listData.data.slice(0,this.limit);
    }else{
      this.listToShow = this.listData.data;
    }

  }

  showMoreLess(){
    if(this.listToShow.length==this.listData.data.length){
      this.listToShow = this.listData.data.slice(0,this.limit);
      this.buttonText = "Show more";
    }else{
      this.listToShow = this.listData.data;
      this.buttonText = "Show less";
    }
  }
  onButtonClick(value){
    this.getApiResponseService.updatedata(value);
    let newData:any = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: value
    };
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
