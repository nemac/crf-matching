import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ReactGA from 'react-ga4';

import AboutPage from './pages/AboutPage.jsx';
import PractitionerPage from './pages/PractitionerPage.jsx';
// import PractitionerWorkExamplePage from './pages/PractitionerWorkExamplePage.jsx';
import HowToApplyPage from './pages/HowToApplyPage.jsx';
import Registry from './pages/Registry.jsx';
import RequestUpdatePage from './pages/RequestUpdatePage.jsx';
import UpdateDataPage from './pages/UpdateDataPage.jsx';
import WorkExamplePage from './pages/WorkExamplePage.jsx';
import AllComponents from './pages/AllComponents.jsx';
import HomePage from './pages/HomePage.jsx';

ReactGA.initialize('G-V5H6STTJJS'); // Replace with your GA Measurement ID
ReactGA.send('pageview'); // Send initial pageview

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/Registry',
    element: <Registry />,
  },
  {
    path: '/practitioner/:practitionerId',
    element: <PractitionerPage />,
  },
  // {
  // path: '/practitionerworkexamplepage/:practitionerId:workExampleId',
  // path: '/practitionerworkexamplepage/:practitionerId',
  // element: <PractitionerWorkExamplePage />,
  // },
  {
    path: '/About',
    element: <AboutPage />,
  },
  {
    path: '/Howtoapply',
    element: <HowToApplyPage />,
  },
  {
    path: '/request-update',
    element: <RequestUpdatePage />,
  },
  {
    path: '/update-data',
    element: <UpdateDataPage />,
  },
  {
    path: '/work-example',
    element: <WorkExamplePage />,
  },
  {
    path: '/all-components',
    element: <AllComponents />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
