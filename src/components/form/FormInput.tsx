import {Control, Controller, FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import {Input} from 'nhsuk-react-components';
import {formErrorMessage} from './helpers.ts';

interface Prop<T extends FieldValues> {
  control: Control<T>;
  formField: Parameters<UseFormRegister<T>>['0'];
  errors: FieldErrors;
  label?: string;
  hint?: string;
  type?: string;
  id?: string;
}

function FormInput<T extends FieldValues>({formField, control, errors, ...rest}: Prop<T>) {
  return (
    <Controller
      name={formField}
      control={control}
      render={({field: {onChange, value, name}}) => {
        return (
          <Input
            name={name}
            value={value}
            onChange={onChange}
            error={formErrorMessage<T>(formField, errors)}
            {...rest}
          ></Input>
        );
      }}
    ></Controller>
  );
}

export {FormInput};
