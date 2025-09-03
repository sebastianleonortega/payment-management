import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {Payments} from "../../interfaces/payment.interface";
import {ButtonDirective} from "primeng/button";
import {Table, TableModule} from "primeng/table";
import {CurrencyPipe, TitleCasePipe} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {TagModule} from "primeng/tag";
import {Ripple} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {PaymentFormComponent} from "../payment-form/payment-form.component";
import {ChipsModule} from "primeng/chips";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";

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
    ChipsModule,
    TitleCasePipe,
    CalendarModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  visible = false;
  payments: Payments[] = [];
  selectedPayment: Payments | null = null;
  dialogTitle = 'Crear pago';

  constructor(private _paymentService: PaymentService) {}

  ngOnInit() {
    this._paymentService.getAllPayment().subscribe(data => {
      this.payments = data;
    });
  }

  createPayment() {
    this.dialogTitle = 'Registrar pago';
    this.selectedPayment = null;
    this.visible = true;
  }

  onEdit(payment: Payments) {
    this.dialogTitle = 'Editar pago';
    this.selectedPayment = payment;
    this.visible = true;
  }

  createOrUpdatePayment(payment: Payments) {
    if (this.selectedPayment) {
      Object.assign(this.selectedPayment, payment);
    } else {
      this.payments.unshift(payment);
    }
    this.visible = false;
  }

  getFilteredSum(dt: Table): number {
    const data = dt.filteredValue || this.payments;
    return data.reduce((acc, p) => acc + (p.operationValue || 0), 0);
  }

}
