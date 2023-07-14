import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number-slider',
  templateUrl: './number-slider.component.html',
  styleUrls: ['./number-slider.component.scss']
})
export class NumberSliderComponent implements OnInit {

  @Input() surveyDetails: any;

  currentSlide = 0;
  constructor() { }

  slideConfig = {
    dots: false,
    arrows: false,
  };

  sliderItems = [
    {text:"Would you like to have a living room ?"},
    {text:"Would you like to have a living room ?"},
    {text:"Would you like to have a living room ?"},
    {text:"Would you like to have a living room ?"}
  ];
  ngOnInit(): void {
  }

  afterChange(e){
    this.currentSlide = e.currentSlide;
  }

}
