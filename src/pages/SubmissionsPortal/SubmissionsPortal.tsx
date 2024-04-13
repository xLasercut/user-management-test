import {Route, Routes} from 'react-router-dom';
import {SubmissionsPortalHome} from './SubmissionsPortalHome/SubmissionsPortalHome.tsx';

function SubmissionsPortal() {
  return <Routes>
    <Route path={'/'} element={<SubmissionsPortalHome />} />
  </Routes>;
}

export {SubmissionsPortal};