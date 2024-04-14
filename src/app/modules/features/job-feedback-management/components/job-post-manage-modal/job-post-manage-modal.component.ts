import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-post-manage-modal',
  templateUrl: './job-post-manage-modal.component.html',
  styleUrl: './job-post-manage-modal.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class JobPostManageModalComponent {

  jobData: any;
  constructor(public modalRef: MdbModalRef<JobPostManageModalComponent>, private toastr: ToastrService) {}

  deleteJobPost(jobId: any): void {
    // delete API call

    this.toastr.success(
      'Job post deleted successfully',
      'Success'
    );
    this.modalRef.close();
  }
}
