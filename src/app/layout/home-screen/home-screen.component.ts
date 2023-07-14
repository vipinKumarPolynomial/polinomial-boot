import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { GetButtonIdService } from '../../services/getId/get-button-id.service';
import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
import { ShowHideInputService } from '../../services/showHideInput/show-hide-input.service';
import { TypingAnimationService } from '../../services/typingAnimation/typing-animation.service';
import { StorageService } from '../../services/storage/storage.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { AESService } from 'src/app/services/AES/aes.service';
import { environment } from '../../../environments/environment';
import { io } from 'socket.io-client';
import { StoreTokenService } from 'src/app/@theme/services/storeToken.service';
import { AuthService } from 'src/app/@theme/services/auth.service';
import { identifierName } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger(100, [
            animate(
              '.3s ease-out',
              keyframes([
                style({ opacity: 0, transform: 'translateY(60px)' }),
                style({ opacity: 1, transform: 'translateY(0)' }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HomeScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChild('mainframe') mainframe: ElementRef;
  @ViewChild('frameheader') frameheader: ElementRef;
  @ViewChild('framefooter') framefooter: ElementRef;
  @ViewChildren('user-query-msg') itemElements: QueryList<any>;

  frameBodyHeight: number;
  botType: string = 'Sales+CRM-Bot';
  mode: string = 'bot'; //bot - Bot is active, agent - live chat is active

  constructor(
    private getButtonIdService: GetButtonIdService,
    private showHideInputService: ShowHideInputService,
    private getApiResponseService: GetApiResponseService,
    private typingAnimationService: TypingAnimationService,
    private storageService: StorageService,
    private aesService: AESService,
    private stogareService: StoreTokenService,
    private routers:Router,
    private authService: AuthService,

    // priavte router: Router
  ) {

  }
  container: HTMLElement;
  private scrollContainer: any;
  private items = [];

  homeDataKey = 'init';
  isShowDiv = false;
  screen: string = 'home'; //"home","chat" shows which screen is visible
  showInput = true;
  reloadHome: boolean = false;
  chatData: any;
  chatArray: Array<any> = []; // common placeholder for storing chat array
  homeChatArray: Array<any> = []; // stores chat array for home screen
  authHomeChatArray: Array<any> = []; // stores chat array for home screen which comes after login
  convChatArray: Array<any> = []; // stores chat array for conversation screen
  buttonArray: Array<any> = [];
  corosalArray: Array<any> = [];
  text: any;
  timeoutId: any;
  inactiveTimeoutID: any;
  showThreeDots: boolean = false;
  typing: boolean = false;
  buttonValue: any;
  theme: string = 'light';
  orange: boolean = false;
  themeFromURL: boolean = false;
  loaderText: any = null;
  showMinimizeButton: boolean = true;
  showSOSButton: boolean = true;
  showContactUs: boolean = false;
  showChatButton: boolean = false; //show/hide agent chat icon
  showAttachmentButton: boolean = true;
  conversationToken: string;
  avatarUri: string = '';
  displayName: string; //bot display name
  themeIsSwitchable: boolean = true; //if true theme can be switched otherwise it won't. This can be configured by passing parameter in url
  sharpEdge: boolean = true;
  fontSize: any = null;
  fontType: any = null;

  notificationSound = () => {
    let audio = new Audio();
    audio.src = 'assets/notification.mp3';
    audio.muted = true;
    audio.load();
    audio.play();
  };

  ngOnInit(): void {
    let authToken = this.getQueryVariable('authToken');

    if (authToken !== undefined) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }

    let sharpEdge = this.getQueryVariable('sharpEdge');
    if (sharpEdge && sharpEdge == 'false') {
      this.sharpEdge = false;
    }

    let font_size = this.getQueryVariable('fontSize');
    let font_type = this.getQueryVariable('fontType');
    if (font_size) {
      this.fontSize = font_size + 'px';
    }
    if (font_type) {
      this.fontType = font_type;
    }
    let colorHex = this.getQueryVariable('colorHex');
    console.log('colorHex', colorHex);

    if (colorHex) {
      document.documentElement.style.setProperty(
        '--color-primary',
        '#' + colorHex
      );
    } else {
      document.documentElement.style.setProperty('--color-primary', '#ed0c6d');
    }

    let source = this.getQueryVariable('source');
    let themeIsSwitchable = this.getQueryVariable('switchTheme');
    if (themeIsSwitchable !== undefined) {
      if (themeIsSwitchable == 'true') {
        this.themeIsSwitchable = true;
      } else if (themeIsSwitchable == 'false') {
        this.themeIsSwitchable = false;
      }
    } else {
      this.themeIsSwitchable = true;
    }

    if (source && !isNaN(parseInt(source))) {
      if (parseInt(source) == 2 || parseInt(source) == 3) {
        this.showMinimizeButton = false;
      }
    }

    const botType = this.getQueryVariable('botType');
    if (botType == 'null') {
      this.botType = 'U2FsdGVkX18N0PyYXHvIp8GlINfAd89LfNzqpWTm4dg=';
    } else if (botType) {
      this.botType = botType;
    } else {
      this.botType = this.aesService.encrypt(this.botType);
    }

    const attachmentButton = this.getQueryVariable('attachment');
    if (attachmentButton && attachmentButton == 'true') {
      this.showAttachmentButton = true;
    } else if (attachmentButton && attachmentButton == 'false') {
      this.showAttachmentButton = false;
    }

    const sosButton = this.getQueryVariable('sosButton');
    if (sosButton && sosButton == 'true') {
      this.showSOSButton = true;
    } else if (sosButton && sosButton == 'false') {
      this.showSOSButton = false;
    }

    const contactUs = this.getQueryVariable('contactUs');
    if (contactUs && contactUs == 'true') {
      this.showContactUs = true;
    } else if (contactUs && contactUs == 'false') {
      this.showContactUs = false;
    }

    if (this.getQueryVariable('type')) {
      let type = this.getQueryVariable('type').toLowerCase();
      if (type == 'sales') {
        this.theme = 'dark';
        this.themeFromURL = true;
      } else if (type == 'crm') {
        this.theme = 'light';
        this.themeFromURL = true;
      } else if (type == 'orange') {
        this.theme = 'orange';
        this.themeFromURL = true;
      }
    }

    if (this.getQueryVariable('orange')) {
      let orange = this.getQueryVariable('orange').toLowerCase();
      if (orange == 'true') {
        this.orange = true;
      } else if (orange == 'false') {
        this.orange = false;
      }
    }

    if (this.getQueryVariable('conversationId')) {
      const convId = this.getQueryVariable('conversationId');
      this.storageService.setItem({ 'conversation-id': convId });
    }

    this.typingAnimationService.update(true);

    //fetch bot information
    if (this.botType) {
      this.fetchBot(this.botType, this.getQueryVariable('conversationId'));
    }

    // =================================== SHOW/HIDE TYPING ANIMATION ======================

    this.typingAnimationService.animate.subscribe(
      (flag) => {
        this.showThreeDots = flag;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          // hide three dots if there is no response from server for long time
          this.showThreeDots = false;
        }, 45000);
      },
      (error) => {
        console.log('error in typing animation service :::::', error);
      }
    );

    // ================================= GET THUMBNAIL MESSAGE ===========================
    this.getApiResponseService.getThumbnail.subscribe(
      (thumbnail: any) => {
        if (thumbnail) {
          this.convChatArray.push({
            type: 2,
            request: thumbnail,
            response: thumbnail,
          });
          this.chatArray = this.convChatArray;
        }
      },
      (err) => {
        console.log('error in show div ::::', err);
      }
    );

    // ================================= GET USER MESSAGE ===========================
    // this.getApiResponseService.share.subscribe(
    //   (chat) => {
    //     if (chat != '') {
    //       if (chat != "init") {
    //         this.convChatArray.push({ type: 0, request: chat });
    //         this.chatArray = this.convChatArray;
    //       }
    //     }
    //   },
    //   (err) => {
    //     console.log('error in show div ::::', err);
    //   }
    // );

    // ============================= GET FLAG OF BUTTON ============================
    this.getButtonIdService.share.subscribe(
      (i) => {
        if (i) {
          this.screen = 'chat';
        } else {
          this.screen = 'home';
        }
      },
      (err) => {
        console.log('error in show div ::::', err);
      }
    );

    // ============================= SHOW/HIDE BUTTON ============================
    this.showHideInputService.showInput.subscribe(
      (i) => {
        this.showInput = i;
      },
      (err) => {
        console.log('error in show/hide button ::::', err);
      }
    );

    // this.inactiveTimeoutID = setTimeout(() => {
    //   this.setUserInactive();
    // }, 15000);

    setInterval(() => {
      let token = this.stogareService.get('authToken');
      if (token != null) {
        let payload = {
          access_token : token
        };

        this.authService.refreshToken(payload).subscribe((res: any) => {
          if (res) {
            this.stogareService.set(
              'authToken', res.data[0].access_token
            );
          }
        }, (error) => {
          // this.stogareService.remove('token')
          this.stogareService.remove('brandDetails')
          this.stogareService.remove('userId')
          this.routers.navigate(['auth'])
        })
      }


    },5000)
  }

  setUserInactive = () => {
    let conversationId = this.storageService.getItem('conversation-id');
    this.getApiResponseService
      .setUserInactive(conversationId, this.conversationToken)
      .subscribe(
        (data) => {},
        (err) => {
          console.log('err =====>', err);
        }
      );
  };

  fetchBot = (botType: string, convId: any) => {
    botType = decodeURIComponent(botType);
    this.getApiResponseService.fetchBot(botType).subscribe(
      (data) => {
        this.storageService.setItem({ botInfo: data.data[0] });
        if (!convId) {
          this.getConversation(undefined);
        } else {
          this.getConversation(convId);
        }
        if (data.data[0].avatarUri) {
          this.avatarUri = data.data[0].avatarUri;
        } else {
          this.avatarUri = '';
        }
        this.displayName = data.data[0].displayName;
        if (data.data[0].liveAgentSupport) {
          this.showChatButton = data.data[0].liveAgentSupport;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getQueryVariable(variable):any {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] == variable) {
        return pair[1];
      }
    }
  }

  sendMessage(data: string) {
    this.getApiResponseService.updatedata(data);
    this.getButtonIdService.updatedata(true);
    const newData = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: data,
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

  getConversation = (convId) => {
    if (convId) {
      this.screen = 'chat';
      this.mode = 'bot';
      this.getApiResponseService.getWhatsappChat().subscribe((data) => {
        data.activities.map((act) => {
          if (act.value.sender === 'bot') {
            this.insertInArray('convChatArray', 1, act);
          } else if (act.value.sender === 'user') {
            this.convChatArray.push({
              type: 0,
              request: act.text,
              response: act,
            });
          } else if (act.value.sender === 'agent') {
            this.insertInArray('convChatArray', 3, act);
          }
          this.chatArray = this.convChatArray;
        });
        this.scrollToBottom();
        const endpoint = environment.directlineURL;
        const socket = io(endpoint, {
          query: { conversationId: convId },
          path: '/directline/socket.io',
        });
        socket.on('sendMessage', (message) => {
          if (message.data && message.data != '') {
            // let data = JSON.parse(message.data);
            let data = message.data;

            //this.homeChatArray = [];
            if (Object.keys(data).length != 0) {
              var d = JSON.parse(JSON.stringify(data));
              for (let i = 0; i < d.activities.length; i++) {
                var element = d.activities[i];
                //user message
                if (
                  element.from.id ===
                  this.storageService.getItem('conversation-id')
                ) {
                  if (element.text === 'init') {
                    this.screen = 'home';
                  } else {
                    this.screen = 'chat';
                  }

                  if (element.text !== 'init' && element.text !== 'resend') {
                    this.convChatArray.push({
                      type: 0,
                      request: element.text,
                      response: element,
                    });
                  }
                } else if (element.value && element.value.sender === 'agent') {
                  this.screen = 'chat';
                  this.mode = 'agent';
                  this.convChatArray.push({ type: 3, response: element });
                } else {
                  //bot message
                  this.mode = 'bot';
                  if (element.text !== 'Hello and welcome!') {
                    if (
                      (this.screen === 'home' && this.theme === 'dark') ||
                      (this.screen === 'home' && this.theme === '')
                    ) {
                      //this.homeChatArray.push({ type: 1, response: element });
                      this.insertInArray('homeChatArray', 1, element);
                    } else if (
                      this.screen === 'home' &&
                      this.theme === 'light'
                    ) {
                      //this.authHomeChatArray.push({ type: 1, response: element });
                      this.insertInArray('authHomeChatArray', 1, element);
                    } else {
                      //this.convChatArray.push({ type: 1, response: element });
                      this.insertInArray('convChatArray', 1, element);
                    }
                    this.typingAnimationService.update(false);
                  }
                }

                if (element.type == 'loginCard') {
                } else if (
                  element.type == 'statusCode' &&
                  element.value.statusCode == 200
                ) {
                  //200 - Login successful
                  if (this.themeIsSwitchable) {
                    this.switchTheme('light');
                  }
                } else if (
                  element.type == 'statusCode' &&
                  element.value.statusCode == 204
                ) {
                  //204 - Logout successful

                  if (this.themeIsSwitchable) {
                    this.switchTheme('dark');
                  }
                } else if (
                  element.type == 'statusCode' &&
                  element.value.statusCode == 401
                ) {
                  //401 - Incorrect OTP
                }

                if (
                  (this.screen === 'home' && this.theme === 'dark') ||
                  (this.screen === 'home' && this.theme === '')
                ) {
                  this.chatArray = this.homeChatArray;
                } else if (this.screen === 'home' && this.theme === 'light') {
                  this.chatArray = this.authHomeChatArray;
                } else {
                  this.chatArray = this.convChatArray;
                }

                this.scrollToBottom();
              }
            }
          }
        });
        socket.on('error', (error) => {
          console.log(error);
        });
      });
    } else {
      this.getApiResponseService.getConversationId().subscribe(
        (data) => {
          const endpoint = environment.directlineURL;
          this.conversationToken = data.token;
          const socket = io(endpoint, {
            query: { conversationId: data.conversationId },
            path: '/directline/socket.io',
          });
          socket.on('sendMessage', (message) => {
            if (message.data && message.data != '') {
              // let data = JSON.parse(message.data);
              let data = message.data;

              //this.homeChatArray = [];
              if (Object.keys(data).length != 0) {
                var d = JSON.parse(JSON.stringify(data));
                for (let i = 0; i < d.activities.length; i++) {
                  var element = d.activities[i];
                  //user message
                  if (
                    element.from.id ===
                    this.storageService.getItem('conversation-id')
                  ) {
                    if (element.text === 'init') {
                      this.screen = 'home';
                    } else {
                      this.screen = 'chat';
                    }

                    if (element.text !== 'init' && element.text !== 'resend') {
                      this.convChatArray.push({
                        type: 0,
                        request: element.text,
                        response: element,
                      });
                    }
                  } else if (
                    element.value &&
                    element.value.sender === 'agent'
                  ) {
                    this.screen = 'chat';
                    this.mode = 'agent';
                    this.convChatArray.push({ type: 3, response: element });
                  } else {
                    //bot message
                    this.mode = 'bot';
                    if (element.text !== 'Hello and welcome!') {
                      if (
                        (this.screen === 'home' && this.theme === 'dark') ||
                        (this.screen === 'home' && this.theme === '')
                      ) {
                        //this.homeChatArray.push({ type: 1, response: element });
                        this.insertInArray('homeChatArray', 1, element);
                      } else if (
                        this.screen === 'home' &&
                        this.theme === 'light'
                      ) {
                        //this.authHomeChatArray.push({ type: 1, response: element });
                        this.insertInArray('authHomeChatArray', 1, element);
                      } else {
                        //this.convChatArray.push({ type: 1, response: element });
                        this.insertInArray('convChatArray', 1, element);
                      }
                      this.typingAnimationService.update(false);
                    }
                  }

                  if (element.type == 'loginCard') {
                  } else if (
                    element.type == 'statusCode' &&
                    element.value.statusCode == 200
                  ) {
                    //200 - Login successful
                    if (this.themeIsSwitchable) {
                      this.switchTheme('light');
                    }
                  } else if (
                    element.type == 'statusCode' &&
                    element.value.statusCode == 204
                  ) {
                    //204 - Logout successful

                    if (this.themeIsSwitchable) {
                      this.switchTheme('dark');
                    }
                  } else if (
                    element.type == 'statusCode' &&
                    element.value.statusCode == 401
                  ) {
                    //401 - Incorrect OTP
                  }

                  if (
                    (this.screen === 'home' && this.theme === 'dark') ||
                    (this.screen === 'home' && this.theme === '')
                  ) {
                    this.chatArray = this.homeChatArray;
                  } else if (this.screen === 'home' && this.theme === 'light') {
                    this.chatArray = this.authHomeChatArray;
                  } else {
                    this.chatArray = this.convChatArray;
                  }

                  this.scrollToBottom();
                }
              }
            }
          });
          socket.on('error', (error) => {
            console.log(error);
          });
          this.storageService.setItem({
            'conversation-id': data.conversationId,
          });
          socket.on('fetchHomeData', () => {
            this.fetchHomeData();
          });
        },
        (error) => {
          console.log('error in conversation id :::::', error);
        }
      );
    }
  };

  insertInArray = (arrayName: string, type: number, element: any) => {
    //console.log(`array name>>>>>>>> ${arrayName}`, this[arrayName]);
    //console.log("element id>>>>>>>> ", element.id);
    //console.log("element >>>>>>>> ", element);
    //console.log("element replyToId>>>>>>>> ", element.replyToId);
    this[arrayName].push({ type: type, response: element });
    this[arrayName].sort((a: any, b: any) => {
      // console.log(a);
      // console.log(b);
      let x, y;
      if (a.response.replyToId && b.response.replyToId) {
        x = parseInt(
          a.response.id
            ? a.response.id.split('|')[1]
            : a.response.replyToId.split('|')[1]
        );
        y = parseInt(
          b.response.id
            ? b.response.id.split('|')[1]
            : b.response.replyToId.split('|')[1]
        );
      }
      if (x > y) return 1;
      if (y > x) return -1;

      return 0;
    });
  };

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    // this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
    // let mainHeight = this.mainframe.nativeElement.offsetHeight;
    // let headerHeight = this.frameheader.nativeElement.offsetHeight;
    // let footerHeight = this.framefooter.nativeElement.offsetHeight;
    // this.frameBodyHeight = mainHeight - (headerHeight + footerHeight);
    // console.log("height--" + footerHeight);
    // this.scrollFrame.nativeElement.style.height = this.frameBodyHeight + 'px';
  }

  isGreeting = (response: any) => {
    if (response.type == 'iconMessage') {
      let m = response.value.message.search(/good morning/i);
      let a = response.value.message.search(/good afternoon/i);
      let e = response.value.message.search(/good evening/i);
      if (m > -1 || a > -1 || e > -1) {
        return true;
      }
    }
    return false;
  };

  showHomeScreen() {
    //do not call API if state not changed from CRM to Sales or vice versa
    // if (!this.reloadHome) {
    //   this.getButtonIdService.updatedata(false);//show frame header
    // } else {
    //   //this.fetchHomeData();
    //   this.reloadHome = false;
    // }

    this.getButtonIdService.updatedata(false); //show frame header

    if (this.theme === 'dark' || this.theme === '') {
      if (this.homeChatArray.length > 0) {
        this.chatArray = this.homeChatArray;
      } else {
        this.fetchHomeData();
      }
    } else if (this.theme === 'light') {
      if (this.authHomeChatArray.length > 0) {
        this.chatArray = this.authHomeChatArray;
      } else {
        this.fetchHomeData();
      }
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.scrollContainer.scroll({
        top: 900000,
        left: 0,
        behavior: 'smooth',
      });
    }, 400);
  }

  switchTheme(theme: any) {
    if (theme == 'dark') {
      this.loaderText = 'Switching to Sales Mode';
      setTimeout(() => {
        this.loaderText = null;
        this.theme = 'dark';
      }, 3000);
      this.reloadHome = true;
    } else if (theme == 'light') {
      this.loaderText = 'Turning into your CRM Assistant';
      this.reloadHome = true;
      setTimeout(() => {
        this.loaderText = null;
        this.theme = 'light';
      }, 3000);
    }
  }

  fetchHomeData() {
    this.homeDataKey = 'init';
    this.homeChatArray = []; //clear home screen data
    this.showHideInputService.update(true); //show keyboard button
    this.typingAnimationService.update(true); //show typing 3 dots
    this.getApiResponseService.updatedata(this.homeDataKey);
    this.getButtonIdService.updatedata(false); //show frame header
    const newData = {
      conversationId: this.storageService.getItem('conversation-id'),
      text: this.homeDataKey,
      voiceFlag: false,
    };

    this.getApiResponseService.getChat(newData).subscribe(
      (data) => {
        this.typingAnimationService.update(false);
      },
      (err) => {
        console.log('err =====>', err);
      }
    );
    this.homeDataKey = '';
  }
}
