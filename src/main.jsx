import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import CommunityListPage from './pages/CommunityListPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PractitionerPage from './pages/PractitionerPage.jsx';
import PractitionerListPage from './pages/PractitionerListPage.jsx';
import SelfServicePage from './pages/SelfServicePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/communities',
    element: <CommunityListPage />,
  },
  {
    path: '/practitioners',
    element: <PractitionerListPage />,
  },
  {
    path: '/community/:communityId',
    element: <CommunityPage />,
  },
  {
    path: '/practitioner/:practitionerId',
    element: <PractitionerPage />,
  },
  {
    path: '/selfservice',
    element: <SelfServicePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
