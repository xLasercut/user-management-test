import {Button, Input, Radios} from 'nhsuk-react-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useGlobalStore} from '../store/store.ts';
import {useState} from 'react';
import {UserDetailsToUpdate} from '../types.ts';

function EditUserDetails() {
  const {email} = useParams();
  const getUser = useGlobalStore(state => state.getUser);
  const currentUserDetails = getUser(email || '');
  const userDetailsToUpdate = useGlobalStore(state => state.userDetailsToUpdate);
  const addUserDetailsToUpdate = useGlobalStore(state => state.addUserDetailsToUpdate);
  const navigate = useNavigate();

  function defaultDoNotDelete() {
    if (userDetailsToUpdate.do_not_delete === true || userDetailsToUpdate.do_not_delete === false) {
      return userDetailsToUpdate.do_not_delete;
    }

    return currentUserDetails.do_not_delete;
  }

  const [detailsToUpdate, setDetailsToUpdate] = useState<UserDetailsToUpdate>({
    first_name: userDetailsToUpdate.first_name || currentUserDetails.first_name,
    last_name: userDetailsToUpdate.last_name || currentUserDetails.last_name,
    do_not_delete: defaultDoNotDelete(),
  });

  function updateField(name: string) {
    return function (e: any) {
      setDetailsToUpdate({
        ...detailsToUpdate,
        [name]: e.target.value,
      });
    };
  }

  function updateRadio(e: any) {
    setDetailsToUpdate({
      ...detailsToUpdate,
      do_not_delete: e.target.value === 'true',
    });
  }

  function cancel() {
    navigate(`/user-management-test/edit-user/${email}`);
  }

  function confirm() {
    addUserDetailsToUpdate(detailsToUpdate);
    navigate(`/user-management-test/edit-user/${email}`);
  }

  return (
    <>
      {JSON.stringify(detailsToUpdate)}
      <Input
        onChange={updateField('first_name')}
        defaultValue={detailsToUpdate.first_name}
        label='First Name'
      ></Input>
      <Input
        onChange={updateField('last_name')}
        defaultValue={detailsToUpdate.last_name}
        label='Last Name'
      ></Input>
      <Radios
        defaultValue={`${detailsToUpdate.do_not_delete}`}
        onChange={updateRadio}
        label='Do Not Delete'
      >
        <Radios.Radio checked={detailsToUpdate.do_not_delete} value='true'>
          True
        </Radios.Radio>
        <Radios.Radio checked={!detailsToUpdate.do_not_delete} value='false'>
          False
        </Radios.Radio>
      </Radios>
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={confirm}>Confirm</Button>
    </>
  );
}

export {EditUserDetails};
