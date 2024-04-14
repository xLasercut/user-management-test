import {useQueryParamHelper} from '../../../../common/query-param-helper.ts';
import {useLocation} from 'react-router-dom';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ROUTES} from '../../../../router/Routes.tsx';
import {BackLink} from '../../../../components/BackLink.tsx';
import {FormRadio} from '../../../../components/form/FormRadio.tsx';
import {Button} from 'nhsuk-react-components';
import {userManagementApi} from '../../../../store/user-management-api.ts';
import {getOrgName} from '../../../../store/helpers.ts';

function Organisation() {
  const {setAndNavigateWithUrlParams, getParameter, setParameter} = useQueryParamHelper();
  const organisation = getParameter('organisation');
  const userDetails = userManagementApi(state => state.userDetails);
  const location = useLocation();

  const formSchema = z.object({
    organisation: z.string().trim().min(1).toUpperCase(),
  });
  type TFormSchema = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      organisation: organisation,
    },
  });

  const onSubmit = handleSubmit(data => {
    setParameter('organisation', data.organisation);
    setAndNavigateWithUrlParams(ROUTES.SUBMISSION_COLLECTION);
  });

  function getItems() {
    const orgs: Set<string> = new Set();

    for (const role of userDetails().roles) {
      if (role.organisation_code) {
        orgs.add(role.organisation_code);
      }
    }

    return Array.from(orgs).map(item => {
      return {
        text: `${getOrgName(item)} - ${item}`,
        value: item,
      };
    });
  }

  return (
    <>
      <BackLink to={location.state?.from || `${ROUTES.SUBMISSIONS_PORTAL_HOME}`}>Home</BackLink>
      <form onSubmit={onSubmit}>
        <FormRadio<TFormSchema>
          control={control}
          formField={'organisation'}
          errors={errors}
          items={getItems()}
          label={'Select an organisation'}
        />
        <Button type={'submit'}>Confirm</Button>
      </form>
    </>
  );
}

export {Organisation};
