import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../core/services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isForgotPassEvent: boolean  = false;
  isSendForgotPassDetails: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private sharedService: SharedDataService) {}
  
  navigateToRegister(event: Event): void {
    if(event) {
      this.router.navigate(['/register']);
    }
  }

  navigateToHome(event: Event): void {
    if(event) {
      this.isLoggedIn = true;
      this.sharedService.setData(this.isLoggedIn);
      this.router.navigate(['/homepage']);
    }
  }

  navigateForgotPassword(event: Event): void {
    if(event) {
      this.isForgotPassEvent = true;
    }
  }

  sendForgotPassDetails(event: Event) :void {
    if(event) {
      this.isSendForgotPassDetails = true;
    }
  }

  forgotPassword(event:Event): void {
    if(event) {
      this.isForgotPassEvent = false;
      this.isSendForgotPassDetails = false;
      this.router.navigate(['/login'])
    }
  }
}
