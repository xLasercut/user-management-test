import {ROUTES} from '../../router/Routes.tsx';
import {Card} from '../../components/Card.tsx';
import {userManagementApi} from '../../store/user-management-api.ts';

function Home() {
  const userDetails = userManagementApi(state => state.userDetails);

  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <h1 className='nhsuk-heading-xl' data-test-id='heading-one'>
          Strategic Data Collection Service in the cloud (SDCS Cloud)
        </h1>
        <p className='nhsuk-body-l' data-test-id='welcome-text'>
          Welcome, {userDetails().first_name} {userDetails().last_name}
        </p>
      </div>
      <div className='nhsuk-grid-row'>
        <div className='nhsuk-grid-column-one-half'>
          <Card
            label={'Submissions Portal'}
            to={ROUTES.SUBMISSIONS_PORTAL_HOME}
            description={'Submit your data'}
          />
        </div>
        <div className='nhsuk-grid-column-one-half'>
          <Card
            label={'User Management Portal'}
            to={ROUTES.USER_MANAGEMENT_HOME}
            description={'Add, Remove and Edit users and permissions'}
          />
        </div>
      </div>
    </>
  );
}

export {Home};
