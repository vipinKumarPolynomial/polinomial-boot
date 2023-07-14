import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StoreTokenService {
  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }


}
