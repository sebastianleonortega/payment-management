import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});


  ngOnInit() {
    this.initFormLogin();
  }

  onSubmit() {
    if (this.formLogin.valid) {
      console.log('Login data:', this.formLogin.value);

    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  initFormLogin(): void {
    this.formLogin = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

}
