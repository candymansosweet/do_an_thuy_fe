import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Constants } from 'projects/cm/src/app/shared/constants/constants';
// kiểm tra FormControl chứa giá trị >= minValue không
// @minValue - giá trị nhỏ nhất control có thể nhận
export function MinNumberValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = Constants.NULL_VALUES.includes(control.value) || control.value >= minValue;
    return isValid ? null : { minOne: true, mess: "Không thể nhập giá trị nhỏ hơn " + minValue };
  };
}
