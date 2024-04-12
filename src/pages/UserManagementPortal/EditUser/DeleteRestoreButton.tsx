import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';
import {Button} from 'nhsuk-react-components';

interface TProp {
  accountEnabled: boolean;
  email: string;
}

function DeleteRestoreButton({email, accountEnabled}: TProp) {
  const navigate = useNavigate();

  function deleteUser() {
    navigate(ROUTES.DELETE_USER_CONFIRM(email));
  }

  function restore() {
    navigate(ROUTES.RESTORE_USER_CONFIRM(email));
  }

  if (accountEnabled) {
    return <Button onClick={deleteUser}>Delete User</Button>;
  }

  return <Button onClick={restore}>Restore User</Button>;
}

export {DeleteRestoreButton};
