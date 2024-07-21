import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    /* Add your code here */
    { path: 'login-form', component: LoginFormComponent },
    { path: 'registration-form', component: RegistrationFormComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
