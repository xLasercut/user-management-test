import {Button} from 'nhsuk-react-components';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useGlobalStore} from '../store/store.ts';

function DeleteRoleConfirm() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const addRoleToDelete = useGlobalStore(state => state.addRoleToDelete);

  const email = searchParams.get('email');
  const role = searchParams.get('role') || '';
  const collection = searchParams.get('collection') || '';
  const odsCode = searchParams.get('ods_code') || '';

  function confirm() {
    addRoleToDelete({
      role: role,
      collection: collection,
      organisation_code: odsCode,
    });
    navigate(`/user-management-test/edit-user/${email}`);
  }

  function cancel() {
    navigate(`/user-management-test/edit-user/${email}`);
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <h2>Are you sure you want to delete this permission?</h2>
        <p>email: {email}</p>
        <p>role: {role}</p>
        <p>collection: {collection}</p>
        <p>odsCode: {odsCode}</p>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

export {DeleteRoleConfirm};
