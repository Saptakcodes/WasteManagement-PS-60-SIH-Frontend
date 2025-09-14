import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import React from "react";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Training from "../pages/Training";
import DummyPage from "../components/DummyPage";
//import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import TestTheme from "../pages/TestTheme";
import UploadBins from "../pages/UploadBins";
import ReportWaste from "../pages/ReportWaste";
import Rewards from "../pages/Rewards";
import Communities from "../pages/Communities";
import Guide from "../pages/Guide";
import CitizenQRPage from "../pages/CitizenQRPage";
import Training2 from "../pages/Training";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Routes
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/", element: <Home/> },
          { path: '/home', element: <Home/> }, 
          { path: "/testtheme", element: <TestTheme/> },
          {path: "/training", element: <Training/>},
          {path: "/training2", element: <Training2/>},
          {path: '/upload', element: <UploadBins/>},
          {path: '/report', element: <ReportWaste/>},
          {path: '/rewards', element: <Rewards/>},
          {path: '/community', element: <Communities/>},
          {path: '/guide', element: <Guide/>},
          {path: '/citizenqrpage', element: <CitizenQRPage/>},

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          // { path: "/", element: <Home/> },
          // { path: '/home', element: <Home/> }, 
          // { path: "/testtheme", element: <TestTheme/> },
          // {path: "/training", element: <Training/>},
          // {path: '/upload', element: <UploadBins/>},
          // {path: '/report', element: <ReportWaste/>},
          // {path: '/rewards', element: <Rewards/>},
          // {path: '/community', element: <Communities/>},
          // {path: '/guide', element: <Guide/>}
        ],
      },
    ],
  },
]);

export default router;
