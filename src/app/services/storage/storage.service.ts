import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private addInputContentText = new BehaviorSubject<any>('');
  private removeInputContentText = new BehaviorSubject<any>('');
  public addShare = this.addInputContentText.asObservable();
  public removeShare = this.removeInputContentText.asObservable();

  constructor() { }
  
  addInputContent(value) {
    this.addInputContentText.next(value)
  }
  
  removeInputContent(value) {
    this.removeInputContentText.next(value)
  }

  storage:any = {};
  setItem(data:any){
    this.storage = {...this.storage,...data};
  }

  getItem(key:string){
    return this.storage[key];
  }

}
