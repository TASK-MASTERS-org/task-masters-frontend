import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isForgotPassEvent: boolean = false;
  isSendForgotPassDetails: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private sharedService: SharedDataService,
    private validations: ValidationService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validEmail()])
    ),
    password: new FormControl(null, Validators.required),
  });

  forgotPassDetailsForm = new FormGroup({
    email: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validEmail()])
    ),
  });

  resetPasswordForm = new FormGroup({
    token: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
  });

  get lForm() {
    return this.loginForm.controls;
  }
  get fForm() {
    return this.forgotPassDetailsForm.controls;
  }
  get rForm() {
    return this.resetPasswordForm.controls;
  }

  navigateToRegister(event: Event): void {
    if (event) {
      this.router.navigate(['/register']);
    }
  }

  navigateToHome(event: Event): void {
    if (event) {
      this.isLoggedIn = true;
      this.sharedService.setData(this.isLoggedIn);
      this.router.navigate(['/homepage']);
    }
  }

  navigateForgotPassword(event: Event): void {
    if (event) {
      this.isForgotPassEvent = true;
    }
  }

  sendForgotPassDetails(event: Event): void {
    if (event) {
      this.isSendForgotPassDetails = true;
      //call to the forgot pass API
    }
  }

  navigateToLogin(event: Event): void {
    if (event) {
      this.isForgotPassEvent = false;
      this.isSendForgotPassDetails = false;
      this.router.navigate(['/login']);
    }
  }

  onSubmitLoginForm(loginFormDetails: any) {
    if (this.loginForm.valid) {

    } else {

    }
  }

  onSubmitForgotPassForm(forgotPassFormDetails: any) {
    if (this.forgotPassDetailsForm.valid) {

    } else {
      
    }
  }

  onSubmitResetPassForm(resetPasswordFormDetails: any) {
    if (this.resetPasswordForm.valid) {

    } else {
      
    }
  }
}
