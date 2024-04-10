import {createBrowserRouter} from 'react-router-dom';
import App from '../App.tsx';
import EditUser from '../views/EditUser.tsx';
import AddRoles from '../views/AddRoles.tsx';
import Home from '../views/Home.tsx';
import {UserPermissions} from '../views/UserPermissions.tsx';
import {DeleteRoleConfirm} from '../views/DeleteRoleConfirm.tsx';
import {EditUserDetails} from '../views/EditUserDetails.tsx';

const router = createBrowserRouter([
  {
    path: '/user-management-test',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home></Home>,
      },
      {
        path: 'user-permissions',
        element: <UserPermissions></UserPermissions>,
      },
      {
        path: 'edit-user/:email',
        element: <EditUser></EditUser>,
      },
      {
        path: 'add-roles/:email',
        element: <AddRoles></AddRoles>,
      },
      {
        path: 'delete-role-confirm',
        element: <DeleteRoleConfirm></DeleteRoleConfirm>,
      },
      {
        path: 'edit-user-details/:email',
        element: <EditUserDetails></EditUserDetails>,
      },
    ],
  },
]);

export {router};
