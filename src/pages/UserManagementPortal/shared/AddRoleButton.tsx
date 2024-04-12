import {useLocation, useNavigate} from 'react-router-dom';
import {Table} from 'nhsuk-react-components';
import {ROUTES} from '../../../router/Routes.tsx';

function AddRoleButton({accountEnabled}: {accountEnabled: boolean}) {
  const navigate = useNavigate();
  const location = useLocation();

  function addRole(e: React.MouseEvent) {
    e.preventDefault();
    navigate(ROUTES.ADD_ROLE, {
      state: {from: location.pathname},
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
          <a href='' onClick={addRole}>
            Add Role
          </a>
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export {AddRoleButton};
