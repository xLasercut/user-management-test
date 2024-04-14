import {Card} from '../../../components/Card.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {userManagementApi} from '../../../store/user-management-api.ts';

function SubmissionsPortalHome() {
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
        <p className='nhsuk-body-l' data-test-id='main-text'>
          This secure service allows you to submit large volumes of data into DPS, which will then
          ensure it is of the required standard before processing.
        </p>
      </div>
      <div className='nhsuk-grid-row'>
        <div className='nhsuk-grid-column-one-half'>
          <Card label={'Submit data'} to={ROUTES.SUBMISSIONS_HOME} description={'Submit data'} />
        </div>
        <div className='nhsuk-grid-column-one-half'>
          <Card
            label={'Set config'}
            to={ROUTES.SET_SUBMISSION_CONFIG}
            description={'Set mock config file'}
          />
        </div>
      </div>
    </>
  );
}

export {SubmissionsPortalHome};
