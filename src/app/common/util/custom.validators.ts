import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static match(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const matchControl = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (matchControl) {
          matchControl.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent && !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo]?.value ? null : { matching: true };
    };
  }
}