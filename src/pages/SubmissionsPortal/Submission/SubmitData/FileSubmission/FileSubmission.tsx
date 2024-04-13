import {Button, Input} from 'nhsuk-react-components';
import {BackLink} from '../../../../../components/BackLink.tsx';
import {useLocation} from 'react-router-dom';
import {ROUTES} from '../../../../../router/Routes.tsx';

function FileSubmission() {
  const location = useLocation();
  return (
    <>
      <BackLink
        to={location.state?.from || `${ROUTES.SUBMISSION_WINDOW}${location.search}`}
      >Submission Window</BackLink>
      <Input label={'Upload'} type={'file'}></Input>
      <Button>Confirm</Button>
    </>
  );
}

export {FileSubmission};
