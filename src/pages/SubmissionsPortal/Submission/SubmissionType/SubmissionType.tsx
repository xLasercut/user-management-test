import {FormRadio} from '../../../../components/form/FormRadio.tsx';
import {ROUTES} from '../../../../router/Routes.tsx';
import {BackLink} from '../../../../components/BackLink.tsx';
import {useLocation} from 'react-router-dom';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQueryParamHelper} from '../../../../common/query-param-helper.ts';
import {datasetConfigApi} from '../../../../store/dataset-config.ts';
import {Button} from 'nhsuk-react-components';

function SubmissionType() {
  const location = useLocation();
  const {setAndNavigateWithUrlParams, getParameter, setParameter} = useQueryParamHelper();
  const type = getParameter('type');
  const collection = getParameter('collection');
  const version = getParameter('version')
  const getSubmissionTypes = datasetConfigApi(state => state.getSubmissionTypes);

  const formSchema = z.object({
    type: z.string().trim().min(1),
  });
  type TFormSchema = z.infer<typeof formSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      type: type,
    },
  });

  const onSubmit = handleSubmit(data => {
    setParameter('type', data.type);
    setAndNavigateWithUrlParams(ROUTES.SUBMISSION_WINDOW);
  });

  return (
    <>
      <BackLink to={location.state?.from || `${ROUTES.SUBMISSIONS_HOME}${location.search}`}>Collection</BackLink>
      <form onSubmit={onSubmit}>
        <FormRadio<TFormSchema>
          control={control}
          formField={'type'}
          errors={errors}
          items={getSubmissionTypes(collection, version).map(item => ({
            text: item,
            value: item,
          }))}
          label={'Select your submission method'}
        />
        <Button type={'submit'}>Confirm</Button>
      </form>
    </>
  );
}

export {SubmissionType};
