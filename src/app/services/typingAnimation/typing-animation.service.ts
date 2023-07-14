import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypingAnimationService {

  constructor() { }

  private animationService = new BehaviorSubject<boolean>(false);
  public animate = this.animationService.asObservable()
  
  update(value) {
    this.animationService.next(value)
  }
}
