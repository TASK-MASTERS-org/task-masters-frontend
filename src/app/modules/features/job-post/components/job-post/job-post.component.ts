import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrl: './job-post.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class JobPostComponent {

  isJobPostStep: boolean = false;
  jobPostImage: string = 'assets/images/jobpost.png'

  ngOnInit() {

  }

  categories: string[] = [
    'Software Engineer',
    'Data Analyst',
    'Project Manager',
    'Network Engineer',
    'Human Resources Specialist',
    'Marketing Manager',
    'Graphic Designer',
    'Accountant',
    'Customer Service Representative',
    'Sales Representative',
  ];

  navigateToJobPostStep(event: Event): void {
    if(event) {
      this.isJobPostStep = true;
    }
  }

  jobPost() {

  }

}
