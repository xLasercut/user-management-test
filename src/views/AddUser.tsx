import {useNavigate, useParams} from 'react-router-dom';
import {Button, Input, Radios, Table, Tag} from 'nhsuk-react-components';
import {getOrgName} from '../store/helpers.ts';
import {useGlobalStore} from '../store/store.ts';
import {AddRoleButton} from '../components/AddRoleButton.tsx';

function AddUser() {
  const {email} = useParams();
  const rolesToAdd = useGlobalStore(state => state.rolesToAdd);
  const rolesToDelete = useGlobalStore(state => state.rolesToDelete);
  const removeRoleToAdd = useGlobalStore(state => state.removeRoleToAdd);
  const removeRoleToDelete = useGlobalStore(state => state.removeRoleToDelete);
  const userToAdd = useGlobalStore(state => state.userToAdd);
  const updateUserToAdd = useGlobalStore(state => state.updateUserToAdd);
  const addUser = useGlobalStore(state => state.addUser);
  const clear = useGlobalStore(state => state.clear);
  const navigate = useNavigate();

  function updateField(name: string) {
    return function (e: any) {
      updateUserToAdd(name, e.target.value);
    };
  }

  function updateRadio(e: any) {
    updateUserToAdd('do_not_delete', e.target.value === 'true');
  }

  function cancel() {
    clear();
    navigate('/user-management-test/');
  }

  function confirm() {
    updateUserToAdd('creation_time', new Date().toISOString());

    const user = {
      ...userToAdd,
      roles: rolesToAdd,
    };
    addUser(user);
    clear();
    navigate('/user-management-test/');
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <h1>Add User</h1>
        <h4>Email</h4>
        <p>{userToAdd.email}</p>

        <Input
          onChange={updateField('first_name')}
          defaultValue={userToAdd.first_name}
          label='First Name'
        ></Input>
        <Input
          onChange={updateField('last_name')}
          defaultValue={userToAdd.last_name}
          label='Last Name'
        ></Input>
        <Radios
          defaultValue={`${userToAdd.do_not_delete}`}
          onChange={updateRadio}
          label='Do Not Delete'
        >
          <Radios.Radio checked={userToAdd.do_not_delete} value='true'>
            True
          </Radios.Radio>
          <Radios.Radio checked={!userToAdd.do_not_delete} value='false'>
            False
          </Radios.Radio>
        </Radios>
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
            <AddRoleButton email={email || ''} accountEnabled={true}></AddRoleButton>
          </Table.Body>
        </Table>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

export {AddUser};
