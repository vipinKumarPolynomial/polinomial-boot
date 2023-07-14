import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { StorageService } from '../../services/storage/storage.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @Input() loginData: any = [];
  @Output() changeTheme = new EventEmitter();
  constructor(private getApiResponseService: GetApiResponseService,
    private storageService: StorageService,
    private typingAnimationService: TypingAnimationService) { }

  otpInput: any;
  disabled: boolean = false;
  wrongOTP: any = false;
  showResendMessage: boolean = false;

  ngOnInit(): void {
  }

  onButtonClick(value):any {
    this.typingAnimationService.update(true);
    this.wrongOTP = false;
    let newData: any = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: ""
    };
    if (value == "$otp") {
      if (this.otpInput == "" || !this.otpInput) {
        //TODO: show error message
        return false;
      }
      newData.text = this.otpInput;
      //this.getApiResponseService.updatedata(this.otpInput);
    } else {
      newData.text = value;
      //this.getApiResponseService.updatedata(value);
    }
    this.getApiResponseService.getChat(newData).subscribe(
      (data) => {
        if (this.isWrongOTP(data)) {
          this.typingAnimationService.update(false);
          this.wrongOTP = true;
        } else {
          this.disabled = true;
          if (value != "CANCEL") {
            this.changeTheme.emit("light");
          }
          setTimeout(() => {
            this.typingAnimationService.update(false);
            this.getApiResponseService.updatechat(data);
          }, 3100);
        }
      },
      (err) => {
        console.log('err =====>', err);
      }
    );
  }

  isWrongOTP(data: any) {
    let { value, type } = data.activities[0];
    return (type == "statusCode" && value.statusCode == 401)
  }

  resend() {

    this.typingAnimationService.update(true);
    this.wrongOTP = false;
    let newData: any = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: "resend"
    };

    this.getApiResponseService.getChat(newData).subscribe(
      (data) => {
        this.typingAnimationService.update(false);
        this.showResendMessage = true;
        setTimeout(() => {
          this.showResendMessage = false;
        }, 10000);
      },
      (err) => {
        console.log('err =====>', err);
      }
    );
  }

}




