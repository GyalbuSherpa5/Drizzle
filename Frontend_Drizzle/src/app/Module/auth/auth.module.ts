import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterLink} from "@angular/router";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {UserKycComponent} from "./user-kyc/user-kyc.component";
import {CalendarModule} from "primeng/calendar";
import {SelectButtonModule} from "primeng/selectbutton";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthComponent,
    UserAgreementComponent,
    PrivacyPolicyComponent,
    UserKycComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    RouterLink,
    CalendarModule,
    SelectButtonModule,
    DropdownModule
  ],
  exports:[
    AuthComponent
  ]
})
export class AuthModule { }
