import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { JobFeedbackManagementService } from '../../services/job-feedback-management.service';

@Component({
  selector: 'app-feedback-manage-modal',
  templateUrl: './feedback-manage-modal.component.html',
  styleUrl: './feedback-manage-modal.component.scss'
})
export class FeedbackManageModalComponent implements OnInit{
  @ViewChild('starRating')
  starRating!: StarRatingComponent;

  jobData: any;
  feedbackData: any;
  constructor(public modalRef: MdbModalRef<FeedbackManageModalComponent>, private toastr: ToastrService,
    private jobFeedbackManagementService: JobFeedbackManagementService
   
  ) {}

  ngOnInit(): void {
   console.log(this.jobData)
   console.log("feedbackData", this.feedbackData)
  }

  deleteFeedbackForJobPost(feedbackId: any): void {

  }

  feedbackForm = new FormGroup({
    review: new FormControl(null, Validators.required),

  });

  saveFeedback(): void {
    if (this.feedbackForm.valid) {
  
      const review = this.feedbackForm.value.review;
      const rating = this.starRating.rating;

      const feedbackInfo = {
          hiredLabour: {
                   "id": this.jobData.laborID
          },
          review: review,
          rating: rating,
          serviceType: this.jobData.category,
          feedback_type:"labour"     
      }

      this.jobFeedbackManagementService.PostFeedback(feedbackInfo).subscribe(
        (response) => {
          if(response.status === 200){
            this.toastr.success('Feedback posted successfully', 'Success');
            this.modalRef.close();
          }else{
            this.toastr.error('Failed to post feedback', 'Error');
          }
        },
        (error) => {
          console.error('Error posting feedback:', error);
          this.toastr.error('Failed to post feedback', 'Error');
        }
      );

 
    } else {
      this.toastr.error('Please fill all the required fields', 'Error');
    }
  }

}
