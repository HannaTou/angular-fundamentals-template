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
        const emailRegex = /^[\u0041-\u005A\u0061-\u007A0-9._%+-]+@[\u0041-\u005A\u0061-\u007A0-9.-]+\.[\u0041-\u005A\u0061-\u007A]{2,4}$/;
        const isValid = emailRegex.test(value);
        return isValid ? null : { 'email': true };
      }
}
