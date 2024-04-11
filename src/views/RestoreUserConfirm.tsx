import {Button} from 'nhsuk-react-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useGlobalStore} from '../store/store.ts';

function RestoreUserConfirm() {
  const {email} = useParams();
  const navigate = useNavigate();
  const restoreUser = useGlobalStore(state => state.restoreUser);

  function cancel() {
    navigate(`/user-management-test/edit-user/${email}`);
  }

  function confirm() {
    restoreUser(email || '');
    navigate(`/user-management-test/edit-user/${email}`);
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <h2>Are you sure you want to restore this user?</h2>
        <p>Restoring this user will restore all permissions currently defined for this user.</p>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

export {RestoreUserConfirm};
