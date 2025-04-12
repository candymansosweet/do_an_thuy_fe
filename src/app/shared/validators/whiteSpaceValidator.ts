import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidatorMess } from '../constants/constants';
import { Constants } from 'projects/cm/src/app/shared/constants/constants';
// FormControl chỉ chứa giá trị trắng
// @minValue - giá trị nhỏ nhất control có thể nhận
export function WhiteSpaceValidator(isHtml: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pattern = /\S/;
    let value = control.value;
    if(isHtml) value = value?.replace(Constants.REGEX_REMOVE_HTML,'');
    const isValid = Constants.NULL_VALUES.includes(value) || pattern.test(value); //nếu chưa được nhập hoặc không chứa toàn space thì hợp lệ
    return isValid ? null : { isWhiteSpace : true, mess: ValidatorMess.INVALID_ONLY_WHITE_SPACE };
  };
}
