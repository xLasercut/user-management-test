import {userManagementApi} from '../../../store/user-management-api.ts';
import {useQueryParamHelper} from '../../../common/query-param-helper.ts';
import {z} from 'zod';
import {User} from '../../../types.ts';
import {useLocation, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {Button, Table, Tag} from 'nhsuk-react-components';
import {ROUTES} from '../../../router/Routes.tsx';
import {getOrgName} from '../../../store/helpers.ts';
import {editUserStore} from '../../../store/edit-user.ts';

interface TUserRowsProp {
  user: User;
}

function UserRows({user}: TUserRowsProp) {
  const location = useLocation();
  const navigate = useNavigate();
  const clear = editUserStore(state => state.clear);

  function onClickEdit(e: React.MouseEvent) {
    e.preventDefault();
    clear();
    navigate(ROUTES.EDIT_USER(user.email), {
      state: {from: `${location.pathname}${location.search}`},
    });
  }

  return (
    <>
      {user.roles.map(role => (
        <Table.Row
          style={{margin: 50}}
          key={`${user.email}_${role.role}_${role.organisation_code}_${role.collection}`}
        >
          <Table.Cell>
            {user.first_name} {user.last_name}
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{role.organisation_code}</Table.Cell>
          <Table.Cell>{getOrgName(role.organisation_code)}</Table.Cell>
          <Table.Cell>{role.collection}</Table.Cell>
          <Table.Cell>{role.role}</Table.Cell>
          <Table.Cell>{user.last_login_time}</Table.Cell>
          <Table.Cell>
            <Tag>Active</Tag>
          </Table.Cell>
          <Table.Cell>
            <a href='' onClick={onClickEdit}>
              Edit
            </a>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
}

function UserPermissions() {
  const getUser = userManagementApi(state => state.getUser);
  const {updateUrlParameter, getParameter, setParameter} = useQueryParamHelper();
  const email = getParameter('email');
  const odsCode = getParameter('odsCode');

  const filterModel = z.object({
    email: z.string().trim().toLowerCase(),
    odsCode: z.string().trim().toUpperCase(),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof filterModel>>({
    resolver: zodResolver(filterModel),
    values: {
      email: email,
      odsCode: odsCode,
    },
  });

  const onSubmitForm = handleSubmit(data => {
    setParameter('email', data.email);
    setParameter('odsCode', data.odsCode);
    // Update the url
    updateUrlParameter();
  });

  function usersToDisplay(): User[] {
    if (!email && !odsCode) {
      return [];
    }

    return getUser({
      email: email,
      organisation_code: odsCode,
      account_enabled: 'true',
    });
  }

  return (
    <>
      <h1>User Permissions</h1>
      <div className='nhsuk-grid-row'>
        <form onSubmit={onSubmitForm}>
          <div className='nhsuk-grid-column-one-quarter'>
            <FormInput<typeof filterModel>
              control={control}
              formField='email'
              label='Email'
              errors={errors}
            />
          </div>
          <div className='nhsuk-grid-column-one-quarter'>
            <FormInput<typeof filterModel>
              control={control}
              formField='odsCode'
              label='ODS Code'
              errors={errors}
            />
          </div>
          <Button
            type='submit'
            className='nhsuk-u-margin-3 nhsuk-u-padding-2 nhsuk-u-padding-right-3 nhsuk-u-padding-left-3'
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
            <Table.Cell>ODS Code</Table.Cell>
            <Table.Cell>Organisation</Table.Cell>
            <Table.Cell>Collection</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Last Login</Table.Cell>
            <Table.Cell>User Status</Table.Cell>
            <Table.Cell>Action</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {usersToDisplay().map(user => (
            <UserRows key={user.email} user={user} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export {UserPermissions};
