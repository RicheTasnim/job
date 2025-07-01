import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import ErrorPage from "../pages/ErrorPage";
import Jobdetails from "../pages/Jobdetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import Addjob from "../pages/Addjob/Addjob";
import MyPosteJobs from "../pages/MyPostedJobs/MyPosteJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";
import Alljob from "../pages/Alljob/Alljob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/jobs",
        element: <Alljob/>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <Jobdetails></Jobdetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-portal-server-teal-seven.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: '/myApplications',
        element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
      },
      {
        path: '/addjob',
        element: <PrivateRoute><Addjob></Addjob></PrivateRoute>
      },
      {
        path: '/mypostedjobs',
        element: <PrivateRoute><MyPosteJobs></MyPosteJobs></PrivateRoute>
      },
      {
        path: '/viewapplications/:job_id',
        element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
        loader: ({params}) => fetch(`https://job-portal-server-teal-seven.vercel.app/job-applications/jobs/${params.job_id}`)
      }
    ],
  },
]);

export default router;
