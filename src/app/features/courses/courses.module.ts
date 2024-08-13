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
import { TokenInterceptor } from '@app/auth/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from '../../store/courses/courses.effects';
import { coursesFeatureKey, coursesReducer } from '../../store/courses/courses.reducer';

@NgModule({
  declarations: [CoursesComponent,],
  imports: [
    CommonModule,
    CourseInfoModule,
    SharedModule,
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService],
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

  