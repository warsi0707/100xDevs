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



const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/></>
  },
  {
    path : "/:id",
    element : <><Navbar/><DetailC/></>
  },
  {
    path: "/signup",
    element: <><Navbar/><Signup/></>
  },
  {
    path: "/signin",
    element: <><Navbar/><Signin/></>
  },
  {
    path: "/purchased",
    element: <><Navbar/><Purchased/></>
  }
  
  
  
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <RouterProvider router={router}/>
  // </StrictMode>,
)
