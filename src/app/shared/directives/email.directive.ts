import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
       }]
})

export class EmailValidatorDirective  implements Validator{
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const isValid = emailRegex.test(value);
        return isValid ? null : { 'email': true };
      }
}
