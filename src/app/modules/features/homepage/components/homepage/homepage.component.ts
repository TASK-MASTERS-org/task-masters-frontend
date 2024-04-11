import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private router: Router) {}

  carouselImages: string[] = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg'
  ];

  navigateToJobPosting(event: Event): void {
    if(event) {
      this.router.navigate(['/job-post']);
    }
  }
}


