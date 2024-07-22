import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})

export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  email! : FormControl;
  password! : FormControl;

  loginBtn = "Login";
  toggleOffBtn : IconProp = ['fas', 'eye'];
  toggleOnBtn : IconProp = ['fas', 'eye-slash'];
  

  onSubmit(form: NgForm){
    if (this.loginForm.invalid){
      this.loginForm.controls['email'].markAsTouched({onlySelf: true});
      this.loginForm.controls['password'].markAsTouched({onlySelf: true});
    }
  }
}
