import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/@theme/services/auth.service';
import { NgForm } from '@angular/forms';
import { StoreTokenService } from 'src/app/@theme/services/storeToken.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit,AfterViewInit {
  userData: any;
  showImageFlag = false
  brandDetails: any; // this details comes from the backend ;



  constructor(
    private router: Router,
    private authService: AuthService,
    private storData:StoreTokenService
  ) {}

   ngAfterViewInit(): void {


     // get brand details for render icons and title and thene
      this.brandDetails = JSON.parse(this.storData.get('brandDetails'));

    }
    ngOnInit(): void {
      console.log(window.location['hostname']);
      // store user and brand details in local storage
      this.authService.brandDetails().subscribe((res: any) => {

        this.storData.set('brandDetails', JSON.stringify( res.data[0]))
        this.storData.remove('token')
        this.storData.remove('userId');
        this.brandDetails = JSON.parse(this.storData.get('brandDetails'));

      })

      // true  show image flag
      this.showImageFlag = true;

  }

  // send OTP to verify

  onSubmit(myForm: NgForm) {
    // this.formSubmitted = true;
    if (myForm.valid) {
      let payload = {
        phone_number: this.userData,
      };
      this.authService.checkUserLogin(payload).subscribe(
        (data) => {
          if (data['status']) {
            localStorage.setItem('userId', this.userData);
            // navigate to OTP section
            let payload = {
              from: 'login',
            };
            var extra: NavigationExtras = {
              queryParams: {
                data: JSON.stringify(payload),
              },
            };

            this.router.navigate(['auth/verify-otp'], extra);
          }
        },
        (error) => {
          // error
        }
      );
    } else {
      console.log('number not valid');

    }
  }

  // allow only number to enter inout field
  onlyNumbers(event: any): any {
    var key = event.which || event.keyCode;
    if (key < 48 || key > 57) {
      // Check if the key is not a number
      event.preventDefault();
      return false;
    }
  }

  // navigate to registration
  registration() {
    this.router.navigate(['auth/registration']);
  }
}
