import {Button} from 'nhsuk-react-components';
import {useLocation, useNavigate} from 'react-router-dom';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {BackLink} from '../../../components/BackLink.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {userManagementApi} from '../../../store/user-management-api.ts';
import {editUserStore} from '../../../store/edit-user.ts';

function EmailCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const clear = editUserStore(state => state.clear);
  const getUser = userManagementApi(state => state.getUser);

  const formSchema = z.object({
    email: z.string().trim().min(1).toLowerCase(),
  });
  type TFormSchema = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    values: {email: ''},
  });

  const onSubmit = handleSubmit(data => {
    const users = getUser({email: data.email});
    clear();
    if (users.length > 0) {
      navigate(ROUTES.EDIT_USER(users[0].email), {state: {from: location.pathname}});
      return;
    }
    navigate(ROUTES.ADD_USER(data.email), {state: {from: location.pathname}});
  });

  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <BackLink to={ROUTES.HOME}>Cancel</BackLink>
        <form onSubmit={onSubmit}>
          <FormInput<TFormSchema>
            control={control}
            formField='email'
            errors={errors}
            label='Email'
            hint='Enter the email of the user. If user already exists, the page will be redirected to edit user page.'
          ></FormInput>
          <Button type='submit'>Confirm</Button>
        </form>
      </div>
    </>
  );
}

export {EmailCheck};
