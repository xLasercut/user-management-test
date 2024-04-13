import {Control, Controller, FieldErrors, UseFormRegister} from 'react-hook-form';
import {z} from 'zod';
import {Radios} from 'nhsuk-react-components';
import {formErrorMessage} from './helpers.ts';

interface TFormRadioItem {
  value: string;
  text: string;
}

interface TProp<T extends z.AnyZodObject> {
  control: Control<z.infer<T>>;
  formField: Parameters<UseFormRegister<z.infer<T>>>['0'];
  errors: FieldErrors;
  label?: string;
  hint?: string;
  items: TFormRadioItem[];
}

function FormRadio<T extends z.AnyZodObject>({
  control,
  formField,
  errors,
  items,
  ...rest
}: TProp<T>) {
  return (
    <Controller
      render={({field: {onChange, value}}) => {
        return (
          <Radios {...rest} error={formErrorMessage<T>(formField, errors)} onChange={onChange}>
            {items.map(item => (
              <Radios.Radio checked={value === item.value} value={item.value} key={item.value}>
                {item.text}
              </Radios.Radio>
            ))}
          </Radios>
        );
      }}
      name={formField}
      control={control}
    />
  );
}

export {FormRadio};
