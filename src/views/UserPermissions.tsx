import {Button, Table, Tag} from 'nhsuk-react-components';
import {useGlobalStore} from '../store/store.ts';
import {User} from '../types.ts';
import {getOrgName} from '../store/helpers.ts';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useQueryParamHelper} from '../common/query-param-helper.ts';
import {FormInput} from '../components/FormInput.tsx';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

function UserRows({user, email, odsCode}: {user: User; email: string; odsCode: string}) {
  const navigate = useNavigate();
  const clear = useGlobalStore(state => state.clear);

  return (
    <>
      {user.roles
        .filter(role => {
          if (!email && !odsCode) {
            return true;
          }

          if (email && odsCode) {
            return user.email === email && role.organisation_code === odsCode;
          }

          if (odsCode) {
            return role.organisation_code === odsCode;
          }

          return user.email === email;
        })
        .map(role => (
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
              <a
                href=''
                onClick={e => {
                  e.preventDefault();
                  clear();
                  navigate(`/user-management-test/edit-user/${user.email}`);
                }}
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
    </>
  );
}

function UserPermissions() {
  const allUsers = useGlobalStore(state => state.users);
  const {updateUrlParameter, getParameter, setParameter} = useQueryParamHelper();
  const email = getParameter('email');
  const odsCode = getParameter('odsCode');

  const filterModel = z.object({
    email: z.string(),
    odsCode: z.string(),
  });

  const formHandler = useForm<z.infer<typeof filterModel>>({
    resolver: zodResolver(filterModel),
    values: {
      email: email,
      odsCode: odsCode,
    },
  });

  const onSubmitForm = formHandler.handleSubmit(data => {
    setParameter('email', data.email);
    setParameter('odsCode', data.odsCode);
    // Update the url
    updateUrlParameter();
  });

  return (
    <>
      <h1>User Permissions</h1>
      <div className='nhsuk-grid-row'>
        <form onSubmit={onSubmitForm}>
          <div className='nhsuk-grid-column-one-quarter'>
            <FormInput<typeof filterModel>
              formHandler={formHandler}
              formField={'email'}
              label='Email'
            />
          </div>
          <div className='nhsuk-grid-column-one-quarter'>
            <FormInput<typeof filterModel>
              formHandler={formHandler}
              formField={'odsCode'}
              label='ODS Code'
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
          {allUsers
            .filter(user => user.account_enabled)
            .map(user => (
              <UserRows email={email} odsCode={odsCode} key={user.email} user={user} />
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export {UserPermissions};
