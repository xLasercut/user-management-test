import {Card} from 'nhsuk-react-components';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../router/Routes.tsx';

function Home() {
  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <h1 className='nhsuk-heading-xl' data-test-id='heading-one'>
          Strategic Data Collection Service in the cloud (SDCS Cloud)
        </h1>
        <p className='nhsuk-body-l' data-test-id='welcome-text'>
          Welcome, User.
        </p>
      </div>
      <div className='nhsuk-grid-row'>
        <div className='nhsuk-grid-column-one-half'>
          <Card clickable>
            <Card.Content>
              <Card.Heading>
                <Link to={ROUTES.USER_MANAGEMENT_HOME}>User Management Portal</Link>
              </Card.Heading>
              <Card.Description>Add, Remove and Edit users and permissions</Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
    </>
  );
}

export {Home};
