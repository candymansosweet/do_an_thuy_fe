import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Constants, ValidatorMess } from "projects/cm/src/app/shared/constants/constants";
// FormControl có phải 1 Object không
// @mess - thông báo lỗi
export function ObjectValidator(mess: string = ValidatorMess.INVALID_DATA): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = Constants.NULL_VALUES.includes(control.value) || typeof control.value === 'object';
    return isValid ? null : { notAnObject: true, mess: mess };
  };
}
// FormControl có phải 1 list Object không
// @mess - thông báo lỗi
export function ArrayObjectValidator(mess: string = ValidatorMess.INVALID_DATA): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = (!Array.isArray(control) && control !== null);
    return isValid ? null : { notAnArrayOrNull: true, mess: mess };
  };
}
