import {TUserRole} from '../../../models/user-management-api/common.ts';
import {Table, Tag} from 'nhsuk-react-components';
import {getOrgName} from '../../../store/helpers.ts';
import {editUserStore} from '../../../store/edit-user.ts';

interface TProp {
  role: TUserRole;
}

function RoleToAddRow({role}: TProp) {
  const removeRoleToAdd = editUserStore(state => state.removeRoleToAdd);

  return (
    <Table.Row
      style={{margin: 50}}
      key={`${role.role}_${role.organisation_code}_${role.collection}`}
    >
      <Table.Cell>{role.role}</Table.Cell>
      <Table.Cell>{role.organisation_code}</Table.Cell>
      <Table.Cell>{getOrgName(role.organisation_code)}</Table.Cell>
      <Table.Cell>{role.collection}</Table.Cell>
      <Table.Cell>
        <Tag>To be added</Tag>
      </Table.Cell>
      <Table.Cell>
        <a
          href=''
          onClick={e => {
            e.preventDefault();
            removeRoleToAdd(role);
          }}
        >
          Cancel
        </a>
      </Table.Cell>
    </Table.Row>
  );
}

export {RoleToAddRow};
