import {Header} from 'nhsuk-react-components';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import {ROUTES} from '../../router/Routes.tsx';
import {HomeNavigation} from './HeaderNavigations/HomeNavigation.tsx';
import {UserManagementPortalNavigation} from './HeaderNavigations/UserManagementPortalNavigation.tsx';
import {SubmissionsPortalNavigation} from './HeaderNavigations/SubmissionsPortalNavigation.tsx';

function HeaderComponent() {
  const navigate = useNavigate();

  function goHome(e: React.MouseEvent) {
    e.preventDefault();
    navigate(ROUTES.HOME);
  }

  return (
    <Header>
      <Header.Container>
        <Header.Logo href="" onClick={goHome} />
        <Header.ServiceName href="" onClick={goHome}>
          Strategic Data Collection Service
        </Header.ServiceName>
      </Header.Container>
      <Header.Nav>
        <Header.NavItem asElement={Link} to={ROUTES.HOME}>
          Home
        </Header.NavItem>
        <Routes>
          <Route path={'/user-management-test/'} element={<HomeNavigation />} />
          <Route
            path={'/user-management-test/user-management/*'}
            element={<UserManagementPortalNavigation />}
          />
          <Route path={'/user-management-test/submissions-portal/*'} element={<SubmissionsPortalNavigation />} />
        </Routes>
      </Header.Nav>
    </Header>
  );
}

export {HeaderComponent};
