import {Link} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';
import {Header} from 'nhsuk-react-components';

function UserManagementPortalNavigation() {
  return (
    <>
      <Header.NavItem asElement={Link} to={ROUTES.EMAIL_CHECK}>
        Add User
      </Header.NavItem>
      <Header.NavItem asElement={Link} to={ROUTES.USER_PERMISSIONS}>
        User Permissions
      </Header.NavItem>
      <Header.NavItem asElement={Link} to={ROUTES.DELETED_USERS}>
        Deleted Users
      </Header.NavItem>
    </>
  );
}

export {UserManagementPortalNavigation};
