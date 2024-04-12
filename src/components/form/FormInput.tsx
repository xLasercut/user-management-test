import {Control, Controller, FieldErrors, UseFormRegister} from 'react-hook-form';
import {z} from 'zod';
import {Input} from 'nhsuk-react-components';
import {formErrorMessage} from './helpers.ts';

interface Prop<T extends z.AnyZodObject> {
  control: Control<z.infer<T>>;
  formField: Parameters<UseFormRegister<z.infer<T>>>['0'];
  errors: FieldErrors;
  label?: string;
  hint?: string;
}

function FormInput<T extends z.AnyZodObject>({formField, control, errors, label, hint}: Prop<T>) {
  return (
    <Controller
      name={formField}
      control={control}
      render={({field}) => {
        return (
          <Input
            {...field}
            error={formErrorMessage<T>(formField, errors)}
            label={label}
            hint={hint}
          ></Input>
        );
      }}
    ></Controller>
  );
}

export {FormInput};
