import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Button, Table} from 'nhsuk-react-components';
import {BackLink} from '../../../components/BackLink.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {AddRoleButton} from '../shared/AddRoleButton.tsx';
import {editUserStore} from '../../../store/edit-user.ts';
import {RoleToAddRow} from '../EditUser/RoleToAddRow.tsx';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {BooleanString} from '../../../models/user-management-api/common.ts';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {FormRadio} from '../../../components/form/FormRadio.tsx';
import {userManagementApi} from '../../../store/user-management-api.ts';

function AddUser() {
  const {email} = useParams();

  if (!email) {
    return <Navigate to={ROUTES.ERROR}></Navigate>;
  }

  const userToCreate = editUserStore(state => state.userToCreate);
  const rolesToAdd = editUserStore(state => state.rolesToAdd);
  const setUserToCreate = editUserStore(state => state.setUserToCreate);
  const createUser = userManagementApi(state => state.createUser);
  const addRoles = userManagementApi(state => state.addRoles);
  const clear = editUserStore(state => state.clear);
  const navigate = useNavigate();
  const location = useLocation();

  const formSchema = z.object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    account_enabled: BooleanString,
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      first_name: userToCreate.first_name || '',
      last_name: userToCreate.last_name || '',
      account_enabled: userToCreate.account_enabled || 'true',
    },
  });

  watch(data => {
    for (const key in data) {
      //@ts-ignore
      setUserToCreate(key, data[key]);
    }
  });

  const onSubmit = handleSubmit(() => {
    createUser({
      ...userToCreate,
      email: email,
    });
    addRoles({
      email: email,
      roles: rolesToAdd,
    });

    clear();
    navigate(`${ROUTES.USER_PERMISSIONS}?email=${email}`);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='nhsuk-u-width-two-thirds'>
        <BackLink to={location.state?.from || ROUTES.EMAIL_CHECK}>Cancel</BackLink>
        <h1>Add User</h1>
        <h4>Email</h4>
        <p>{email}</p>

        <FormInput<typeof formSchema>
          control={control}
          formField={'first_name'}
          errors={errors}
          label='First Name'
        ></FormInput>
        <FormInput<typeof formSchema>
          control={control}
          formField={'last_name'}
          errors={errors}
          label='Last Name'
        ></FormInput>
        <FormRadio<typeof formSchema>
          control={control}
          formField={'account_enabled'}
          errors={errors}
          label='Account Enabled'
          items={[
            {text: 'True', value: 'true'},
            {text: 'False', value: 'false'},
          ]}
        ></FormRadio>
      </div>
      <div className='nhsuk-u-width-full'>
        <h1 className='nhsuk-heading-l' data-test-id='heading-one'>
          Organisation and permissions
        </h1>
        <Table responsive>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Role</Table.Cell>
              <Table.Cell>Organisation Code</Table.Cell>
              <Table.Cell>Organisation Name</Table.Cell>
              <Table.Cell>Collection</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Action</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rolesToAdd.map(role => (
              <RoleToAddRow role={role} />
            ))}
            <AddRoleButton accountEnabled={true}></AddRoleButton>
          </Table.Body>
        </Table>
        <Button type={'submit'}>Confirm</Button>
      </div>
    </form>
  );
}

export {AddUser};
