import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  inputType = 'password';

  loginForm: any;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  toggleType() {
    if (this.inputType == 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  login() {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: null,
      password: null,
    });
  }
}
