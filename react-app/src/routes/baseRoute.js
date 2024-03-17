import {
    createBrowserRouter,
  } from "react-router-dom"
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import SignUp from "../pages/Signup"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
  ]);

export default router