import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthRoutingComponent } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { VerificationOtpComponent } from './verification-otp/verification-otp.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MatIconModule } from '@angular/material/icon';
import { StoreSubjectsService } from '../@theme/services/storeSubjects.service';

@NgModule({
  declarations: [
    UserLoginComponent,
    AuthComponent,
    VerificationOtpComponent,
    WelcomeUserComponent,
    UserRegistrationComponent,
  ],
  imports: [CommonModule, FormsModule, AuthRoutingComponent, MatIconModule],
  providers:[StoreSubjectsService]
})
export class AuthModule {}
