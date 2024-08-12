import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import CommunityListPage from "./components/CommunityListPage.jsx";
import CommunityPage from './components/CommunityPage.jsx'
import PractitionerPage from "./components/PractitionerPage.jsx";

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