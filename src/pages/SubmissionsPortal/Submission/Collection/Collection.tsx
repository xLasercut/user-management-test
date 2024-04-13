import {FormRadio} from '../../../../components/form/FormRadio.tsx';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQueryParamHelper} from '../../../../common/query-param-helper.ts';
import {datasetConfigApi} from '../../../../store/dataset-config.ts';
import {Button} from 'nhsuk-react-components';
import {BackLink} from '../../../../components/BackLink.tsx';
import {ROUTES} from '../../../../router/Routes.tsx';
import {useLocation} from 'react-router-dom';

function Collection() {
  const {setAndNavigateWithUrlParams, getParameter, setParameter} = useQueryParamHelper();
  const collection = getParameter('collection');
  const version = getParameter('version');
  const getCollections = datasetConfigApi(state => state.getCollections);
  const location = useLocation();

  const formSchema = z.object({
    collection: z.string().trim().min(1).toUpperCase(),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      collection: `${collection}_${version}`,
    },
  });

  const onSubmit = handleSubmit(data => {
    const [name, version] = data.collection.split('_');
    setParameter('collection', name);
    setParameter('version', version);
    setAndNavigateWithUrlParams(ROUTES.SUBMISSION_TYPE);
  });

  return (
    <>
      <BackLink to={location.state?.from || `${ROUTES.SUBMISSIONS_PORTAL_HOME}`}>Home</BackLink>
      <form onSubmit={onSubmit}>
        <FormRadio<typeof formSchema>
          control={control}
          formField={'collection'}
          errors={errors}
          items={getCollections().map(item => ({
            text: `${item.name} version ${item.version}`,
            value: `${item.name}_${item.version}`,
          }))}
          label={'Select a collection'}
        />
        <Button type={'submit'}>Confirm</Button>
      </form>
    </>
  );
}

export {Collection};
