import {UseFormRegister, UseFormReturn} from 'react-hook-form';
import {z} from 'zod';

function FormInput<TSchema extends z.AnyZodObject>({
  label,
  formField,
  formHandler,
  ...rest
}: {
  label?: string;
  formField: Parameters<UseFormRegister<z.infer<TSchema>>>['0'];
  formHandler: UseFormReturn<z.infer<TSchema>>;
}) {
  const errorMessage = formHandler.formState.errors[formField]?.message;

  return (
    <div className='nhsuk-form-group'>
      {label ? (
        <label className='nhsuk-label' htmlFor={formField}>
          {label}
        </label>
      ) : null}
      {errorMessage ? (
        <span className='nhsuk-error-message' id={`${formField}-error`}>
          <span className='nhsuk-u-visually-hidden'>Error:</span> {`${errorMessage}`}
        </span>
      ) : null}
      <input
        className='nhsuk-input'
        id={formField}
        type='text'
        {...formHandler.register(formField)}
        {...rest}
      />
    </div>
  );
}

export {FormInput};
