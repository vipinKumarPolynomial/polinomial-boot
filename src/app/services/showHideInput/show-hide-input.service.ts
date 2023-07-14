import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShowHideInputService {

  constructor() { }

  private subject = new BehaviorSubject<boolean>(false);
  public showInput = this.subject.asObservable()
  
  update(value) {
    this.subject.next(value)
  }


}
