import {Button, Table} from 'nhsuk-react-components';
import {useNavigate} from 'react-router-dom';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useQueryParamHelper} from '../../../common/query-param-helper.ts';
import {userManagementApi} from '../../../store/user-management-api.ts';
import {ROUTES} from '../../../router/Routes.tsx';
import {editUserStore} from '../../../store/edit-user.ts';

function DeletedUsers() {
  const users = userManagementApi(state => state.users);
  const clear = editUserStore(state => state.clear);
  const navigate = useNavigate();
  const {updateUrlParameter, getParameter, setParameter} = useQueryParamHelper();
  const email = getParameter('email');

  const filterSchema = z.object({
    email: z.string().toLowerCase(),
  });
  type TFilterSchema = z.infer<typeof filterSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TFilterSchema>({
    resolver: zodResolver(filterSchema),
    values: {email: email},
  });

  const onSubmit = handleSubmit(data => {
    setParameter('email', data.email);
    updateUrlParameter();
  });

  return (
    <>
      <h1 data-test-id='main-heading'>Deleted Users</h1>
      <div className='nhsuk-grid-row'>
        <form onSubmit={onSubmit}>
          <div className='nhsuk-grid-column-one-quarter'>
            <FormInput<TFilterSchema>
              formField='email'
              control={control}
              errors={errors}
              label='Email'
            />
          </div>
          <Button
            type='submit'
            className='nhsuk-u-margin-4 nhsuk-u-padding-2 nhsuk-u-padding-right-3 nhsuk-u-padding-left-3'
          >
            Apply
          </Button>
        </form>
      </div>

      <Table responsive>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Deleted On</Table.Cell>
            <Table.Cell>Last Login</Table.Cell>
            <Table.Cell>Created On</Table.Cell>
            <Table.Cell>Action</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users
            .filter(user => !user.account_enabled)
            .filter(user => {
              if (!email) {
                return true;
              }

              return user.email === email;
            })
            .map(user => (
              <Table.Row key={user.email}>
                <Table.Cell>
                  {user.first_name} {user.last_name}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.account_disabled_time}</Table.Cell>
                <Table.Cell>{user.last_login_time}</Table.Cell>
                <Table.Cell>{user.creation_time}</Table.Cell>
                <Table.Cell>
                  <a
                    href=''
                    onClick={e => {
                      e.preventDefault();
                      clear();
                      navigate(ROUTES.EDIT_USER(user.email));
                    }}
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export {DeletedUsers};
