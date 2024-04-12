import {TUserRole} from '../../../models/user-management-api/common.ts';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Button, Table, Tag} from 'nhsuk-react-components';
import {userManagementApi} from '../../../store/user-management-api.ts';
import {getOrgName, isRoleInList} from '../../../store/helpers.ts';
import {BackLink} from '../../../components/BackLink.tsx';
import {AddRoleButton} from '../shared/AddRoleButton.tsx';
import {User} from '../../../types.ts';
import {DeleteRestoreButton} from './DeleteRestoreButton.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {editUserStore} from '../../../store/edit-user.ts';
import {UserSummary} from './UserSummary.tsx';
import {RoleToAddRow} from './RoleToAddRow.tsx';
import {DeleteRoleButton} from './DeleteRoleButton.tsx';
import {RoleToDeleteRow} from './RoleToDeleteRow.tsx';

function UserName({userAccountDetails}: {userAccountDetails: User}) {
  if (!userAccountDetails.account_enabled) {
    return (
      <>
        <h1 className='nhsuk-heading-l' data-test-id='heading-one'>
          {userAccountDetails.first_name} {userAccountDetails.last_name} (Deleted)
        </h1>
      </>
    );
  }

  return (
    <>
      <h1 className='nhsuk-heading-l' data-test-id='heading-one'>
        {userAccountDetails.first_name} {userAccountDetails.last_name} {}
      </h1>
    </>
  );
}

function EditUser() {
  const {email} = useParams();

  if (!email) {
    return <Navigate to={ROUTES.ERROR} />;
  }

  const getUser = userManagementApi(state => state.getUser);
  const currentUserDetails = getUser({email: email})[0];
  const detailsToUpdate = editUserStore(state => state.detailsToUpdate);
  const rolesToAdd = editUserStore(state => state.rolesToAdd);
  const rolesToDelete = editUserStore(state => state.rolesToDelete);
  const userManagementApiState = userManagementApi();
  const clear = editUserStore(state => state.clear);
  const navigate = useNavigate();
  const location = useLocation();

  function confirmChange() {
    if (!email) {
      navigate(ROUTES.ERROR);
      return;
    }

    userManagementApiState.updateUser({
      ...detailsToUpdate,
      email: email,
    });
    userManagementApiState.addRoles({
      email: email,
      roles: rolesToAdd,
    });
    userManagementApiState.deleteRoles({
      email: email,
      roles: rolesToDelete,
    });
    clear();
    navigate(ROUTES.USER_PERMISSIONS);
  }

  function currentRolesToDisplay(): TUserRole[] {
    return currentUserDetails.roles.filter(role => {
      return !isRoleInList(role, rolesToDelete);
    });
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <BackLink to={location.state?.from || ROUTES.USER_PERMISSIONS}>Cancel</BackLink>
        <UserName userAccountDetails={currentUserDetails}></UserName>
        <DeleteRestoreButton
          email={email}
          accountEnabled={currentUserDetails.account_enabled}
        ></DeleteRestoreButton>
        <UserSummary user={currentUserDetails}></UserSummary>
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
            {currentRolesToDisplay().map(role => (
              <Table.Row
                style={{margin: 50}}
                key={`${role.role}_${role.organisation_code}_${role.collection}`}
              >
                <Table.Cell>{role.role}</Table.Cell>
                <Table.Cell>{role.organisation_code}</Table.Cell>
                <Table.Cell>{getOrgName(role.organisation_code)}</Table.Cell>
                <Table.Cell>{role.collection}</Table.Cell>
                <Table.Cell>
                  <Tag>Active</Tag>
                </Table.Cell>
                <DeleteRoleButton
                  email={currentUserDetails.email}
                  role={role}
                  accountEnabled={currentUserDetails.account_enabled}
                ></DeleteRoleButton>
              </Table.Row>
            ))}
            {rolesToDelete.map(role => (
              <RoleToDeleteRow role={role} />
            ))}
            {rolesToAdd.map(role => (
              <RoleToAddRow role={role}></RoleToAddRow>
            ))}
            <AddRoleButton accountEnabled={currentUserDetails.account_enabled}></AddRoleButton>
          </Table.Body>
        </Table>
        <Button onClick={confirmChange}>Confirm</Button>
      </div>
    </>
  );
}

export {EditUser};
