import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import CommunityListPage from "./pages/CommunityListPage.jsx";
import CommunityPage from './pages/CommunityPage.jsx'
import PractitionerPage from "./pages/PractitionerPage.jsx";
import SelfServicePage from "./pages/SelfServicePage.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <CommunityListPage />
  },
  {
    path: "/community/:communityId",
    element: <CommunityPage />
  },
  {
    path: "/practitioner/:practitionerId",
    element: <PractitionerPage />
  },
  {
    path: "/selfservice",
    element: <SelfServicePage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
