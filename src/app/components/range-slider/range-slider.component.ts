import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { GetApiResponseService } from '../../services/getApiResponse/get-api-response.service';
// import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Options, LabelType } from 'ngx-slider-v2';
@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent implements OnInit {
  @Input() sliderMaxRange: string;
  @Input() sliderMinRange: number;
  @Input() sliderRangeData: any = [];

  value = 0;
  valueOfSlider: any;
  maxRange: any;
  options: any;

  constructor(private getApiResponseService: GetApiResponseService) {}

  ngOnInit(): void {
    this.maxRange = parseInt(this.sliderMaxRange.split('>')[1]);

    this.options = {
      floor: this.sliderMinRange,
      ceil: this.maxRange,
      step: 1000,
      showSelectionBar: true,
      getSelectionBarColor: (value: number): string => {
        this.valueOfSlider = value.toString();
        this.getApiResponseService.updateValue(this.valueOfSlider);
        return '#e63756';
      },
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Floor:
            return '' + value;
          case LabelType.Ceil:
            return '' + value;
          default:
            return '' + value;
        }
      },
    };
  }

  // getRangeValue(number) {
  //   return Math.round(number / 1000) + 'k';
  // }
}
