import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


export const routes: Routes = [
    /* Add your code here */
    { path: 'registration', component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'login', component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'courses', component: CoursesComponent, canActivate: [AuthorizedGuard] },
    { path: 'courses/add', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },        
    { path: 'courses/:id', component: CourseInfoComponent, canActivate: [AuthorizedGuard] },
    { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })

  export class AppRoutingModule { 
    constructor(private router: Router) {
        this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
            console.log('Navigation started:', event.url);
          } else if (event instanceof NavigationEnd) {
            console.log('Navigation ended:', event.url);
          } else if (event instanceof NavigationError) {
            console.log('Navigation error:', event.error);
          }
        });
      }
   }

