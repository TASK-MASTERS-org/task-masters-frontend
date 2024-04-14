import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-manage-modal',
  templateUrl: './feedback-manage-modal.component.html',
  styleUrl: './feedback-manage-modal.component.scss'
})
export class FeedbackManageModalComponent implements OnInit{

  jobData: any;
  feedbackData: any;
  constructor(public modalRef: MdbModalRef<FeedbackManageModalComponent>, private toastr: ToastrService) {}

  ngOnInit(): void {

  }

  deleteFeedbackForJobPost(feedbackId: any): void {

  }

}
