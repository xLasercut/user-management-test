import {Header} from 'nhsuk-react-components';
import {Link, useNavigate} from 'react-router-dom';

function HeaderComponent() {
  const navigate = useNavigate();

  function goHome(e: React.MouseEvent) {
    e.preventDefault();
    navigate('/user-management-test/');
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
        <Header.NavItem asElement={Link} data-test-id='home-link' to='/user-management-test'>
          Home
        </Header.NavItem>
        <Header.NavItem
          asElement={Link}
          data-test-id='home-link'
          to='/user-management-test/user-permissions'
        >
          Account Permissions
        </Header.NavItem>
        <Header.NavItem
          asElement={Link}
          data-test-id='home-link'
          to='/user-management-test/deleted-users'
        >
          Deleted Users
        </Header.NavItem>
      </Header.Nav>
    </Header>
  );
}

export default HeaderComponent;
