import {Button} from 'nhsuk-react-components';
import {useNavigate} from 'react-router-dom';
import {useQueryParamHelper} from '../../../common/query-param-helper.ts';
import {BackLink} from '../../../components/BackLink.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {editUserStore} from '../../../store/edit-user.ts';

function DeleteRoleConfirm() {
  const navigate = useNavigate();
  const {getParameter} = useQueryParamHelper();
  const addRoleToDelete = editUserStore(state => state.addRoleToDelete);

  const email = getParameter('email');
  const role = getParameter('role');
  const collection = getParameter('collection');
  const odsCode = getParameter('ods_code');

  function confirm() {
    addRoleToDelete({
      role: role,
      collection: collection,
      organisation_code: odsCode,
    });
    navigate(ROUTES.EDIT_USER(email));
  }

  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <BackLink to={ROUTES.EDIT_USER(email)}>Cancel</BackLink>
        <h2>Are you sure you want to delete this permission?</h2>
        <p>Email: {email}</p>
        <p>Role: {role}</p>
        <p>Collection: {collection}</p>
        <p>ODS Code: {odsCode}</p>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </>
  );
}

export {DeleteRoleConfirm};
