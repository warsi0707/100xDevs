import React from 'react'
import Course from './Course'
import Footer from '../NavFooter/Footer'
import Carousel from './Carousel'
import Sidebar from './Sidebar'
import Testimonials from './Testimonials'
import About from './About'
import StarterCourse from './StarterCourse'
export default function Home() {
  return (
  <>
  <div className="flex h-screen">
    <Sidebar/>
    <div className='flex-1  '>
        <Carousel/>
        <StarterCourse/>
        <Testimonials/>
        <About/>
        <Footer/>
       
    </div>
  </div>
   
  </>
  )
}
