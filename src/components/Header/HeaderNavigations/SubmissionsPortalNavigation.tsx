import {Header} from 'nhsuk-react-components';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';

function SubmissionsPortalNavigation() {
  return (
    <>
      <Header.NavItem asElement={Link} to={ROUTES.SUBMISSIONS_HOME}>
        Submit Data
      </Header.NavItem>
      <Header.NavItem asElement={Link} to={ROUTES.SET_SUBMISSION_CONFIG}>
        Set Config
      </Header.NavItem>
    </>
  );
}

export {SubmissionsPortalNavigation};
