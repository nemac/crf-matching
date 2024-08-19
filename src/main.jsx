import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import CommunityListPage from "./components/pages/CommunityListPage.jsx";
import CommunityPage from './components/pages/CommunityPage.jsx'
import PractitionerPage from "./components/pages/PractitionerPage.jsx";

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
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
