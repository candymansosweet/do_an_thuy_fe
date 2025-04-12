import { FormGroup } from '@angular/forms';

export function CheckValidatorForm(form: FormGroup, hasValidCompose: boolean = false): boolean {
  // Nếu form không hợp lệ
  if (!form.valid) {
    // Lặp qua các controls trong form
    Object.values(form.controls).forEach(control => {
      // Nếu control không hợp lệ
      if (control.invalid) {
        // Đánh dấu control này là dirty
        control.markAsDirty();
        // Cập nhật trạng thái giá trị và tính hợp lệ của control
        if(!hasValidCompose){
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
    });
    // Trả về false nếu form không hợp lệ
    return false;
  }
  // Trả về true nếu form hợp lệ
  return true;
}
