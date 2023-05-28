import { Navigate } from "react-router-dom";
import LayoutMain from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "../components/PrivateRoutes";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CvManage from "../pages/CvManage";
import CreateJob from "../pages/CreateJob";
import DetailJob from "../pages/DetailJob";
import Search from "../pages/Search";
import ApplyJobs from "../pages/ApplyJobs";
import Company from "../pages/Company";
export const routes = [
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "search",
        element: <Search/>
      },
      {
        path: "detail-job/:id",
        element: <DetailJob/>
      },
      {
        path: "apply-job/:id",
        element: <ApplyJobs/>
      },
      {
        path: "company/:id",
        element: <Company />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "admin",
            element: <Admin role="admin"/>,
          },
          {
            path: "info-company",
            element: <InfoCompany/>,
          },
          {
            path: "job-manage",
            element: <JobManage/>,
          },
          {
            path: "cv-manage",
            element: <CvManage/>,
          },
          {
            path: "create-job",
            element: <CreateJob/>
          },
         
        ],
      },
    ],
  },
];
