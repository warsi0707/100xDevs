import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/course/Navbar"
import Home from './components/course/Home'
import Signup from './components/admin/Signup';
import Signin from './components/admin/Signin';
import DetailC from './components/course/DetailC';
import Purchased from './components/user/BoughtCourses';
import ErrorPage from './errorPage/ErrorPage';
import Footer from './components/course/Footer';



const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/></>,
    errorElement:<><Navbar/><ErrorPage/></> 
  },
  {
    path : "/:id",
    element : <><Navbar/><DetailC/></>,
    errorElement:<><Navbar/><ErrorPage/><Footer/></> 
  },
  {
    path: "/signup",
    element: <><Navbar/><Signup/></>,
    errorElement:<><Navbar/><ErrorPage/><Footer/></> 
  },
  {
    path: "/signin",
    element: <><Navbar/><Signin/></>,
    errorElement:<><Navbar/><ErrorPage/><Footer/></> 
  },
  {
    path: "/purchased",
    element: <><Navbar/><Purchased/></>,
    errorElement:<><Navbar/><ErrorPage/><Footer/></> 
  },
  {
    path: "/profile",
    element: <><Navbar/></>,
    errorElement:<><Navbar/><ErrorPage/><Footer/></> 
  }
  
  
  
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <RouterProvider router={router}/>
  // </StrictMode>,
)
