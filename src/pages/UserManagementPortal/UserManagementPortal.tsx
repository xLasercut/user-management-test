import {Route, Routes} from 'react-router-dom';
import {UserManagementHome} from './UserManagementHome/UserManagementHome.tsx';
import {UserPermissions} from './UserPermissions/UserPermissions.tsx';
import {EditUser} from './EditUser/EditUser.tsx';
import {DeleteUserConfirm} from './DeleteUserConfirm/DeleteUserConfirm.tsx';
import {EditUserDetails} from './EditUserDetails/EditUserDetails.tsx';
import AddRole from './AddRoles/AddRole.tsx';
import {DeleteRoleConfirm} from './DeleteRoleConfirm/DeleteRoleConfirm.tsx';
import {DeletedUsers} from './DeletedUsers/DeletedUsers.tsx';
import {RestoreUserConfirm} from './RestoreUserConfirm/RestoreUserConfirm.tsx';
import {EmailCheck} from './EmailCheck/EmailCheck.tsx';
import {AddUser} from './AddUser/AddUser.tsx';

function UserManagementPortal() {
  return (
    <Routes>
      <Route path={'/'} element={<UserManagementHome />}></Route>
      <Route path={'/user-permissions'} element={<UserPermissions />}></Route>
      <Route path={'/edit-user/:email'} element={<EditUser />}></Route>
      <Route path={'/delete-user-confirm/:email'} element={<DeleteUserConfirm />} />
      <Route path={'/edit-user-details/:email'} element={<EditUserDetails />} />
      <Route path={'/add-role'} element={<AddRole />} />
      <Route path={'/delete-role-confirm'} element={<DeleteRoleConfirm />} />
      <Route path={'/deleted-users'} element={<DeletedUsers />} />
      <Route path={'/restore-user-confirm/:email'} element={<RestoreUserConfirm />} />
      <Route path={'/email-check'} element={<EmailCheck />} />
      <Route path={'/add-user/:email'} element={<AddUser />} />
    </Routes>
  );
}

export {UserManagementPortal};
