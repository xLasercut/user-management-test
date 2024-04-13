import {Route, Routes} from 'react-router-dom';
import {FileSubmission} from './FileSubmission/FileSubmission.tsx';
import {FormSubmission} from './FormSubmission/FormSubmission.tsx';

function SubmitData() {
  return (
    <Routes>
      <Route path={'/file'} element={<FileSubmission />} />
      <Route path={'/form'} element={<FormSubmission />} />
    </Routes>
  );
}

export {SubmitData};
