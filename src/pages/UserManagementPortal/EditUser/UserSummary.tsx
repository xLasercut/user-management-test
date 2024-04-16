import {SummaryList} from 'nhsuk-react-components';
import {User} from '../../../types.ts';
import {useLocation, useNavigate} from 'react-router-dom';
import {ROUTES} from '../../../router/Routes.tsx';
import {editUserStore} from '../../../store/edit-user.ts';

interface TProp {
  user: User;
}

function ChangeDetailsButton({user}: TProp) {
  const navigate = useNavigate();
  const location = useLocation();
  const setDetailsToUpdate = editUserStore(state => state.setDetailsToUpdate);

  function updateUserDetails(e: React.MouseEvent) {
    e.preventDefault();
    setDetailsToUpdate('email', user.email);
    navigate(ROUTES.EDIT_USER_DETAILS(user.email), {state: {from:`${location.pathname}${location.search}`}});
  }

  if (!user.account_enabled) {
    return (
      <>
        <SummaryList.Actions></SummaryList.Actions>
      </>
    );
  }

  return (
    <>
      <SummaryList.Actions>
        <a href='' onClick={updateUserDetails}>
          Change
        </a>
      </SummaryList.Actions>
    </>
  );
}

function UserSummary({user}: TProp) {
  const detailsToUpdate = editUserStore(state => state.detailsToUpdate);

  function displayUserDetail(key: 'first_name' | 'last_name' | 'do_not_delete') {
    if (detailsToUpdate[key] !== undefined && detailsToUpdate[key] !== `${user[key]}`) {
      return `${user[key]} (Pending update to ${detailsToUpdate[key]})`;
    }
    return user[key];
  }

  return (
    <>
      <SummaryList data-test-id='summary-info-summarylist'>
        <SummaryList.Row>
          <SummaryList.Key>First Name</SummaryList.Key>
          <SummaryList.Value>{displayUserDetail('first_name')}</SummaryList.Value>
          <ChangeDetailsButton user={user}></ChangeDetailsButton>
        </SummaryList.Row>
        <SummaryList.Row>
          <SummaryList.Key>Last Name</SummaryList.Key>
          <SummaryList.Value>{displayUserDetail('last_name')}</SummaryList.Value>
          <ChangeDetailsButton user={user}></ChangeDetailsButton>
        </SummaryList.Row>
        <SummaryList.Row>
          <SummaryList.Key>Do not delete</SummaryList.Key>
          <SummaryList.Value>{`${displayUserDetail('do_not_delete')}`}</SummaryList.Value>
          <ChangeDetailsButton user={user}></ChangeDetailsButton>
        </SummaryList.Row>
      </SummaryList>
    </>
  );
}

export {UserSummary};
