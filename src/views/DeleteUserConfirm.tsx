import {Button} from 'nhsuk-react-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useGlobalStore} from '../store/store.ts';

function DeleteUserConfirm() {
  const {email} = useParams();
  const navigate = useNavigate();
  const deleteUser = useGlobalStore(state => state.deleteUser);

  function cancel() {
    navigate(`/user-management-test/edit-user/${email}`);
  }

  function confirm() {
    deleteUser(email || '');
    navigate(`/user-management-test/user-permissions`);
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <h2>Are you sure you want to delete this permission?</h2>
        <p>
          Deleting this user will remove them from SDCS Cloud platform. They will not appear in
          searches, but can be found for 2 months in the "Deleted Users" section, after which they
          will be fully removed
        </p>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

export {DeleteUserConfirm};
