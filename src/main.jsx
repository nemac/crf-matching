import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ReactGA from "react-ga4";

import AboutPage from './pages/AboutPage.jsx';
import PractitionerPage from './pages/PractitionerPage.jsx';
import HomePage from './pages/HomePage.jsx';

ReactGA.initialize("G-V5H6STTJJS"); // Replace with your GA Measurement ID
ReactGA.send("pageview"); // Send initial pageview

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/practitioner/:practitionerId',
    element: <PractitionerPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
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
