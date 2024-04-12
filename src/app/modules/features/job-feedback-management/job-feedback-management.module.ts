import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobFeedbackManagementRoutingModule } from './job-feedback-management-routing.module';
import { JobFeedbackManagementComponent } from './components/job-feedback-management/job-feedback-management.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    JobFeedbackManagementComponent
  ],
  imports: [
    CommonModule,
    JobFeedbackManagementRoutingModule,
    SharedModule
  ]
})
export class JobFeedbackManagementModule { }
