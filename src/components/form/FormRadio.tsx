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
  label,
  hint,
  items,
}: TProp<T>) {
  return (
    <Controller
      render={({field}) => {
        return (
          <Radios
            label={label}
            hint={hint}
            error={formErrorMessage<T>(formField, errors)}
            {...field}
          >
            {items.map(item => (
              <Radios.Radio
                checked={field.value === item.value}
                value={item.value}
                key={item.value}
              >
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
