import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobPostManageModalComponent } from '../job-post-manage-modal/job-post-manage-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FeedbackManageModalComponent } from '../feedback-manage-modal/feedback-manage-modal.component';
import { JobFeedbackManagementService } from '../../services/job-feedback-management.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../../core/services/shared-data.service';

@Component({
  selector: 'app-job-feedback-management',
  templateUrl: './job-feedback-management.component.html',
  styleUrl: './job-feedback-management.component.scss',
})
export class JobFeedbackManagementComponent implements OnInit {
  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private jobFeedbackService: JobFeedbackManagementService,
    private sharedDataService: SharedDataService, // Inject the service
  ) {}

  jobPosts: any[] = [];
  userContext: any = '';

  feedbacks: any = [
    { id: 1, review: 'Good labor', rating: 4 },
    { id: 2, review: 'Bad labor', rating: 1 },
    { id: 3, review: 'Normal labor', rating: 3 },
  ];

  feedbackData: any ;

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
    "serviceType"
  ];

  dataSourceJobManagement = new MatTableDataSource(this.jobPosts);
  dataSourceFeedbackManagement = new MatTableDataSource(this.feedbacks);
  @ViewChild(MatSort) sortJobPosts!: MatSort;
  @ViewChild(MatSort) sortFeedbacks!: MatSort;

  jobManageModalRef: MdbModalRef<JobPostManageModalComponent> | null = null;
  feedbackManageModalRef: MdbModalRef<FeedbackManageModalComponent> | null =
    null;



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
      this.getAllJobPostsByUserId()
      console.log('closed');
    });
  }
  ngOnInit(): void {
    this.setUserContextData();
    this.getAllJobPostsByUserId();
    this.GetPostFeedbackByUserID();
  }

  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }

  getAllJobPostsByUserId(): void {
    const userId = this.userContext.Id; // Set the user ID as needed
    this.jobFeedbackService.getJobPostsByUserId(userId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.jobPosts = [];
          console.log('Job posts:', response);
          const formattedData = response.data.map((item:any) => ({
            id: item.j_Id,
            category: item.category,
            description: item.description,
            skills: item.skills,
            date: item.date,
            location: item.location,
            budget: item.budget,
            status: item.hiredLabour?.status,
            laborID:item.hiredLabour.id // Assuming status based on hiredLabour presence
          }));
  
          formattedData.forEach((item:any) => {
            this.jobPosts.push(item);
          });
          console.log('Job posts:', this.jobPosts);
          this.dataSourceJobManagement = new MatTableDataSource(this.jobPosts);
          this.dataSourceJobManagement.sort = this.sortJobPosts;
        } else {
          console.error('Error fetching job posts:');
          this.toastr.error('Error fetching job posts', 'Error');
        }
     
      },
      (error) => {
        console.error('Error fetching job posts:', error);
        this.toastr.error('Error fetching job posts', 'Error');
      }
    );
  }
  openFeedbackManageModal(element: any): void {
    if (element.status === 'CompletedRated') {
      // await API call and get feedbackData from hiredLabour id and set to feedbackData

      this.jobFeedbackService.GetPostFeedbackByHiredLaborID(element.laborID).subscribe(
        (response) => {
          if (response.status === 200) {
            this.feedbackData = response.data;
            this.openFeedbackModal(element, this.feedbackData);
            console.log('Feedback:', this.feedbackData);
          } else {
            console.error('Error fetching feedback:', response);
            this.toastr.error('Error fetching feedback', 'Error');
          }
        },
        (error) => {
          console.error('Error fetching feedback:', error);
          this.toastr.error('Error fetching feedback', 'Error');
        }
      
      )
    } else {
      this.feedbackManageModalRef = this.modalService.open(
        FeedbackManageModalComponent,
        {
          modalClass: 'modal-lg',
          data: { jobData: element, feedbackData: null },
        }
      );
      this.feedbackManageModalRef.onClose.subscribe((message: any) => {
        this.getAllJobPostsByUserId();
        console.log('closed');
      });
      
    }
  }

  openFeedbackModal(element: any, feedbackData: any = null): void {
    this.feedbackManageModalRef = this.modalService.open(
      FeedbackManageModalComponent,
      {
        modalClass: 'modal-lg',
        data: { jobData: element, feedbackData: feedbackData },
      }
    );
  
    this.feedbackManageModalRef.onClose.subscribe((message: any) => {
      this.getAllJobPostsByUserId();
      console.log('closed');
    });
  }

  GetPostFeedbackByUserID(): void {
    const userId = this.userContext.Id; // Set the user ID as needed
    this.jobFeedbackService.GetPostFeedbackByUserID(userId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.feedbacks = response.data;
          const feedbackData = response.data.map((item:any) => ({
            id: item.r_Id,
            review: item.review,
            rating: item.rating,
            serviceType: item.serviceType
          }));
          this.feedbacks = feedbackData;
          this.dataSourceFeedbackManagement = new MatTableDataSource(this.feedbacks);
          this.dataSourceFeedbackManagement.sort = this.sortFeedbacks;
        } else {
          console.error('Error fetching feedbacks:', response);
          this.toastr.error('Error fetching feedbacks', 'Error');
        }
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        this.toastr.error('Error fetching feedbacks', 'Error');
      }
    );
  }
}
