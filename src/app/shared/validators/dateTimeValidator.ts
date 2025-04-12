import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let isValidDate = null;
    if(control.dirty){
      // Kiểm tra nếu giá trị là một ngày hợp lệ
      isValidDate = !isNaN(Date.parse(value));
    }
    return isValidDate ? null : { invalidDate: { value: control.value, message: 'Giá trị bạn vừa nhập không hợp lệ' } };
  };
}
