import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  stars: any = [];
  rating:any = 0;
  disabled:boolean = false;
  @Input() feedbackData: any;
 
  constructor(private getApiResponseService: GetApiResponseService, private storageService: StorageService) { }


  ngOnInit(): void {

    let minValue = this.feedbackData.minValue;
    let maxValue = this.feedbackData.maxValue;

    for (let i = minValue; i <= maxValue; i++) {
      this.stars.push({ checked: false });
    }
  }

  addRemoveRating(index) {

    if (!this.stars[index].checked) {
      for (let i = 0; i < this.stars.length; i++) {
        if (i <= index) {
          this.stars[i].checked = true;
        } else {
          this.stars[i].checked = false;
        }

      }
      this.rating = index + 1;
    } else {
      for (let i = 0; i < this.stars.length; i++) {
        if (i < index) {
          this.stars[i].checked = true;
        } else {
          this.stars[i].checked = false;
        }

      }
      this.rating = index;
    }
  }


  sendResponse() {
    let value = "";
    for (let i = 0; i < this.feedbackData.data.length; i++) {
      let input = parseInt(this.feedbackData.data[i].input);
      if (input == this.rating) {
        value = this.feedbackData.data[i].value;
        break;
      }
    }

    this.getApiResponseService.updatedata(value);
    this.disabled = true;
    let newData: any = {
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
