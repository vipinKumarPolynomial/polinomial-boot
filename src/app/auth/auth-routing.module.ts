import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { VerificationOtpComponent } from './verification-otp/verification-otp.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'verify-otp',
    component:VerificationOtpComponent
  },
  {
    path: 'welcome',
    component:WelcomeUserComponent
  },
  {
    path: 'registration',
    component:UserRegistrationComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingComponent {}
