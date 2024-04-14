import {Button} from 'nhsuk-react-components';
import {datasetConfigApi} from '../../../store/dataset-config.ts';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {GetCollectionResponseData} from '../../../models/collection-config-api/get-collection.ts';

function SubmissionConfig() {
  const setConfig = datasetConfigApi(state => state.setConfig);
  const storeConfig = datasetConfigApi(state => state.config);

  const formSchema = z.object({
    file: z.string().trim().min(1),
  });
  type TFormSchema = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async () => {
    const element = document.getElementById('file') as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = async e => {
      const text = (e.target?.result || '[]') as string;

      try {
        const config = GetCollectionResponseData.parse(JSON.parse(text));
        setConfig(config);
        alert('config set');
      } catch (e) {
        console.log(e);
        alert('config format error');
      }
    };
    //@ts-ignore
    reader.readAsText(element.files[0]);
  });

  return (
    <div className='nhsuk-u-width-two-thirds'>
      <form onSubmit={onSubmit}>
        <FormInput<TFormSchema>
          label={'Upload'}
          type={'file'}
          id={'file'}
          control={control}
          errors={errors}
          formField={'file'}
        ></FormInput>
        <Button type={'submit'}>Confirm</Button>
      </form>
      {JSON.stringify(storeConfig)}
    </div>
  );
}

export {SubmissionConfig};
