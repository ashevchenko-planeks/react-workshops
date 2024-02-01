import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Nodes from "./pages/nodes";
import Callback from "./pages/callback";
import Videos from "./pages/videos";
import Profile from "./pages/profile";
import {ConfirmationDialogProvider} from "./context/ConfrimationDialogContext.tsx";

const router = createBrowserRouter([
    {
        path: "/nodes",
        element: <Nodes />,
    },
    {
        path: "/callback",
        element: <Callback />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/",
        element: <Videos />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ConfirmationDialogProvider>
        <RouterProvider router={router} />
      </ConfirmationDialogProvider>
  </React.StrictMode>,
)
