import { Component, OnInit } from '@angular/core';
import { GetButtonIdService } from "../../services/getId/get-button-id.service";
import { ShowHideInputService } from "../../services/showHideInput/show-hide-input.service";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-typo-button',
  templateUrl: './typo-button.component.html',
  styleUrls: ['./typo-button.component.scss'],
  animations:[trigger('expandInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0,width:'100vw'}),
      animate('200ms ease-in', style({opacity:1,width:'100px'})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      style({opacity:1,width:'100px'}),
      animate('200ms ease-out', style({opacity:1,width:'92vw'})) 
    ])
  ])]
})
export class TypoButtonComponent implements OnInit {

  constructor(private getButtonIdService : GetButtonIdService, private showHideInputService:ShowHideInputService) { }

  hide = false;

  getBoolean() {
    //this.getButtonIdService.updatedata(true)
   // this.isShowDiv = !this.isShowDiv;
  }

  showHideInput(){
    this.showHideInputService.update(true);
  }

 

  ngOnInit(): void {

    this.showHideInputService.showInput.subscribe(
      (i) => {
        this.hide = i;
      },
      (err) => {
        console.log('error in show/hide button ::::', err);
      }
    );
  }


 

}
