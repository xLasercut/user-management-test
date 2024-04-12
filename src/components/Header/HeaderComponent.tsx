import {Header} from 'nhsuk-react-components';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import {ROUTES} from '../../router/Routes.tsx';
import {HomeNavigation} from './HeaderNavigations/HomeNavigation.tsx';
import {UserManagementPortalNavigation} from './HeaderNavigations/UserManagementPortalNavigation.tsx';

function HeaderComponent() {
  const navigate = useNavigate();

  function goHome(e: React.MouseEvent) {
    e.preventDefault();
    navigate(ROUTES.HOME);
  }

  return (
    <Header>
      <Header.Container>
        <Header.Logo href='' onClick={goHome} />
        <Header.ServiceName href='' onClick={goHome}>
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
        </Routes>
        {/*<Header.NavItem*/}
        {/*  asElement={Link}*/}
        {/*  data-test-id='home-link'*/}
        {/*  to='/user-management-test/email-check'*/}
        {/*>*/}
        {/*  Add User*/}
        {/*</Header.NavItem>*/}
        {/*<Header.NavItem*/}
        {/*  asElement={Link}*/}
        {/*  data-test-id='home-link'*/}
        {/*  to='/user-management-test/user-permissions'*/}
        {/*>*/}
        {/*  Account Permissions*/}
        {/*</Header.NavItem>*/}
        {/*<Header.NavItem*/}
        {/*  asElement={Link}*/}
        {/*  data-test-id='home-link'*/}
        {/*  to='/user-management-test/deleted-users'*/}
        {/*>*/}
        {/*  Deleted Users*/}
        {/*</Header.NavItem>*/}
      </Header.Nav>
    </Header>
  );
}

export {HeaderComponent};
