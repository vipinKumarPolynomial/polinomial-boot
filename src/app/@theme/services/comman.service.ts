import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwtToken.service';
import { StoreTokenService } from './storeToken.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private token: StoreTokenService,
    private jwt: JwtTokenService,
    private httpClient: HttpClient
  ) {}

  getUser() {
    this.jwt.setToken(this.token.get('token'));
    this.jwt.decodeToken();
    return { userId: this.jwt.getDecodeToken('userId') };
  }

  envUrl() {
    return 'http://20.219.99.103/integrations/v1/website/bot/';
  }


}
