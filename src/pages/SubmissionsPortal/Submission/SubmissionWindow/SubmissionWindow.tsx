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
import {TSubmissionType} from '../../../../models/collection-config-api/common.ts';

function SubmissionWindow() {
  const location = useLocation();
  const {setAndNavigateWithUrlParams, getParameter, setParameter} = useQueryParamHelper();
  const type = getParameter('type') as TSubmissionType;
  const collection = getParameter('collection');
  const version = getParameter('version');
  const window = getParameter('window');
  const getSubmissionWindows = datasetConfigApi(state => state.getSubmissionWindows);

  const formSchema = z.object({
    window: z.string().trim().min(1),
  });
  type TFormSchema = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      window: window,
    },
  });

  const onSubmit = handleSubmit(data => {
    setParameter('window', data.window);
    setAndNavigateWithUrlParams(ROUTES.SUBMIT_DATA_ROUTE(type));
  });

  return (
    <>
      <BackLink to={location.state?.from || `${ROUTES.SUBMISSION_TYPE}${location.search}`}>
        Submission Type
      </BackLink>
      <form onSubmit={onSubmit}>
        <FormRadio<TFormSchema>
          control={control}
          formField={'window'}
          errors={errors}
          items={getSubmissionWindows(collection, version, type).map(item => ({
            text: item.name,
            value: item.name,
          }))}
          label={'Select your submission window'}
        />
        <Button type={'submit'}>Confirm</Button>
      </form>
    </>
  );
}

export {SubmissionWindow};
