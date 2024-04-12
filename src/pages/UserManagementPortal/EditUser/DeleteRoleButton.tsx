import {TUserRole} from '../../../models/user-management-api/common.ts';
import {useNavigate} from 'react-router-dom';
import {Table} from 'nhsuk-react-components';
import {ROUTES} from '../../../router/Routes.tsx';

interface TProp {
  role: TUserRole;
  accountEnabled: boolean;
  email: string;
}

function DeleteRoleButton({email, accountEnabled, role}: TProp) {
  const navigate = useNavigate();

  if (!accountEnabled) {
    return <Table.Cell></Table.Cell>;
  }

  return (
    <Table.Cell>
      <a
        href=''
        onClick={e => {
          e.preventDefault();
          navigate(
            `${ROUTES.DELETE_ROLE_CONFIRM}?email=${email}&role=${role.role}&collection=${role.collection}&ods_code=${role.organisation_code}`
          );
        }}
      >
        Delete
      </a>
    </Table.Cell>
  );
}

export {DeleteRoleButton};
