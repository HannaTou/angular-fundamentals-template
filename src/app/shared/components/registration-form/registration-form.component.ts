import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '@app/auth/services/auth.service';

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

  constructor (private authService: AuthService) {};

  onSubmit(): void{
    if (this.registrationForm.invalid){
      this.registrationForm.controls['name'].markAsTouched({onlySelf: true});
      this.registrationForm.controls['email'].markAsTouched({onlySelf: true});
      this.registrationForm.controls['password'].markAsTouched({onlySelf: true});
    } else {
      this.authService.register(
        this.registrationForm.controls['name'].value as string,
        this.registrationForm.controls['email'].value as string,
        this.registrationForm.controls['password'].value as string
      ).subscribe({
        next: () => console.log("Registration successful"),
        error: (error) => console.error("Registration failed", error),
      })}};

  loginBtn = "Login";
  toggleOffBtn : IconProp = ['fas', 'eye'];
  toggleOnBtn : IconProp = ['fas', 'eye-slash'];

}
