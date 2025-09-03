import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {Payments} from "../../interfaces/payment.interface";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {CurrencyPipe} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {TagModule} from "primeng/tag";
import {Ripple} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {PaymentFormComponent} from "../payment-form/payment-form.component";
import {ChipsModule} from "primeng/chips";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ButtonDirective,
    TableModule,
    CurrencyPipe,
    SkeletonModule,
    TagModule,
    Ripple,
    DialogModule,
    PaymentFormComponent,
    ChipsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  visible = false;
  payments: Payments[] = [];
  selectedPayment: any = null;

  constructor(private _paymentService: PaymentService,
  ) {
  }

  ngOnInit() {
    this._paymentService.getAllPayment().subscribe(data => {
      this.payments = data;
    });
  }




  createPayment() {
    this.selectedPayment = null;
    this.visible = true;
  }

  onEdit(payment: any) {
    this.selectedPayment = payment;
    this.visible = true;
  }

  createOrUpdatePayment(payment: any) {
    if (this.selectedPayment) {
      Object.assign(this.selectedPayment, payment);
    } else {
      this.payments.push(payment);
    }
    this.visible = false;
  }

  getFilteredSum(dt: any): number {
    const rows = dt.filteredValue || this.payments;
    return rows.reduce((sum: number, p: any) => sum + (p.operationValue || 0), 0);
  }


}
