import { Routes, RouterModule } from '@angular/router';
import { CourseCardComponent, CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './features/courses/courses.component';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

export const routes: Routes = [
    /* Add your code here */
    { path: 'registration', component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'login', component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'courses', component: CoursesComponent,
        children: [
            { path: ':id', component: CourseCardComponent, canActivate: [AuthorizedGuard],
                children: [
                    { path: 'edit', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] }
                ] },
            { path: 'add', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
        ],
        canActivate: [AuthorizedGuard] },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })

  export class AppRoutingModule { }

