import {createBrowserRouter} from 'react-router-dom';
import NotificationSettings from '../views/NotificationSettings.tsx';
import App from '../App.tsx';
import Home from '../views/Home.tsx';

const router = createBrowserRouter([
  {
    path: '/user-management-test/',
    element: <App />,
    children: [
      {
        path: '/user-management-test/',
        element: <Home></Home>,
      },
      {
        path: '/user-management-test/notification-settings',
        element: <NotificationSettings></NotificationSettings>,
      },
    ],
  },
]);

export {router};
