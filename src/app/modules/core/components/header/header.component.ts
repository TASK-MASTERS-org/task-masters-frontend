import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  sharedServiceData: any;
  subscription!: Subscription;
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private sharedService: SharedDataService
  ) {
    this.subscription = new Subscription(); 
  }

  ngOnInit(): void {
    this.setSharedServiceData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setSharedServiceData(): void {
    this.subscription = this.sharedService.data.subscribe((data) => {
      this.sharedServiceData = data;
      this.setProfileComponent(this.sharedServiceData);
    });
  }

  navigateToLogin(event: Event): void {
    if (event) {
      this.router.navigate(['/login']);
    }
  }

  navigateToRegister(event: Event): void {
    if (event) {
      this.router.navigate(['/register']);
    }
  }

  setProfileComponent(sharedServiceData: any): void {
    this.isLoggedIn = sharedServiceData;
  }

  navigateToJobFeedback(event: Event): void {
    if (event) {
      this.router.navigate(['/job-feedback-management']);
    }
  }

  navigateToFaq(event: Event): void {
    if (event) {
      this.router.navigate(['/faq-section']);
    }
  }
}
