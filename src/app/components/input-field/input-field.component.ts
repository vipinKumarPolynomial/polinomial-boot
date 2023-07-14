import { Component, OnInit, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { GetApiResponseService } from "../../services/getApiResponse/get-api-response.service";
import { NgForm } from '@angular/forms';
import { GetButtonIdService } from '../../services/getId/get-button-id.service';
import { ShowHideInputService } from '../../services/showHideInput/show-hide-input.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { StorageService } from '../../services/storage/storage.service';
// import { BlobServiceClient, AnonymousCredential, newPipeline } from '@azure/storage-blob';

// import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: []
})
export class InputFieldComponent implements OnInit {

  constructor(
    private getApiResponseService: GetApiResponseService,
    public showHideInputService: ShowHideInputService,
    public getButtonIdService: GetButtonIdService,
    public typingAnimationService: TypingAnimationService,
    private storageService: StorageService,
    private zone: NgZone
  ) { }
  @Input() conversationToken;
  @Input() mode;
  @Input() showAttachmentButton:any;
  @Input() orange;

  msg: any;
  voiceAnimation: any = false;
  recognition: any;
  clearTimeout: any;
  inactiveTimeoutID: any;
  mobile: boolean = false;
  incompatibleMsg: any = null;
  showMsg: any = -1;
  attachment: boolean = false;
  currentFile: File = null;
  showMic: boolean = true;

  ngOnInit(): void {
    this.mobile = this.mobileCheck();

    if (!this.isSafari()) {
      this.speechRecognition();
    }
    if (this.mode === "agent") {
      this.inactiveTimeoutID = setTimeout(() => {
        // this.setUserInactive();
      }, 300000);
    }

    // ============================= Add input content ============================
    this.storageService.addShare.subscribe(
      (i) => {
        this.typingAnimationService.update(false);
        if (this.msg) {
          this.msg = this.msg + ', ' + i;
        } else {
          this.msg = i;
        }
      },
      (err) => {
        console.log('error in show div ::::', err);
      }
    );

    // ============================= Add input content ============================
    this.storageService.removeShare.subscribe(
      (i) => {
        this.typingAnimationService.update(false);
        if (this.msg) {
          let messages = this.msg.split(', ');
          let position = messages.indexOf(i);
          if (position > -1) {
            messages.splice(position, 1);
            this.msg = messages.join(', ');
          }
        }
      },
      (err) => {
        console.log('error in show div ::::', err);
      }
    );
  }

  ngOnChanges(changes: any) {
    if (changes.mode.currentValue === "agent") {
      clearTimeout(this.inactiveTimeoutID);
      this.inactiveTimeoutID = setTimeout(() => {
        //  this.setUserInactive();
      }, 15000);
    }
  }

  keyupHandler = () => {
    clearTimeout(this.inactiveTimeoutID);
    this.inactiveTimeoutID = setTimeout(() => {
      // this.setUserInactive();
    }, 15000);

  }

  toggleAttachment = () => {
    this.attachment = !this.attachment;
  }

  speechRecognition = () => {

    const SpeechRecognition = window['SpeechRecognition'] || window['webkitSpeechRecognition'];
    const speechGrammarList = window['SpeechGrammarList'] || window['webkitSpeechGrammarList']
    const speechRecognitionEvent = window['SpeechRecognitionEvent'] || window['webkitSpeechRecognitionEvent'];
    this.clearTimeout = false;

    this.recognition = new SpeechRecognition();
    //recognition.grammars = speechRecognitionList;
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 3;
    //let speechRecognitionList = new SpeechGrammarList();

    this.recognition.onresult = (event) => {

      if (this.mobile) {

        let results = event.results;
        let lastResultIndex = results[results.length - 1].length - 1;
        this.zone.run(() => {
          this.msg = results[results.length - 1][lastResultIndex].transcript;
        });

        if (this.clearTimeout) {
          clearTimeout(this.clearTimeout);
        }

        this.clearTimeout = setTimeout(() => {
          this.zone.run(() => {
            this.recognition.stop();
            this.messageCall();
            this.voiceAnimation = false;
          });
        }, 1300);

      } else {
        let isFinal = event.results[0].isFinal;
        if (!isFinal) {
          this.zone.run(() => {
            this.msg = event.results[0][0].transcript;
          });
        } else if (isFinal) {
          this.zone.run(() => {
            this.msg = event.results[0][0].transcript;
            this.messageCall();
            this.voiceAnimation = false;
            this.recognition.stop();
          });

        }

      }
    }

  }

  mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window['opera']);
    return check;
  };

  isSafari = () => {
    let flag = false;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        // Chrome
      } else {
        flag = true;
      }
    }
    return flag;
  }

  isFirefox = () => {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  close = () => {
    if (this.isSafari()) {
      this.showMsg = -1; // -1 will allow message to be displayed multiple times
    } else if (this.isFirefox()) {
      this.showMsg = 1; // 1 will allow message to show only once
    }
  }


  messageCall():any {
    if (!this.msg) {
      return false;
    }
    this.typingAnimationService.update(true);
    this.getButtonIdService.updatedata(true);


    this.getApiResponseService.updatedata(this.msg);
    const newData = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: this.msg,
      voiceFlag: this.voiceAnimation
    }
    this.getApiResponseService.getChat(newData).subscribe(
      data => {
        this.getApiResponseService.updatechat(data)
        this.typingAnimationService.update(false);
      },
      err => {
        console.log('err =====>', err);
      }
    )
    this.msg = ""
  }



  listen() {
    if (this.isFirefox()) {
      this.showMsg++;
      this.incompatibleMsg = `If speech recognition is not already enabled on Firefox then enable
        media.webspeech.recognition.enable and media.webspeech.synth.enabled flags in about:config.`;
    } else if (this.isSafari()) {
      this.incompatibleMsg = `This feature is not compatible with your browser. Please open this in Chrome browser.`;
    } else {
      if (!this.voiceAnimation) {
        this.recognition.start();
        this.voiceAnimation = true;
      } else {
        this.recognition.stop();
        this.voiceAnimation = false;
      }
    }

  }

  selectFile = (e):any => {


    let file = e.target.files[0];
    if (file.size > 5242880) {
      return false;
    }

    //generate unique id to identify thumbnail
    let thumbnailId = new Date().getTime() + Math.random();


    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let result = event.target.result;

      let obj = {
        url: result,
        id: thumbnailId,
        size: file.size,
        format: file.type,
        name: file.name,
        path: e.target.value
      }
      let str = JSON.stringify(obj);
      this.getApiResponseService.updateThumbnail(str);
      this.attachment = false;




      let objToUpload: any = {
        ImageUploadList: [
          {
            base64: result,
            FileName: file.name,
            Path: "ServiceTicketChat"
          }
        ]
      }

      this.typingAnimationService.update(true);
      this.getButtonIdService.updatedata(true);
      let files = e.target.files;
      if (files.length > 0) {

        let file = files[0];

        let formData = new FormData();

        formData.append("file", file);
        this.upload(formData, thumbnailId);
      }
      // this.upload(objToUpload,thumbnailId);
    };
  }

  getNameFromURL = (url: string) => {
    let array = url.split("/");
    if (array.length > 0) {
      return array[array.length - 1];
    } else {
      return "";
    }
  }

  setUserInactive = () => {
    let conversationId = this.storageService.getItem('conversation-id');
    this.getApiResponseService.setUserInactive(conversationId, this.conversationToken).subscribe(
      data => {
      },
      err => {
        console.log('err =====>', err);
      }
    )
  }

  upload = (attachment, thumbnailId) => {


    this.getApiResponseService.upload(attachment).subscribe((response) => {

      let obj = {
        status: true,
        id: thumbnailId,
        url: response.url
      }

      let attachmentObj = {
        name: this.getNameFromURL(response.url),
        contentType: response.type,
        contentUrl: response.url
      }

      let str = JSON.stringify(obj);
      this.getApiResponseService.updateThumbnailStatus(str);
      this.typingAnimationService.update(true);
      const newData = {
        conversationId: this.storageService.getItem('conversation-id'),
        voiceFlag: this.voiceAnimation,
        attachment: [attachmentObj],
        text: ""
      }
      this.getApiResponseService.getChat(newData).subscribe(
        data => {
          this.getApiResponseService.updatechat(data)
          this.typingAnimationService.update(false);
        },
        err => {
          console.log('err =====>', err);
        }
      )


    }, (error) => {

      let obj = {
        status: false,
        id: thumbnailId,
        url: null
      }
      let str = JSON.stringify(obj);
      this.getApiResponseService.updateThumbnailStatus(str);
      this.typingAnimationService.update(false);
      console.log("error ", error);
    });
  }

  revertInput() {
    //hide input and show mic and keyboard icons
    this.showHideInputService.update(false);
  }
}
