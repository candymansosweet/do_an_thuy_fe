import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidatorMess } from '../constants/constants';
import { getTimeToCompare } from '../utils/time-utils/get-time-to-compare';
// FormControl có ValidatorMess nhỏ hơn controlNameTimeEnd
// @controlNameTimeStart - ngày bắt đầu
// @controlNameTimeEnd - ngày kết thúc
// @allowEqual - cho phép bằng nhau
export function TimeLineValidator(controlNameTimeStart: string, controlNameTimeEnd: string, allowEqual: boolean = false): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startControl = formGroup.get(controlNameTimeStart);
    const endControl = formGroup.get(controlNameTimeEnd);
    if (startControl && endControl) {
      // Clear existing errors to reset the state
      if (startControl.errors && startControl.errors?.['validTime']) {
        startControl.setErrors(null);
      }
      if (endControl.errors && endControl.errors?.['validTime']) {
        endControl.setErrors(null);
      }
      if (startControl.value && endControl.value) {
        if(allowEqual){
          if (getTimeToCompare(new Date(startControl.value)) > getTimeToCompare(new Date(endControl.value))) {
            startControl.setErrors({ validTime: true, mess: ValidatorMess.INVALID_TIME_LINE });
            endControl.setErrors({ validTime: true, mess: ValidatorMess.INVALID_TIME_LINE });
          }
        }else{
          if (getTimeToCompare(new Date(startControl.value)) >= getTimeToCompare(new Date(endControl.value))) {
            startControl.setErrors({ validTime: true, mess: ValidatorMess.INVALID_TIME_LINE });
            endControl.setErrors({ validTime: true, mess: ValidatorMess.INVALID_TIME_LINE });
          }
        }
      }
    }
    return null;
  };
}
