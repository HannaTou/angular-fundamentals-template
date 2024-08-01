import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CoursesComponent } from '@features/courses/courses.component';
import { CourseInfoModule } from '@features/course-info/course-info.module';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';

@NgModule({
  declarations: [CoursesComponent,],
  imports: [
    CommonModule,
    CourseInfoModule,
    SharedModule,
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CoursesModule {}

export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  }
  