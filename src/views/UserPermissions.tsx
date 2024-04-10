import {Table, Tag} from 'nhsuk-react-components';
import {useGlobalStore} from '../store/store.ts';
import {User} from '../types.ts';
import {getOrgName} from '../store/helpers.ts';
import {useNavigate} from 'react-router-dom';

function UserRows({user}: {user: User}) {
  const navigate = useNavigate();
  const clear = useGlobalStore(state => state.clear);

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

  return (
    <>
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
          {allUsers.map(user => (
            <UserRows user={user} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export {UserPermissions};
