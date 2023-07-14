import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreSubjectsService {
  //  userData = new Subject<any>();
  public userData = new BehaviorSubject<any>(0);
  constructor() {}

  setUserData(data: any) {
    this.userData.next(data);
  }
  public getStoredata$(): Observable<any> {
    return this.userData.asObservable();
  }
}
