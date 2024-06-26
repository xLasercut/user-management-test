import {Header} from 'nhsuk-react-components';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';

function HomeNavigation() {
  return (
    <>
      <Header.NavItem asElement={Link} to={ROUTES.SUBMISSIONS_PORTAL_HOME}>
        Submissions Portal
      </Header.NavItem>
      <Header.NavItem asElement={Link} to={ROUTES.USER_MANAGEMENT_HOME}>
        User Management Portal
      </Header.NavItem>
    </>
  );
}

export {HomeNavigation};
