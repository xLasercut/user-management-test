import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';

function formErrorMessage<T extends FieldValues>(
  formField: Parameters<UseFormRegister<T>>['0'],
  errors: FieldErrors
): string {
  const error = errors[formField];

  if (error) {
    return `${error.message}`;
  }
  return '';
}

export {formErrorMessage};
