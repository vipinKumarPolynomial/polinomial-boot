
import { Component, OnInit, ViewChild, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoreTokenService } from '../../@theme/services/storeToken.service';

import { AuthService } from 'src/app/@theme/services/auth.service';
import { StoreSubjectsService } from 'src/app/@theme/services/storeSubjects.service';
// import {WelcomeUserComponent} from '../welcome-user/welcome-user.component'
@Component({
  selector: 'app-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss'],
})
export class VerificationOtpComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  inputs: any;
  userId: string; // get user id from local storage
  displayTime: any; // display time if user wnats resend otp
  timerOn = true;
  timeInterval: any; // resend otp time interval
  brandDetails: any;
  resendOTPflag = false;
  welcomUserFlag = false;
  // otp  input hostlistener
  userPosition: any; // if user render login page then welcome page text not change but he is render registration then text se change
  @HostListener('mouseenter', ['$event'])
  OTPInput(event: any): any {
    this.inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].addEventListener('keydown', (event): any => {
        if (event.key === 'Backspace') {
          if (this.inputs[i].value) this.inputs[i].value = '';
          else {
            if (i !== 0) this.inputs[i - 1].focus();
          }
        } else {
          if (i === this.inputs.length - 1 && this.inputs[i].value !== '') {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            this.inputs[i].value = event.key;
            if (i !== this.inputs.length - 1) this.inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            this.inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== this.inputs.length - 1) this.inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private storeTokenService: StoreTokenService,
    private authService: AuthService,
    public storeSubjects: StoreSubjectsService
  ) {}

  ngOnInit(): void {
    this.userPosition = JSON.parse(
      this.activateRouter.snapshot.queryParamMap.get('data')
    );

    this.userId = JSON.parse(localStorage.getItem('userId'));

    // get brand details for render icons and title and thene
    this.brandDetails = JSON.parse(this.storeTokenService.get('brandDetails'));
  }

  ngAfterViewInit(): void {
    this.timer(90); //resend OTP timer
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }
  // verify otp for login

  verifyOTP() {
    var otp = '';

    for (let i of this.inputs) {
      otp += i.value;
    }

    if (otp.length == 6) {
      console.log('otp', otp);

      let payload = {
        phone_number: this.userId.toString(),
        otp,
      };

      this.authService.verifyOTP(payload).subscribe((res: any) => {
        if (res) {
          // this.storeTokenService.set('token', res.data[0].access_token);
          console.log(res);
          this.storeSubjects.setUserData(res.data[0]);
          var extra: NavigationExtras = {
            queryParams: {
              data: JSON.stringify(this.userPosition),
            },
          };
          this.router.navigate(['auth/welcome'], extra);
          this.welcomUserFlag = true;
        }
      });
    }
  }

  // resend otp
  timer(remaining) {
    var m: any = Math.floor(remaining / 60);
    var s: any = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0 && this.timerOn) {
      this.timeInterval = setTimeout(() => {
        this.timer(remaining);
      }, 1000);
      return;
    }

    if (!this.timerOn) {
      // Do validate stuff here
      return;
    }
    this.resendOTPflag = true;
  }

  resendOtp() {
    this.timerOn = true;
    this.resendOTPflag = false;
    setTimeout(() => {
      this.timer(90);
    }, 1000);
  }
}
