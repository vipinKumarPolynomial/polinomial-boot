import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreSubjectService {
  verifyUserData = new Subject<any>();
  constructor() {}

  setUserVerifyData(data: any) {
    console.log('data', data);

    this.verifyUserData.next(data);
    console.log('afternext', this.verifyUserData);
  }

  public getUserVerifyData(): Observable<any> {
    return this.verifyUserData.asObservable();
  }
}
