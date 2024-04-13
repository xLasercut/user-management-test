import {Route, Routes} from 'react-router-dom';
import {SubmissionsPortalHome} from './SubmissionsPortalHome/SubmissionsPortalHome.tsx';
import {SubmissionConfig} from './SubmissionConfig/SubmissionConfig.tsx';
import {Submission} from './Submission/Submission.tsx';

function SubmissionsPortal() {
  return (
    <Routes>
      <Route path={'/'} element={<SubmissionsPortalHome />} />
      <Route path={'/submission-config'} element={<SubmissionConfig />} />
      <Route path={'/submission/*'} element={<Submission />} />
    </Routes>
  );
}

export {SubmissionsPortal};
