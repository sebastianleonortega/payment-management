import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payments} from "../interfaces/payment.interface";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) { }

  getAllPayment(): Observable<Payments[]>{
    return this._http.get<Payments[]>('assets/pagos.json')
  }
}
