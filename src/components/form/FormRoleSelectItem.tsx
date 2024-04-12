import {z} from 'zod';
import {Control, Controller, UseFormRegister} from 'react-hook-form';
import {Checkboxes, Radios} from 'nhsuk-react-components';

interface TFormRadioItem {
  value: string;
  text: string;
}

interface TProp<T extends z.AnyZodObject> {
  control: Control<z.infer<T>>;
  formField: Parameters<UseFormRegister<z.infer<T>>>['0'];
  label?: string;
  items: TFormRadioItem[];
}

function FormRoleSelectItem<T extends z.AnyZodObject>({
  control,
  formField,
  label,
  items,
}: TProp<T>) {
  return (
    <Controller
      render={({field}) => {
        return (
          <Checkboxes.Box
            onChange={(e: any) => {
              if (!e.target.checked) {
                field.onChange(undefined);
              }
            }}
            conditional={
              <Radios {...field}>
                {items.map(item => (
                  <Radios.Radio
                    value={item.value}
                    checked={field.value === item.value}
                    key={item.value}
                  >
                    {item.text}
                  </Radios.Radio>
                ))}
              </Radios>
            }
          >
            {label}
          </Checkboxes.Box>
        );
      }}
      name={formField}
      control={control}
    ></Controller>
  );
}

export {FormRoleSelectItem};
