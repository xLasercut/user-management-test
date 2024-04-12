import {Button} from 'nhsuk-react-components';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';
import {userManagementApi} from '../../../store/user-management-api.ts';
import {BackLink} from '../../../components/BackLink.tsx';
import {editUserStore} from '../../../store/edit-user.ts';

function RestoreUserConfirm() {
  const {email} = useParams();

  if (!email) {
    return <Navigate to={ROUTES.ERROR} />;
  }

  const navigate = useNavigate();
  const updateUser = userManagementApi(state => state.updateUser);
  const clear = editUserStore(state => state.clear);

  function confirm() {
    if (!email) {
      navigate(ROUTES.ERROR);
      return;
    }

    updateUser({
      email: email,
      account_enabled: 'true',
    });
    clear();
    navigate(ROUTES.EDIT_USER(email));
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <BackLink to={ROUTES.EDIT_USER(email)}>Cancel</BackLink>
        <h2>Are you sure you want to restore this user?</h2>
        <p>Restoring this user will restore all permissions currently defined for this user.</p>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

export {RestoreUserConfirm};
