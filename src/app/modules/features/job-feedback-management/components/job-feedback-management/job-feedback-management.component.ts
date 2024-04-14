import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobPostManageModalComponent } from '../job-post-manage-modal/job-post-manage-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FeedbackManageModalComponent } from '../feedback-manage-modal/feedback-manage-modal.component';
@Component({
  selector: 'app-job-feedback-management',
  templateUrl: './job-feedback-management.component.html',
  styleUrl: './job-feedback-management.component.scss',
})
export class JobFeedbackManagementComponent {
  jobPosts: any = [
    {
      id: 1,
      category: 'Software Developer',
      description:
        'Full stack developer needed for a 6-month project in Python and Django.',
      skills: 'Python, Django, HTML, CSS',
      date: '2024-04-10T15:00:00',
      location: 'Colombo',
      budget: '2500',
      status: 'CompletedRated',
    },
    {
      id: 2,
      category: 'Data Scientist',
      description:
        'Data scientist needed for a machine learning project. Experience with TensorFlow and scikit-learn required.',
      skills: 'Python, TensorFlow, scikit-learn, Statistics',
      date: '2024-04-11T10:00:00',
      location: 'Colombo - Remote',
      budget: '5000',
      status: 'Pending',
    },
    {
      id: 3,
      category: 'Web Developer',
      description:
        'Front-end developer needed to build a user interface with React and Bootstrap.',
      skills: 'JavaScript, React, Bootstrap, HTML, CSS',
      date: '2024-04-12T12:00:00',
      location: 'Jaffna',
      budget: '2000',
      status: 'InProgress',
    },
    {
      id: 4,
      category: 'Mobile Developer',
      description:
        'Experienced Android developer needed to build a new social networking app.',
      skills: 'Java, Kotlin, Android Studio',
      date: '2024-04-11T09:00:00',
      location: 'Gampaha',
      budget: '4000',
      status: 'Completed',
    },
    {
      id: 5,
      category: 'QA Engineer',
      description:
        'QA engineer needed to perform manual and automated testing on a new e-commerce platform.',
      skills: 'Selenium, Cypress, API testing',
      date: '2024-04-10T18:00:00',
      location: 'Kalutara',
      budget: '3500',
      status: 'Pending',
    },
    {
      id: 6,
      category: 'UX/UI Designer',
      description:
        'Looking for a UX/UI designer to create a user-friendly and visually appealing design for our new mobile app.',
      skills: 'Figma, Sketch, Adobe XD, UI/UX Design',
      date: '2024-04-12T15:00:00',
      location: 'Kalutara',
      budget: '2800',
      status: 'InProgress',
    },
    {
      id: 7,
      category: 'DevOps Engineer',
      description:
        'DevOps engineer needed to automate our software development pipeline.',
      skills: 'Jenkins, Git, AWS, DevOps principles',
      date: '2024-04-11T14:00:00',
      location: 'Kalutara',
      budget: '4800',
      status: 'Completed',
    },
    {
      id: 8,
      category: 'Network Engineer',
      description:
        'Network engineer needed to configure and maintain our company network.',
      skills: 'CCNA, CCNP, Cisco Networking, Network troubleshooting',
      date: '2024-04-10T10:00:00',
      location: 'Kalutara',
      budget: '3800',
      status: 'Pending',
    },
  ];

  feedbacks: any = [
    { id: 1, review: 'Good labor', rating: 4 },
    { id: 2, review: 'Bad labor', rating: 1 },
    { id: 3, review: 'Normal labor', rating: 3 },
  ];

  feedbackData: any = { id: 1, review: 'Good labor', rating: 4 };

  displayedJobManagementColumns: string[] = [
    'id',
    'category',
    'description',
    'skills',
    'date',
    'location',
    'budget',
    'status',
    'action',
    'feedback',
  ];

  displayedFeedbackManagementColumns: string[] = [
    'id',
    'review',
    'rating',
    'action',
  ];

  dataSourceJobManagement = new MatTableDataSource(this.jobPosts);
  dataSourceFeedbackManagement = new MatTableDataSource(this.feedbacks);
  @ViewChild(MatSort) sortJobPosts!: MatSort;
  @ViewChild(MatSort) sortFeedbacks!: MatSort;

  jobManageModalRef: MdbModalRef<JobPostManageModalComponent> | null = null;
  feedbackManageModalRef: MdbModalRef<FeedbackManageModalComponent> | null =
    null;

  constructor(private modalService: MdbModalService) {}

  ngAfterViewInit() {
    this.dataSourceJobManagement.sort = this.sortJobPosts;
    this.dataSourceFeedbackManagement.sort = this.sortFeedbacks;
  }

  applyFilterJobManagement(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceJobManagement.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFeedbackManagement(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFeedbackManagement.filter = filterValue.trim().toLowerCase();
  }

  openJobPostManageModal(element: any): void {
    this.jobManageModalRef = this.modalService.open(
      JobPostManageModalComponent,
      {
        modalClass: 'modal-lg',
        data: { jobData: element },
      }
    );
    this.jobManageModalRef.onClose.subscribe((message: any) => {
      //Again hit the get all API
      console.log('closed');
    });
  }

  openFeedbackManageModal(element: any): void {
    if (element.status === 'CompletedRated') {
      // await API call and get feedbackData from hiredLabour id and set to feedbackData
      this.feedbackManageModalRef = this.modalService.open(
        FeedbackManageModalComponent,
        {
          modalClass: 'modal-lg',
          data: { jobData: element, feedbackData: this.feedbackData },
        }
      );
    } else {
      this.feedbackManageModalRef = this.modalService.open(
        FeedbackManageModalComponent,
        {
          modalClass: 'modal-lg',
          data: { jobData: element, feedbackData: element },
        }
      );
    }
    this.feedbackManageModalRef.onClose.subscribe((message: any) => {
      //Again hit the get all API
      console.log('closed');
    });
  }
}
