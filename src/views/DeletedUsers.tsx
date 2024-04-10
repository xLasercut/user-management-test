import {Table} from 'nhsuk-react-components';
import {useGlobalStore} from '../store/store.ts';
import {useNavigate} from "react-router-dom";

function DeletedUsers() {
  const users = useGlobalStore(state => state.users);
  const navigate = useNavigate();

  return (
    <>
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
            .map(user => (
              <Table.Row>
                <Table.Cell>
                  {user.first_name} {user.last_name}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.account_disabled_time}</Table.Cell>
                <Table.Cell>{user.last_login_time}</Table.Cell>
                <Table.Cell>{user.creation_time}</Table.Cell>
                <Table.Cell>
                  <a href='' onClick={e => {
                    e.preventDefault()
                    navigate(`/user-management-test/edit-user/${user.email}`)
                  }}>Edit</a>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
}

export {DeletedUsers};
