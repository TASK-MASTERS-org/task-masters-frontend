import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  constructor(private router: Router) {}
  
  regVictor: string = 'assets/images/register.png';

  navigateToHome(event: Event): void {
    if(event) {
      this.router.navigate(['/homepage']);
    }
  }
}
