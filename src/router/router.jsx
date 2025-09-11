import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import React from "react";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import DummyPage from "../components/DummyPage";
//import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Routes
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <div>Welcome to your Dashboard!</div> },
          { path: "/dummy", element: <DummyPage /> },
          { path: "/yo", element: <div>Welcome to yo</div> },
        ],
      },
    ],
  },
]);

export default router;
