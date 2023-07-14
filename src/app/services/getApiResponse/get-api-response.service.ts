import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AESService } from '../AES/aes.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetApiResponseService {
  constructor(
    private httpClient: HttpClient,
    private aesService: AESService,
    private storageService: StorageService
  ) {}

  tokenHdr: any;

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

  private chatService = new BehaviorSubject<string>('');
  public share = this.chatService.asObservable();
  updatedata(value) {
    this.chatService.next(value);
  }

  private thumbnailService = new BehaviorSubject<string>('');
  public getThumbnail = this.thumbnailService.asObservable();
  updateThumbnail(value) {
    this.thumbnailService.next(value);
  }

  private thumbnailStatusService = new BehaviorSubject<string>('');
  public getThumbnailStatus = this.thumbnailStatusService.asObservable();
  updateThumbnailStatus(value) {
    this.thumbnailStatusService.next(value);
  }

  private msgService = new BehaviorSubject<object>({});
  public shared = this.msgService.asObservable();
  updatechat(value) {
    this.msgService.next(value);
  }

  private valueService = new BehaviorSubject<string>('');
  public sharable = this.valueService.asObservable();
  updateValue(value) {
    this.valueService.next(value);
  }

  getTimeStamp() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  getChat(newData): Observable<any> {
    let botType = this.getQueryVariable('botType');
    if (!botType) {
      botType = this.aesService.encrypt('Sales+CRM-Bot');
    }
    var header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Content-Type', 'application/json');
    var authToken = localStorage.getItem('authToken');
    if (authToken) {
      newData.authToken = authToken;
    }
    // newData.timeStamp = this.getTimeStamp();
    newData.timestamp = new Date();
    if (!newData.attachment) {
      newData.attachment = [];
    }

    let botInfo = this.storageService.getItem('botInfo');
    // let api = botInfo.botDeploymentInfo.backEndUrl;
    let api = `${environment.directlineURL}/directline/polyline/getMessages/?botType=${botType}`;
    return this.httpClient.post(`${api}`, newData, {
      headers: header,
    });
  }

  getWhatsappChat(): Observable<any> {
    let botType = this.getQueryVariable('botType');
    let convId = this.storageService.getItem('conversation-id');
    if (!botType) {
      botType = this.aesService.encrypt('Sales+CRM-Bot');
    }
    var header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Content-Type', 'application/json');

    let botInfo = this.storageService.getItem('botInfo');
    let api = `${environment.directlineURL}/directline/polyline/getExistingMessages/?conversationId=${convId}`;
    return this.httpClient.post(
      `${api}`,
      {},
      {
        headers: header,
      }
    );
  }

  fetchBot(botType: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiURLAzure_new}/bot/fetchOneBotInfo?botType=${botType}`
    );
  }

  setUserInactive(conversationId: string, token: string): Observable<any> {
    let header: any = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      type: 'event',
      name: 'user/inactive',
      from: {
        id: conversationId,
      },
      value: { userName: 'User' },
    };
    return this.httpClient.post(
      `${environment.directlineURL}/conversations/${conversationId}/activities`,
      payload,
      header
    );
  }

  getConversationId(): Observable<any> {
    let botInfo = this.storageService.getItem('botInfo');
    let botType = this.aesService.encrypt(botInfo.botType);
    let token = this.aesService.decrypt(
      botInfo.botDeploymentInfo.directLine_secret
    );
    //var token = environment.token;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept-Language', 'en-US');
    headers = headers.append('X-SAP-PVL', 'en-US');
    headers = headers.append('Authorization', `Bearer ${token}`);
    return this.httpClient.post(
      `${environment.directlineURL}/directline/polyline/initConversation/?botType=${botType}`,
      {},
      { headers }
    );
  }

  upload(payload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', environment.uploadToken);
    return this.httpClient.post(
      `${environment.apiURLAzure_new}/upload`,
      payload,
      { headers }
    );
  }
}
