import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import CommunityListPage from './pages/CommunityListPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PractitionerPage from './pages/PractitionerPage.jsx';
import PractitionerListPage from './pages/PractitionerListPage.jsx';
import SelfServicePage from './pages/SelfServicePage.jsx';

const router = createHashRouter([
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
