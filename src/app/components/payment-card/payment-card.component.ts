import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent implements OnInit {

  @Input() paymentMethod:any;
  constructor() { }

  ngOnInit(): void {
  }

}
