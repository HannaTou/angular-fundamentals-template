import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { TogglePasswordDirective } from '@shared/directives/toggle-password.directive';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from '@app/auth/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from '../store/courses/courses.effects';
import { coursesFeatureKey, coursesReducer } from '../store/courses/courses.reducer';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  DurationPipe,
  CustomDatePipe,
  EmailValidatorDirective,
  TogglePasswordDirective,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  exports: [components],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
]
})

export class SharedModule { }
