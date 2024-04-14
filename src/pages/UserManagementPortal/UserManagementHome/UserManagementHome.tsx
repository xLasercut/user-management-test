import {Card} from '../../../components/Card.tsx';
import {ROUTES} from '../../../router/Routes.tsx';
import {userManagementApi} from '../../../store/user-management-api.ts';

function UserManagementHome() {
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
          <Card label={'Add user'} to={ROUTES.EMAIL_CHECK} description={'Add a new user'} />
        </div>
        <div className='nhsuk-grid-column-one-half'>
          <Card
            label={'Accounts and Permissions'}
            to={ROUTES.USER_PERMISSIONS}
            description={'View user accounts and permissions'}
          />
        </div>
        <div className='nhsuk-grid-column-one-half'>
          <Card
            label={'Deleted Users'}
            to={ROUTES.DELETED_USERS}
            description={'View deleted users'}
          />
        </div>
        <div className='nhsuk-grid-column-one-half'>
          <Card label={'Email Status'} to={ROUTES.EMAIL_STATUS} description={'View email status'} />
        </div>
      </div>
    </>
  );
}

export {UserManagementHome};
