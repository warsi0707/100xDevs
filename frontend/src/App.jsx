import React from 'react'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/course/Navbar';
import Home from './components/course/Home';
import DetailC from './components/course/DetailC';
import Signup from './components/admin/Signup';
import Signin from './components/admin/Signin';
import Purchased from './components/user/BoughtCourses';
import { AuthProvider } from './context/AuthProvider';

export default function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<DetailC/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/purchased' element={<Purchased/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  )
}
