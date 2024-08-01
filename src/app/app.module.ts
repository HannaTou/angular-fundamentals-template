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
//import { UserStoreService } from './user/services/user-store.service';
import { CoursesService } from '@app/services/courses.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//export const WINDOW = new InjectionToken<Window>('WindowToken');

//export function windowFactory(): Window {
//  return window;
//}

// function initializeApp(userStoreService: UserStoreService) {
//   return (): Promise<any> => {
//     return userStoreService.getUser().toPromise();
//   }
// }

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
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    { provide: Window, useValue: window },
//    { provide: WINDOW, useFactory: () => window },
//    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [UserStoreService], multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}
