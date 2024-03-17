import {
    createBrowserRouter,
    Outlet
  } from "react-router-dom"
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Timesheet from '../pages/Timesheet'
import SignUp from "../pages/Signup"
import BaseLayout from '../layouts'
import { ErrorBoundary } from "react-error-boundary";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={<></>}>
    <Outlet />
  </ErrorBoundary>
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout/>,
    errorElement: <ErrorBoundaryLayout/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/timesheet",
        element: <Timesheet/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorBoundaryLayout/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
    errorElement: <ErrorBoundaryLayout/>,
  },
]);

export default router