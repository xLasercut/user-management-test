import {Table, Tag} from 'nhsuk-react-components';
import {getOrgName} from '../../../store/helpers.ts';
import {TUserRole} from '../../../models/user-management-api/common.ts';
import {editUserStore} from '../../../store/edit-user.ts';

interface TProp {
  role: TUserRole;
}

function RoleToDeleteRow({role}: TProp) {
  const removeRoleToDelete = editUserStore(state => state.removeRoleToDelete);

  return (
    <Table.Row
      style={{margin: 50}}
      key={`${role.role}_${role.organisation_code}_${role.collection}`}
    >
      <Table.Cell data-test-id='date-submitted'>{role.role}</Table.Cell>
      <Table.Cell data-test-id='organisation-code'>{role.organisation_code}</Table.Cell>
      <Table.Cell data-test-id='organisation'>{getOrgName(role.organisation_code)}</Table.Cell>
      <Table.Cell data-test-id='col-collection'>{role.collection}</Table.Cell>
      <Table.Cell>
        <Tag data-test-id='status'>To be deleted</Tag>
      </Table.Cell>
      <Table.Cell>
        <a
          href=''
          onClick={e => {
            e.preventDefault();
            removeRoleToDelete(role);
          }}
        >
          Cancel
        </a>
      </Table.Cell>
    </Table.Row>
  );
}

export {RoleToDeleteRow};
