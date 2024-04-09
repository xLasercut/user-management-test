import {useGlobalStore} from '../store/store.ts';
import {Button, Table, Tag, SummaryList} from 'nhsuk-react-components';
import {useNavigate} from 'react-router-dom';

interface Role {
  role: string;
  collection: string;
  organisation_code: string;
}

function EditUser() {
  const currentUserDetails = useGlobalStore(state => state.currentUserDetails);
  const rolesToAdd = useGlobalStore(state => state.rolesToAdd);
  const rolesToDelete = useGlobalStore(state => state.rolesToDelete);
  const cancelAddRoles = useGlobalStore(state => state.cancelAddRoles);
  const cancelDeleteRole = useGlobalStore(state => state.cancelDeleteRole);
  const deleteRole = useGlobalStore(state => state.deleteRole);
  const navigate = useNavigate();

  function addRole() {
    navigate('/user-management-test/add-roles');
  }

  function _deleteRole(role: Role) {
    deleteRole(role);
  }

  function _cancelAddRoles(role: Role) {
    cancelAddRoles(role);
  }

  function _cancelDeleteRole(role: Role) {
    cancelDeleteRole(role);
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <h1 className='nhsuk-heading-l' data-test-id='heading-one'>
          {currentUserDetails.first_name} {currentUserDetails.last_name}
        </h1>
        <SummaryList data-test-id='summary-info-summarylist'>
          <SummaryList.Row>
            <SummaryList.Key>First Name</SummaryList.Key>
            <SummaryList.Value data-test-id='organisation'>
              {currentUserDetails.first_name}
            </SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Last Name</SummaryList.Key>
            <SummaryList.Value data-test-id='collection'>
              {currentUserDetails.last_name}
            </SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Do not delete</SummaryList.Key>
            <SummaryList.Value data-test-id='version'>{`${currentUserDetails.do_not_delete}`}</SummaryList.Value>
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
            {currentUserDetails.roles
                .filter(role => !rolesToDelete.includes(role))
                .map(role => (
                    <Table.Row
                        style={{margin: 50}}
                        key={`${role.role}_${role.organisation_code}_${role.collection}`}
                    >
                      <Table.Cell data-test-id='date-submitted'>{role.role}</Table.Cell>
                      <Table.Cell data-test-id='organisation-code'>{role.organisation_code}</Table.Cell>
                      <Table.Cell data-test-id='organisation'>Org name</Table.Cell>
                      <Table.Cell data-test-id='col-collection'>{role.collection}</Table.Cell>
                      <Table.Cell>
                        <Tag data-test-id='status'>Active</Tag>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                            href=''
                            onClick={e => {
                              e.preventDefault();
                              _deleteRole(role);
                            }}
                        >
                          Delete
                        </a>
                      </Table.Cell>
                    </Table.Row>
                ))}
            {rolesToDelete.map(role => (
                <Table.Row
                    style={{margin: 50}}
                    key={`${role.role}_${role.organisation_code}_${role.collection}`}
                >
                  <Table.Cell data-test-id='date-submitted'>{role.role}</Table.Cell>
                  <Table.Cell data-test-id='organisation-code'>{role.organisation_code}</Table.Cell>
                  <Table.Cell data-test-id='organisation'>Org name</Table.Cell>
                  <Table.Cell data-test-id='col-collection'>{role.collection}</Table.Cell>
                  <Table.Cell>
                    <Tag data-test-id='status'>To be deleted</Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                        href=''
                        onClick={e => {
                          e.preventDefault();
                          _cancelDeleteRole(role);
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
                  <Table.Cell data-test-id='organisation'>Org name</Table.Cell>
                  <Table.Cell data-test-id='col-collection'>{role.collection}</Table.Cell>
                  <Table.Cell>
                    <Tag data-test-id='status'>To be added</Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                        href=''
                        onClick={e => {
                          e.preventDefault();
                          _cancelAddRoles(role);
                        }}
                    >
                      Cancel
                    </a>
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button onClick={addRole}>Add Role</Button>
      </div>
    </>
  );
}

export default EditUser;
