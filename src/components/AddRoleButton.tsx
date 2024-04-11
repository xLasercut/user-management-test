import {useLocation, useNavigate} from 'react-router-dom';
import {Table} from 'nhsuk-react-components';

function AddRoleButton({email, accountEnabled}: {email: string; accountEnabled: boolean}) {
  const navigate = useNavigate();
  const location = useLocation();

  function addRole() {
    navigate(`/user-management-test/add-roles/${email}`, {
      state: {previousLocationPathname: location.pathname},
    });
  }

  if (!accountEnabled) {
    return null;
  }
  return (
    <>
      <Table.Row style={{margin: 50}}>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>
          <a
            href=''
            onClick={e => {
              e.preventDefault();
              addRole();
            }}
          >
            Add Role
          </a>
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export {AddRoleButton};
