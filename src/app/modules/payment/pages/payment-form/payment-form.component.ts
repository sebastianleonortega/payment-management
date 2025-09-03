import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {DecimalPipe} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChipsModule,
    DropdownModule,
    CheckboxModule,
    DecimalPipe,
    ButtonDirective,
    FileUploadModule,
    CalendarModule,

  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent implements OnInit {

  @Input() initialData: any = null;
  @Output() formSubmit = new EventEmitter<any>();

  paymentStatusOptions = ['PENDIENTE', 'AUTORIZADO', 'RECHAZADO'];
  paymentMethodOptions = ['CASH', 'TRANSFER', 'CHECK'];


  formPayment : FormGroup = new FormGroup({});
  selectedFiles: { invoiceUrl?: File; supportUrl?: File } = {};
  traceability: { user: string; date: Date; note: string }[] = [];


  ngOnInit() {
    this.initFormPayment();
  }

  initFormPayment(): void {
    this.formPayment = new FormGroup({
      date: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      operationArea: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      thirdParty: new FormControl('', [Validators.required, Validators.minLength(3)]),
      operationValue: new FormControl('', [Validators.required, Validators.min(1)]),
      paymentStatus: new FormControl('PENDIENTE', [Validators.required]), // valor por defecto
      incomeOrExpense: new FormControl('GASTO', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      hasBudget: new FormControl(false),
      invoiceUrl: new FormControl(''),
      supportUrl: new FormControl('')
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formPayment.get(controlName);
    if (control?.touched && control.invalid) {
      if (control.errors?.['required']) return 'Este campo es obligatorio';
      if (control.errors?.['minlength']) {
        return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors?.['min']) return `El valor debe ser mayor que 0`;
    }
    return null;
  }

  onFileSelect(event: any, field: 'invoiceUrl' | 'supportUrl'): void {
    const file = event.files ? event.files[0] : event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
      this.formPayment.patchValue({ [field]: file.name });
    }
  }

  onSubmit(): void {
    if (this.formPayment.valid) {
      const paymentData = this.formPayment.value;

      this.traceability.push({
        user: 'mockUser',
        date: new Date(),
        note: this.initialData ? 'Payment updated' : 'Payment created'
      });

      const result = {
        ...paymentData,
        traceability: this.traceability,
      };

      this.formSubmit.emit(result); // 👈 lo enviamos al padre
    } else {
      this.formPayment.markAllAsTouched();
    }
  }




}
