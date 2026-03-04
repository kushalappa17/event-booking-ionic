import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../lib/auth.actions';
import { SKIP_AUTH } from '../app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup<{
      emailId: FormControl<string>;
      password: FormControl<string>
    }>;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private store: Store, private router: Router) {
      this.loginForm = this.fb.nonNullable.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const payload = this.loginForm.getRawValue();
    this.httpClient.post<{token: string}>('http://localhost:8083/api/users/authenticate',payload, {
       context: new HttpContext().set(SKIP_AUTH, true)
    }).subscribe(res => {
        this.store.dispatch(loginSuccess({token: res.token}));
        this.router.navigate(['/']);
    });
  }

  get f() {
    return this.loginForm.controls;
  }

}
