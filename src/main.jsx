import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import MatchPage from './components/MatchPage.jsx'
import PractitionerPage from "./components/PractitionerPage.jsx";

const router = createHashRouter([
  {
    path: "/crf-matching",
    element: <MatchPage />
  },
  {
    path: "/crf-matching/:practitionerId",
    element: <PractitionerPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)