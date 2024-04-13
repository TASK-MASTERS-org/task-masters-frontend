import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrl: './member-layout.component.scss'
})
export class MemberLayoutComponent implements OnInit, OnDestroy {

  showFooter = true;
  private subscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    const hideFooterFromStorage = localStorage.getItem('hideFooter');
    this.showFooter = hideFooterFromStorage !== 'true';

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.showFooter = !event.urlAfterRedirects.includes('/job-feedback-management');
      localStorage.setItem('hideFooter', this.showFooter ? 'false' : 'true');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
