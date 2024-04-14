import {Route, Routes} from 'react-router-dom';
import {Collection} from './Collection/Collection.tsx';
import {SubmissionType} from './SubmissionType/SubmissionType.tsx';
import {SubmissionWindow} from './SubmissionWindow/SubmissionWindow.tsx';
import {SubmitData} from './SubmitData/SubmitData.tsx';
import {Organisation} from './Organisation/Organisation.tsx';

function Submission() {
  return (
    <div className='nhsuk-u-width-two-thirds'>
      <Routes>
        <Route path={'/organisation'} element={<Organisation />}></Route>
        <Route path={'/collection'} element={<Collection />}></Route>
        <Route path={'/type'} element={<SubmissionType />} />
        <Route path={'/window'} element={<SubmissionWindow />} />
        <Route path={'/submit-data/*'} element={<SubmitData />} />
      </Routes>
    </div>
  );
}

export {Submission};
