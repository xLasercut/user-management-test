import {Button} from 'nhsuk-react-components';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {userManagementApi} from '../../../store/user-management-api.ts';
import {BackLink} from '../../../components/BackLink.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {editUserStore} from '../../../store/edit-user.ts';

interface TPropConfirmPage {
  email: string;
}

function ConfirmPage({email}: TPropConfirmPage) {
  const navigate = useNavigate();
  const updateUser = userManagementApi(state => state.updateUser);
  const clear = editUserStore(state => state.clear);
  const location = useLocation();

  function confirm() {
    updateUser({
      email: email,
      account_enabled: 'false',
    });
    clear();
    navigate(ROUTES.EDIT_USER(email));
  }

  return (
    <>
      <div className='nhsuk-u-width-full'>
        <BackLink to={location.state?.from || ROUTES.EDIT_USER(email)}>Cancel</BackLink>
        <h2>Are you sure you want to delete this user?</h2>
        <p>
          Deleting this user will remove them from SDCS Cloud platform. They will not appear in
          searches, but can be found for 2 months in the "Deleted Users" section, after which they
          will be fully removed
        </p>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

function DeleteUserConfirm() {
  const {email} = useParams();

  if (!email) {
    return <Navigate to={ROUTES.ERROR}></Navigate>;
  }

  return <ConfirmPage email={email}></ConfirmPage>;
}

export {DeleteUserConfirm};
