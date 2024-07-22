import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})

export class RegistrationFormComponent {
  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[ \u0041-\u005A\u0061-\u007A0-9]+$')
    ]),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  // Use the names `name`, `email`, `password` for the form controls.

  onSubmit(): void{
    if (this.registrationForm.invalid){
      this.registrationForm.controls['name'].markAsTouched({onlySelf: true});
      this.registrationForm.controls['email'].markAsTouched({onlySelf: true});
      this.registrationForm.controls['password'].markAsTouched({onlySelf: true});
    }
  }

  loginBtn = "Login";
  toggleOffBtn : IconProp = ['fas', 'eye'];
  toggleOnBtn : IconProp = ['fas', 'eye-slash'];

}
