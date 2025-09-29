import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import React from "react";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Training from "../pages/Training";
import DummyPage from "../components/DummyPage";
import Home from "../pages/Home";
import TestTheme from "../pages/TestTheme";
import UploadBins from "../pages/UploadBins";
import ReportWaste from "../pages/ReportWaste";
import Rewards from "../pages/Rewards";
import Communities from "../pages/Communities";
import Guide from "../pages/Guide";
import CitizenQRPage from "../pages/CitizenQRPage";
import Training2 from "../pages/Training";
import CommunityImpact from "../pages/CommunityImpact";


// worker-portal
import WorkerDashboard from "../pages/WorkerDashboard";
import WorkerTraining from "../pages/WorkerTraining";
import WorkerTasks from "../pages/WorkerTasks";
import WorkerReportComplaint from "../pages/WorkerReportComplaint";
import WorkerRewards from "../pages/WorkerRewards";
import WorkerSafety from "../pages/WorkerSafety";
import WorkerHelpdesk from "../pages/WorkerHelpdesk";

// authorities-portal
import AuthorityDashboard from "../pages/AuthorityDashboard";
import AuthorityManageCitizen from "../pages/AuthorityManageCitizen";
import AuthorityManageWorker from "../pages/AuthorityManageWorker";
import SmartOpsCenter from "../pages/AuthoritySmartOpsCenter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Routes
      { index: true, element: <Home /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/", element: <Home/> },
      { path: "/testtheme", element: <TestTheme/> },
      
      // Citizen Portal Routes
      { path: "/citizen/home", element: <Home/> },
      { path: "/citizen/impact", element: <Guide/> },
      { path: "/citizen/training", element: <Training/> },
      { path: "/citizen/upload", element: <UploadBins/> },
      { path: "/citizen/qr-tracking", element: <CitizenQRPage/> },
      { path: "/citizen/report", element: <ReportWaste/> },
      { path: "/citizen/rewards", element: <Rewards/> },
      { path: "/citizen/community", element: <Communities/> },
      { path: "/citizen/community-impact", element: <CommunityImpact/> },
      
      // Worker Portal Routes
      { path: "/worker/dashboard", element: <WorkerDashboard /> },
      { path: "/worker/training", element: <WorkerTraining /> },
      { path: "/worker/tasks", element: <WorkerTasks /> },
      { path: "/worker/reportcomplaint", element: <WorkerReportComplaint/>},
      { path: "/worker/rewards", element: <WorkerRewards/>},
      { path: "/worker/safety", element: <WorkerSafety/>},
      { path: "/worker/helpdesk", element: <WorkerHelpdesk/>},
      

      
      // Authority Portal Routes
      { path: "/authority/dashboard", element: <AuthorityDashboard /> },
      { path: "/authority/citizens", element: <AuthorityManageCitizen /> },
      { path: "/authority/workers", element: <AuthorityManageWorker /> },
      { path: "/authority/smartops", element: <SmartOpsCenter /> },



      
      // Legacy routes (redirect to citizen portal for backward compatibility)
      { path: '/home', element: <Home/> }, 
      { path: "/training", element: <Training/> },
      { path: "/training2", element: <Training2/> },
      { path: '/upload', element: <UploadBins/> },
      { path: '/report', element: <ReportWaste/> },
      { path: '/rewards', element: <Rewards/> },
      { path: '/community', element: <Communities/> },
      { path: '/guide', element: <Guide/> },
      { path: '/citizenqrpage', element: <CitizenQRPage/> },
      { path: '/communityimpact', element: <CommunityImpact/> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          // Add protected routes here if needed
        ],
      },
    ],
  },
]);

export default router;