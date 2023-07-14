// import { StoreSubjectService } from 'src/app/@theme/services/subject.service';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreTokenService } from 'src/app/@theme/services/storeToken.service';
import { Subscription } from 'rxjs';
import { StoreSubjectsService } from 'src/app/@theme/services/storeSubjects.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.scss'],
})
export class WelcomeUserComponent implements OnInit {
  userPosition: any; // if user render login page then welcome page text not change but he is render registration then text se change.
  brandDetails: any;
  subscription: Subscription;
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private storBrandDetails: StoreTokenService,
    public storeSubject: StoreSubjectsService
  ) {}

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  ngOnInit(): any {
    // get brand details for render icons and title and thene
    this.brandDetails = JSON.parse(this.storBrandDetails.get('brandDetails'));
    this.userPosition = JSON.parse(
      this.activateRouter.snapshot.queryParamMap.get('data')
    );

    //  get verify userdetails
    let veridyUserData: any;

    this.subscription = this.storeSubject.userData.subscribe({
      next: (v) => (veridyUserData = v),
    });

    setTimeout(() => {
      let queryParams = {
        botType: veridyUserData.params.botType,
        attachment: veridyUserData.params.attachment,
        sosButton: veridyUserData.params.sosButton,
        colorHex: veridyUserData.params.colorHex,
        contactUs: veridyUserData.params.contactUs,
        authToken: veridyUserData.params.authToken,
      };
      this.router.navigate(['dashboard'], { queryParams });
    }, 3000);
  }
}
