import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Constants } from 'projects/cm/src/app/shared/constants/constants';
// kiểm tra FormControl dạng html có length ( ko tính thẻ html )
// @maxLength - giá trị nhỏ nhất control có thể nhận
export function MaxLengthTextValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value === null ? null : control.value.replace(Constants.REGEX_REMOVE_HTML, '');
    const isValid = Constants.NULL_VALUES.includes(control.value) || value.length <= maxLength;
    return isValid ? null : { maxLength: true, mess: "Giá trị vượt quá " + maxLength + " ký tự"};
  };
}
