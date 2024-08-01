import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LoginFormComponent,
  RegistrationFormComponent
} from "../";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TogglePasswordDirective } from '@shared/directives/toggle-password.directive';

const components = [
  LoginFormComponent,
  RegistrationFormComponent,
  EmailValidatorDirective,
  TogglePasswordDirective,
];

@NgModule({
  declarations: [components],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [components]
})
export class LoginModule { }
