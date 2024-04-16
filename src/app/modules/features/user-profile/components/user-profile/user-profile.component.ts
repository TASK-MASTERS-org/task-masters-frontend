import { Component } from '@angular/core';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';
import { UserProfileService } from '../../services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  userContext: any = '';

  constructor(
    private sharedDataService: SharedDataService,
    private validations: ValidationService,
    private userProfileService: UserProfileService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  userProfileForm = new FormGroup({
    fname: new FormControl(null, Validators.required),
    lname: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(
      null,
      Validators.compose([Validators.required, this.validations.validPhone()])
    ),
  });

  ngOnInit() {
    this.setUserContextData();
    this.userProfileForm.setValue({
      fname: this.userContext.firstname,
      lname: this.userContext.lastName,
      address: this.userContext.address,
      phoneNumber: this.userContext.mobileNumber,
    });
  }

  async setUserContextData(): Promise<void> {
    this.userContext = this.sharedDataService.getContext();
  }

  get uForm() {
    return this.userProfileForm.controls;
  }

  onSubmit(userProfileFormDetails: any) {
    // Handle form submission
    if (this.userProfileForm.valid) {
      const userProfileInfo = {
        fname: userProfileFormDetails?.value?.fname,
        lname: userProfileFormDetails?.value?.lname,
        address: userProfileFormDetails?.value?.address,
        phoneNumber: userProfileFormDetails?.value?.phoneNumber,
      };

      this.userProfileService
        .updateProfile(this.userContext.sub, userProfileInfo)
        .subscribe({
          next: (response: any) => {
            if (response.status === 200) {
              this.sharedDataService.clearStorage();
              let updatedContext = {
                lastName: userProfileInfo.lname,
                firstname: userProfileInfo.fname,
                address: userProfileInfo.address,
                mobileNumber: userProfileInfo.phoneNumber,
                Roles: this.userContext.Roles,
                Id: this.userContext.Id,
                sub: this.userContext.sub,
                iat: this.userContext.iat,
                exp: this.userContext.exp,
              };
              console.log('updated context', updatedContext);
              this.sharedDataService.setContext(updatedContext);
              this.setUserContextData();
              this.sharedDataService.setLoginStatus(true);
              this.toastr.success('Profile updated successfully', 'Success');
              this.router.navigate(['/user-profile']);
            } else {
              this.toastr.error(
                'Error in updating the profile',
                'Error' // other error messages want to consider
              );
            }
          },
          error: (error) => {
            if (error.status === 404) {
              this.toastr.error('User not found with the email', 'Error');
            } else {
              this.toastr.error('Error in updating the profile', 'Error');
            }
          },
        });
    } else {
    }
  }

  updateProfile(): void {}

  deleteProfile(): void {
    this.userProfileService.deleteProfile(this.userContext.sub).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.sharedDataService.clearStorage();
          this.toastr.success('Profile deleted successfully', 'Success');
          this.router.navigate(['/register']);
        } else {
          this.toastr.error(
            'Error in deleting the profile',
            'Error' // other error messages want to consider
          );
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.toastr.error('User not found with the email', 'Error');
        } else {
          this.toastr.error('Error in deleting the profile', 'Error');
        }
      },
    });
  }
}
