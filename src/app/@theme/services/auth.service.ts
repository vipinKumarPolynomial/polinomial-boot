import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './comman.service';
import { StoreTokenService } from './storeToken.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private commonService: CommonService, private token:StoreTokenService) { }

  public isAuthenticated(): boolean {
    const token = this.token.get('token');
    return !!token ? true : false;
  }

  checkUserLogin(data): any {
    return this.httpClient.post(this.commonService.envUrl() + 'login', data);
  }

  userRagistration(data: any) {
    return this.httpClient.post(this.commonService.envUrl() + 'register',data);
  }

  verifyOTP(data: any) {
    return this.httpClient.post(this.commonService.envUrl() + 'verify',data);
  }

  brandDetails() {
    return this.httpClient.get(this.commonService.envUrl() + 'info');
  }

  refreshToken(data:any) {
    return this.httpClient.post(this.commonService.envUrl() + 'refresh_token',data);
  }

}
