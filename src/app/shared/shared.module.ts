import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  CourseFormComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  CourseFormComponent,
  DurationPipe,
  CustomDatePipe,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
