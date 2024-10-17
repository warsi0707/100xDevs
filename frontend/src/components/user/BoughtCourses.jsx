import React, { useEffect, useState } from 'react'
import Footer from '../course/Footer'

export default function Purchased() {
  const [error, setError] = useState("")
  const [courses, setCourses] = useState([])



  const Courses =async()=>{
    try{
      const response = await fetch("http://localhost:3000/api/user/courses",{
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
    <div className='bg-black h-full m-0 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-5  pt-10'>
    {courses.map((course) =>(
      <div key={course._id} className=' h-72 w-96 p-0 bg-black  mx-auto rounded-xl'>
        <div className="img">
          <img className='rounded-xl' src={course.image} />
        </div>
        <div className='text-white mt-4 md:mt-10 text-xl'>
          <h1>{course.title}</h1>
        </div>
      </div>
     ))}

    </div>
    <Footer/>
    </>
  )
}
