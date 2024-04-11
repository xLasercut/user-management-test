import {Button, Input} from 'nhsuk-react-components';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGlobalStore} from '../store/store.ts';

function EmailCheck() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const clear = useGlobalStore(state => state.clear);
  const isUserExist = useGlobalStore(state => state.isUserExist);
  const updateUserToAdd = useGlobalStore(state => state.updateUserToAdd);

  function cancel() {
    navigate('/user-management-test/');
  }

  function confirm() {
    if (!email) {
      return;
    }

    clear();
    if (isUserExist(email)) {
      navigate(`/user-management-test/edit-user/${email}`);
      return;
    }

    updateUserToAdd('email', email);
    navigate(`/user-management-test/add-user/${email}`);
  }

  return (
    <>
      <Input
        defaultValue={email}
        onChange={(e: any) => {
          setEmail(e.target.value);
        }}
        label='Email'
      ></Input>
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={confirm}>Confirm</Button>
    </>
  );
}

export {EmailCheck};
