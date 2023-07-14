import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetButtonIdService {

  constructor() { }

  private idService = new BehaviorSubject<boolean>(false);
  public share = this.idService.asObservable()
  
  updatedata(value) {
    this.idService.next(value)
  }
}
