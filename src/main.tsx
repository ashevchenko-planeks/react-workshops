import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nodes from "./pages/nodes";
import Callback from "./pages/callback";
import Videos from "./pages/videos";
import Profile from "./pages/profile";
import { ConfirmationDialogProvider } from "./context/ConfrimationDialogContext.tsx";
import { CurrentUserProvider } from "./context/CurrentUserContext.tsx";
import Products from "./pages/products/index.tsx";
import TablePage from "./pages/table/index.tsx";

const router = createBrowserRouter([
  {
    path: "/nodes",
    element: <Nodes />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/callback",
    element: <Callback />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/",
    element: <Videos />
  },
  {
    path: "/table",
    element: <TablePage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfirmationDialogProvider>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </ConfirmationDialogProvider>
  </React.StrictMode>
);
