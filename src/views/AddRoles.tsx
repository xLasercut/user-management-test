import {Button, Checkboxes, Fieldset, Input, Radios} from 'nhsuk-react-components';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useGlobalStore} from '../store/store.ts';

function AddRoles() {
  const {email} = useParams();
  const COLLECTIONS = ['MHSDS', 'MSDS', 'CSDS', 'IAPT'];

  const [rolesToAdd, setRolesToAdd] = useState<Record<string, string | undefined>>({});
  const [odsCode, setOdsCode] = useState<string>('');
  const navigate = useNavigate();
  const addRoleToAdd = useGlobalStore(state => state.addRoleToAdd);

  function confirmAddRoles() {
    for (const key in rolesToAdd) {
      if (!rolesToAdd[key]) {
        continue;
      }

      addRoleToAdd({
        role: rolesToAdd[key] || '',
        collection: key,
        organisation_code: odsCode,
      });
    }

    navigate(`/user-management-test/edit-user/${email}`);
  }

  function cancel() {
    navigate(`/user-management-test/edit-user/${email}`);
  }

  function updateOdsCode(e: any) {
    setOdsCode(e.target.value);
  }

  function shouldRadioBeChecked(collection: string, radioValue: string): boolean {
    return rolesToAdd[collection] === radioValue;
  }

  function selectRoleToAddRadio(collection: string) {
    return function (e: any) {
      setRolesToAdd(currentRoles => {
        return {
          ...currentRoles,
          [collection]: e.target.value,
        };
      });
    };
  }

  function selectRoleToAddCheckbox(collection: string) {
    return function (e: any) {
      if (!e.target.checked) {
        setRolesToAdd(currentRoles => {
          return {
            ...currentRoles,
            [collection]: undefined,
          };
        });
      }
    };
  }

  return (
    <>
      <p>ODS Code: {odsCode}</p>
      <p>Roles: {JSON.stringify(rolesToAdd)}</p>
      <Input label='ODS Code' value={odsCode} onChange={updateOdsCode}></Input>
      <Fieldset aria-describedby='notification-mid-window--hint'>
        <Fieldset.Legend>
          <b>Select collection and role</b>
        </Fieldset.Legend>
        <Checkboxes id='notification-mid-window' name='notification-mid-window'>
          {COLLECTIONS.map(collection => (
            <Checkboxes.Box
              key={collection}
              onChange={selectRoleToAddCheckbox(collection)}
              conditional={
                <Radios onChange={selectRoleToAddRadio(collection)}>
                  <Radios.Radio
                    value='SUBMITTER'
                    checked={shouldRadioBeChecked(collection, 'SUBMITTER')}
                  >
                    SUBMITTER
                  </Radios.Radio>
                  <Radios.Radio
                    value='ANALYST'
                    checked={shouldRadioBeChecked(collection, 'ANALYST')}
                  >
                    ANALYST
                  </Radios.Radio>
                </Radios>
              }
              value={collection}
            >
              {collection}
            </Checkboxes.Box>
          ))}
        </Checkboxes>
      </Fieldset>
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={confirmAddRoles}>Add Role</Button>
    </>
  );
}

export default AddRoles;
