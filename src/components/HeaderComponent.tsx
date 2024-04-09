import {Header} from 'nhsuk-react-components';
import {useNavigate} from 'react-router-dom';

function HeaderComponent() {
  const navigate = useNavigate();

  function goHome(e: React.MouseEvent) {
      e.preventDefault()
      navigate('/user-management-test/');
  }

  return (
    <Header>
      <Header.Container>
        <Header.Logo
          href=''
          onClick={goHome}
        />
        <Header.ServiceName
          href=''
          onClick={goHome}
        >
          Strategic Data Collection Service
        </Header.ServiceName>
      </Header.Container>
    </Header>
  );
}

export default HeaderComponent;
