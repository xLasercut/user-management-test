import {Route, Routes} from 'react-router-dom';
import {HeaderComponent} from './components/Header/HeaderComponent.tsx';
import {Footer} from 'nhsuk-react-components';
import {UserManagementPortal} from './pages/UserManagementPortal/UserManagementPortal.tsx';
import {Home} from './pages/Home/Home.tsx';
import {Error} from './pages/Error/Error.tsx';
import {SubmissionsPortal} from './pages/SubmissionsPortal/SubmissionsPortal.tsx';

function App() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <Routes>
            <Route path={'/user-management-test/error'} element={<Error />} />
            <Route path={'/user-management-test/'} element={<Home />} />
            <Route
              path={'/user-management-test/user-management/*'}
              element={<UserManagementPortal />}
            />
            <Route path={'/user-management-test/submissions-portal/*'} element={<SubmissionsPortal />} />
          </Routes>
        </main>
      </div>
      <Footer>
        <Footer.List>
          <Footer.ListItem
            href="https://digital.nhs.uk/services/strategic-data-collection-service-in-the-cloud-sdcs-cloud/accessibility-statement">
            Accessibility
          </Footer.ListItem>
          <Footer.ListItem href="https://digital.nhs.uk/about-nhs-digital/privacy-and-cookies">
            Privacy and Cookies
          </Footer.ListItem>
          <Footer.ListItem href="https://digital.nhs.uk/about-nhs-digital/contact-us/freedom-of-information">
            Freedom of Information
          </Footer.ListItem>
          <Footer.ListItem href="https://digital.nhs.uk/about-nhs-digital/terms-and-conditions">
            Terms and Conditions
          </Footer.ListItem>
          <Footer.ListItem href="https://digital.nhs.uk/about-nhs-digital/contact-us">
            Contact Us
          </Footer.ListItem>
        </Footer.List>
        <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
      </Footer>
    </>
  );
}

export default App;
