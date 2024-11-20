import React, { useEffect, useState } from 'react'
import Footer from "../NavFooter/Footer"

export default function Purchased() {
  const [error, setError] = useState("")
  const [courses, setCourses] = useState([])



  const Courses =async()=>{
    try{
      const response = await fetch("https://one00xdevs-cx2s.onrender.com/api/user/courses",{
        credentials: "include"
      })
      const result = await response.json()
      setCourses(result.purchased)
    }catch(error){
      setError(error)
    }
  }

  useEffect(()=>{
    Courses()
  },[])
 
  return (
    <>
    {courses.length ===0 ? <h1 className='text-black mt-10 text-center text-2xl h-screen'>No Course Purchased...</h1>: <>
    <div className='m-0 space-y-10 md:space-y-0 md:grid sm:grid-cols-1 md:grid-cols-3 md:gap-5 pt-10'>
    {courses.map((course) =>(
      <div key={course._id} className='w-96 p-0 text-black mx-auto rounded-xl border-2 border-gray-300'>
        <div className="img">
          <img className='rounded-t-xl' src={course.image} />
        </div>
        <div>
          <h1 className='text-lg text-center py-3'>{course.title}</h1>
        </div>
        <div className="flex flex-col gap-2 p-5">
        <button className='bg-blue-500 text-lg w-full text-white rounded-2xl py-2'>View</button>
        <button className='bg-blue-500 text-lg w-full text-white rounded-2xl py-2'>View Invoice</button>
        </div>
       
      </div>
     ))}

    </div>
    </>}

   <Footer/>

    </>
  )
}
