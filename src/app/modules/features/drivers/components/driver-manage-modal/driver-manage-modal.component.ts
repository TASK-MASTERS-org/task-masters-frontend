import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-driver-manage-modal',
  templateUrl: './driver-manage-modal.component.html',
  styleUrls: ['./driver-manage-modal.component.scss']
})
export class DriverManageModalComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<DriverManageModalComponent>, 

  ) {}

  ngOnInit(): void {
  }


  driverForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
    });


  

  saveDriver(): void {
    if (this.driverForm.valid) {
      // Process the form data, e.g., send it to a service for saving
      console.log('Driver details:', this.driverForm.value);
      // Close the modal
      // this.modalRef.close();
    } else {
      // Display error messages or handle invalid form
    }
  }
}
