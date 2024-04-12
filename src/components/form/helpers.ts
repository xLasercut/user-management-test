import {FieldErrors, UseFormRegister} from 'react-hook-form';
import {z} from 'zod';

function formErrorMessage<T extends z.AnyZodObject>(
  formField: Parameters<UseFormRegister<z.infer<T>>>['0'],
  errors: FieldErrors
): string {
  const error = errors[formField];

  if (error) {
    return `${error.message}`;
  }
  return '';
}

export {formErrorMessage};
