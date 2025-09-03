import {Component} from '@angular/core';
import {HeaderComponent} from "../../../../layout/header/header.component";
import {PaymentComponent} from "../../../payment/pages/payment/payment.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    PaymentComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
