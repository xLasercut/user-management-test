import {createBrowserRouter} from 'react-router-dom';
import App from '../App.tsx';
import EditUser from '../views/EditUser.tsx';
import AddRoles from '../views/AddRoles.tsx';

const router = createBrowserRouter([
  {
    path: '/user-management-test/',
    element: <App />,
    children: [
      {
        path: '/user-management-test/',
        element: <EditUser></EditUser>,
      },
      {
        path: '/user-management-test/add-roles',
        element: <AddRoles></AddRoles>,
      },
    ],
  },
]);

export {router};
