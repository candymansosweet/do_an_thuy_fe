import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Constants } from 'projects/cm/src/app/shared/constants/constants';
// FormControl chỉ chứa giá trị trắng
// @minValue - giá trị nhỏ nhất control có thể nhận
export function CodeProjectValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pattern = /^[0-9A-Z]+$/;
    let value = control.value?.replace(Constants.REGEX_REMOVE_HTML,'');
    const isValid = Constants.NULL_VALUES.includes(value) || pattern.test(value); //nếu chưa được nhập hoặc không chứa toàn space thì hợp lệ
    return isValid ? null : { isNotCodeFormat : true, mess: "Chỉ được nhập 0-9 A-Z" };
  };
}
