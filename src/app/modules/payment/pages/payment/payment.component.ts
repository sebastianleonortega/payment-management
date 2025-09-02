import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {Payments} from "../../interfaces/payment.interface";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  payments: Payments[] = [];

  constructor(private _paymentService: PaymentService) {
  }

  ngOnInit() {
    this._paymentService.getAllPayment().subscribe(data => {
      this.payments = data;
      console.log(data)
    });
  }

}
