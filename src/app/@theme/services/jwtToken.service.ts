import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  jwtToken: string;
  decodedToken: any;
  tokens;

  constructor() {}

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken(moduleName) {
    this.tokens = jwt_decode(this.jwtToken);
    switch (moduleName) {
      case 'user':
        return this.tokens.user;

      case 'userId':
        return this.tokens.id;

      case 'userHeadId':
        return this.tokens.userHeadId;

      case 'userName':
        return this.tokens.userName;

      case 'allPermissions':
        return this.tokens;

      default:
        return null;
    }
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.displayname : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = parseInt(this.getExpiryTime());
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
