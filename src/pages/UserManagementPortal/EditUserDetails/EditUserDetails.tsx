import {Button} from 'nhsuk-react-components';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';
import {userManagementApi} from '../../../store/user-management-api.ts';
import {editUserStore} from '../../../store/edit-user.ts';
import {BackLink} from '../../../components/BackLink.tsx';
import {z} from 'zod';
import {BooleanString} from '../../../models/user-management-api/common.ts';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {FormRadio} from '../../../components/form/FormRadio.tsx';

function EditUserDetails() {
  const {email} = useParams();

  if (!email) {
    return <Navigate to={ROUTES.ERROR} />;
  }

  const RADIO_ITEMS = [
    {value: 'true', text: 'True'},
    {value: 'false', text: 'False'},
  ];

  const location = useLocation();
  const getUser = userManagementApi(state => state.getUser);
  const currentUserDetails = getUser({email: email})[0];
  const userDetailsToUpdate = editUserStore(state => state.detailsToUpdate);
  const setDetailsToUpdate = editUserStore(state => state.setDetailsToUpdate);
  const navigate = useNavigate();

  const formSchema = z.object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    do_not_delete: BooleanString,
  });
  type TFormSchema = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      first_name: userDetailsToUpdate.first_name || currentUserDetails.first_name || '',
      last_name: userDetailsToUpdate.last_name || currentUserDetails.last_name || '',
      do_not_delete: userDetailsToUpdate.do_not_delete || `${currentUserDetails.do_not_delete}`,
    },
  });

  const onSubmitForm = handleSubmit(data => {
    setDetailsToUpdate('first_name', data.first_name);
    setDetailsToUpdate('last_name', data.last_name);
    setDetailsToUpdate('do_not_delete', data.do_not_delete);
    navigate(ROUTES.EDIT_USER(email));
  });

  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <BackLink to={location.state?.from || ROUTES.EDIT_USER(email)}>Cancel</BackLink>
        <form onSubmit={onSubmitForm}>
          <FormInput<TFormSchema>
            control={control}
            formField={'first_name'}
            errors={errors}
            label={'First Name'}
          />
          <FormInput<TFormSchema>
            control={control}
            formField={'last_name'}
            errors={errors}
            label={'Last Name'}
          />
          <FormRadio<TFormSchema>
            control={control}
            formField={'do_not_delete'}
            errors={errors}
            items={RADIO_ITEMS}
            label={'Do Not Delete'}
          ></FormRadio>
          <Button type={'submit'}>Confirm</Button>
        </form>
      </div>
    </>
  );
}

export {EditUserDetails};
