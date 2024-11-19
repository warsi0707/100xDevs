import React from 'react'
import {BrowserRouter as  HashRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/NavFooter/Navbar'
import Home from './components/home/Home';
import DetailC from './components/home/DetailC';
import Signup from './components/admin/Signup';
import Signin from './components/admin/Signin';
import Purchased from './components/user/BoughtCourses';
import { AuthProvider } from './context/AuthProvider';
import Course from './components/home/Course';


export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/course/:id' element={<DetailC/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/purchased' element={<Purchased/>}/>
      </Routes>
     
      </AuthProvider>
   
    </HashRouter>
  )
}
