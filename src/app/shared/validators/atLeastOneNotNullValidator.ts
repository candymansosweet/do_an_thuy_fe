import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
// @mảng tên các control cần kiểm tra
// & unvalid nếu tất cả đều null, invalid nếu có >= 1 giá trị khác null
// Custom validator to check that at least one control in the array is not null
export function atLeastOneNotNullValidator(controlNames: string[]): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    // Check if any control in the array has a non-null value
    const hasAtLeastOneNotNull = controlNames.some(controlName => {
      const control = formGroup.get(controlName);
      return control && control.value !== null; // Return true if a control has a non-null value
    });
    // Otherwise, return an error indicating that at least one field is required
    return hasAtLeastOneNotNull ? null : { atLeastOneRequired: { message: 'Có ít nhất một gí trị không hợp lệ' } };
  };
}
