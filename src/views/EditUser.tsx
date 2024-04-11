import {useGlobalStore} from '../store/store.ts';
import {Button, SummaryList, Table, Tag} from 'nhsuk-react-components';
import {useNavigate, useParams} from 'react-router-dom';
import {getOrgName, isRoleInList} from '../store/helpers.ts';
import {Role, User} from '../types.ts';
import {AddRoleButton} from "../components/AddRoleButton.tsx";

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



function ChangeDetailsButton({email, accountEnabled}: {email: string; accountEnabled: boolean}) {
  const navigate = useNavigate();

  function updateUserDetails(e: any) {
    e.preventDefault();
    navigate(`/user-management-test/edit-user-details/${email}`);
  }

  if (!accountEnabled) {
    return (
      <>
        <SummaryList.Actions></SummaryList.Actions>
      </>
    );
  }

  return (
    <>
      <SummaryList.Actions>
        <a href='' onClick={updateUserDetails}>
          Change
        </a>
      </SummaryList.Actions>
    </>
  );
}

function DeleteRoleButton({
  email,
  role,
  accountEnabled,
}: {
  email: string;
  role: Role;
  accountEnabled: boolean;
}) {
  const navigate = useNavigate();

  if (!accountEnabled) {
    return (
      <>
        <Table.Cell></Table.Cell>
      </>
    );
  }

  return (
    <>
      <Table.Cell>
        <a
          href=''
          onClick={e => {
            e.preventDefault();
            navigate(
              `/user-management-test/delete-role-confirm?email=${email}&role=${role.role}&collection=${role.collection}&ods_code=${role.organisation_code}`
            );
          }}
        >
          Delete
        </a>
      </Table.Cell>
    </>
  );
}

function DeleteRestoreButton({accountEnabled}: {accountEnabled: boolean}) {
  const {email} = useParams();

  const navigate = useNavigate();

  function deleteUser() {
    navigate(`/user-management-test/delete-user-confirm/${email}`);
  }

  function restore() {
    navigate(`/user-management-test/restore-user-confirm/${email}`);
  }

  if (accountEnabled) {
    return <Button onClick={deleteUser}>Delete User</Button>;
  }

  return <Button onClick={restore}>Restore User</Button>;
}

function EditUser() {
  const {email} = useParams();
  const getUser = useGlobalStore(state => state.getUser);
  const currentUserDetails = getUser(email || '');
  const userDetailsToUpdate = useGlobalStore(state => state.userDetailsToUpdate);
  const rolesToAdd = useGlobalStore(state => state.rolesToAdd);
  const rolesToDelete = useGlobalStore(state => state.rolesToDelete);
  const removeRoleToAdd = useGlobalStore(state => state.removeRoleToAdd);
  const removeRoleToDelete = useGlobalStore(state => state.removeRoleToDelete);
  const applyChanges = useGlobalStore(state => state.applyChanges);
  const clear = useGlobalStore(state => state.clear);
  const navigate = useNavigate();

  function cancel() {
    navigate('/user-management-test/user-permissions');
  }

  function confirmChange() {
    applyChanges(email || '', userDetailsToUpdate, rolesToAdd, rolesToDelete);
    clear();
    navigate('/user-management-test/user-permissions');
  }

  function currentRolesToDisplay(): Role[] {
    return currentUserDetails.roles.filter(role => {
      return !isRoleInList(role, rolesToDelete);
    });
  }

  function displayUserDetail(key: 'first_name' | 'last_name' | 'do_not_delete') {
    if (
      userDetailsToUpdate[key] !== undefined &&
      userDetailsToUpdate[key] !== currentUserDetails[key]
    ) {
      return `${currentUserDetails[key]} (Pending update to ${userDetailsToUpdate[key]})`;
    }
    return currentUserDetails[key];
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <UserName userAccountDetails={currentUserDetails}></UserName>
        <DeleteRestoreButton
          accountEnabled={currentUserDetails.account_enabled}
        ></DeleteRestoreButton>
        <SummaryList data-test-id='summary-info-summarylist'>
          <SummaryList.Row>
            <SummaryList.Key>First Name</SummaryList.Key>
            <SummaryList.Value data-test-id='organisation'>
              {displayUserDetail('first_name')}
            </SummaryList.Value>
            <ChangeDetailsButton
              email={currentUserDetails.email}
              accountEnabled={currentUserDetails.account_enabled}
            ></ChangeDetailsButton>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Last Name</SummaryList.Key>
            <SummaryList.Value data-test-id='collection'>
              {displayUserDetail('last_name')}
            </SummaryList.Value>
            <ChangeDetailsButton
              email={currentUserDetails.email}
              accountEnabled={currentUserDetails.account_enabled}
            ></ChangeDetailsButton>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Do not delete</SummaryList.Key>
            <SummaryList.Value data-test-id='version'>{`${displayUserDetail('do_not_delete')}`}</SummaryList.Value>
            <ChangeDetailsButton
              email={currentUserDetails.email}
              accountEnabled={currentUserDetails.account_enabled}
            ></ChangeDetailsButton>
          </SummaryList.Row>
        </SummaryList>
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
              <Table.Row
                style={{margin: 50}}
                key={`${role.role}_${role.organisation_code}_${role.collection}`}
              >
                <Table.Cell data-test-id='date-submitted'>{role.role}</Table.Cell>
                <Table.Cell data-test-id='organisation-code'>{role.organisation_code}</Table.Cell>
                <Table.Cell data-test-id='organisation'>
                  {getOrgName(role.organisation_code)}
                </Table.Cell>
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
            ))}
            {rolesToAdd.map(role => (
              <Table.Row
                style={{margin: 50}}
                key={`${role.role}_${role.organisation_code}_${role.collection}`}
              >
                <Table.Cell data-test-id='date-submitted'>{role.role}</Table.Cell>
                <Table.Cell data-test-id='organisation-code'>{role.organisation_code}</Table.Cell>
                <Table.Cell data-test-id='organisation'>
                  {getOrgName(role.organisation_code)}
                </Table.Cell>
                <Table.Cell data-test-id='col-collection'>{role.collection}</Table.Cell>
                <Table.Cell>
                  <Tag data-test-id='status'>To be added</Tag>
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
            ))}
            <AddRoleButton
              email={currentUserDetails.email}
              accountEnabled={currentUserDetails.account_enabled}
            ></AddRoleButton>
          </Table.Body>
        </Table>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={confirmChange}>Confirm</Button>
      </div>
    </>
  );
}

export default EditUser;
