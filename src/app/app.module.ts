import { NgModule, InjectionToken, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoModule } from '@features/course-info/course-info.module';
import { CoursesListModule } from '@features/courses/courses-list/courses-list.module';
import { CoursesModule } from '@features/courses/courses.module';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store/index';
import { CoursesEffects } from './store/courses/courses.effects';
import { coursesReducer } from './store/courses/courses.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    CourseInfoModule,
    CoursesModule,
    CoursesListModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({ courses: coursesReducer }), // Ensure reducers are properly set
    EffectsModule.forRoot([CoursesEffects]),
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
    CoursesStoreService,
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}
