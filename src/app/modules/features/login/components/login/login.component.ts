import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) {}
  
  navigateToRegister(event: Event): void {
    if(event) {
      this.router.navigate(['/register']);
    }
  }
}
