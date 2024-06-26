import {Control, Controller, FieldValues, UseFormRegister} from 'react-hook-form';
import {Checkboxes, Radios} from 'nhsuk-react-components';

interface TFormRadioItem {
  value: string;
  text: string;
}

interface TProp<T extends FieldValues> {
  control: Control<T>;
  formField: Parameters<UseFormRegister<T>>['0'];
  label?: string;
  items: TFormRadioItem[];
}

function FormRoleSelectItem<T extends FieldValues>({control, formField, label, items}: TProp<T>) {
  return (
    <Controller
      render={({field: {onChange, value}}) => {
        return (
          <Checkboxes.Box
            onChange={(e: any) => {
              if (!e.target.checked) {
                onChange(undefined);
              }
            }}
            conditional={
              <Radios onChange={onChange}>
                {items.map(item => (
                  <Radios.Radio value={item.value} checked={value === item.value} key={item.value}>
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
