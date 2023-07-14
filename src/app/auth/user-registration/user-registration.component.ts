
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserRegistration } from 'src/app/@theme/models/registration';
import { AuthService } from 'src/app/@theme/services/auth.service';
import { StoreTokenService } from 'src/app/@theme/services/storeToken.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  brandDetails: any;
  userRegistrationData = new UserRegistration();

  constructor(
    private router: Router,
    private authService: AuthService,
    private storBrandDetails: StoreTokenService
  ) {}

  ngOnInit(): void {
    // get brand details for render icons and title and thene
    this.brandDetails = JSON.parse(this.storBrandDetails.get('brandDetails'));
  }

  sendOTP(registration: NgForm) {
    console.log('ngform', registration);

    if (registration.valid) {
      this.authService
        .userRagistration(this.userRegistrationData)
        .subscribe((res: any) => {
          localStorage.setItem(
            'userId',
            this.userRegistrationData.phone_number
          );
          // if registration  is success the navigate to OTP section
          let payload = {
            from: 'registration',
          };
          var extra: NavigationExtras = {
            queryParams: {
              data: JSON.stringify(payload),
            },
          };

          this.router.navigate(['auth/verify-otp'], extra);
        });
    } else {
      console.log('not valid');
    }
  }

  // if user is exist
  BackToLogin() {
    this.router.navigate(['auth/login']);
  }

  // allow only number to enter inout field
  keyValidation(event: any, type: string): any {
    if (type == 'number') {
      var key = event.which || event.keyCode;
      if (key < 48 || key > 57) {
        // Check if the key is not a number
        event.preventDefault();
        return false;
      }
    } else {
      const key = event.key;
      const isAlphabet = /[a-zA-Z]/.test(key);
      if (!isAlphabet) {
        event.preventDefault();
        return false;
      }
    }
  }
}
