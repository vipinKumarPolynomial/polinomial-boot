import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-composite-card',
  templateUrl: './location-composite-card.component.html',
  styleUrls: ['./location-composite-card.component.scss']
})
export class LocationCompositeCardComponent implements OnInit {

  @Input() compositeCard:any;
  constructor() { }

  ngOnInit(): void {
  }

}
