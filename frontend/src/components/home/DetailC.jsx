import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function DetailC() {
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {id} = useParams()
  try{
    const Data =async()=>{
      const response = await fetch(`https://one00xdevs-cx2s.onrender.com/api/course/${id}`,{
        method: "GET"
      })
      const result = await response.json()
      setLoading(true)
     if(response.ok){
      setLoading(false)
      setError("")
      setCourse(result.course)
     }
    }
    
    useEffect(()=>{
      Data()
    },[])
  }catch(err){
    setError(err)
  }
 
    const Buy =async()=>{
      try{
      const response = await fetch(`https://one00xdevs-cx2s.onrender.com/api/user/buy/${id}`,{
        method: "POST",
        credentials: "include"
      })
      const result = await response.json()
      if(response.ok){
        setError("")
        setMessage(result.message)
        setTimeout(() => {
          setMessage("")
          navigate("/purchased")
        }, 2000);
      }else{
        setError(result.message)
        setTimeout(() => {
          setError("")
        }, 2000);
      }
    }catch(err){
      setError(err)
    }
    }
 
 
  
  return (
    <>
    {message && (
        <div className="bg-green-500 my-2 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-3 mx-auto py-5 rounded-2xl text-black text-center text-2xl">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-500 my-2 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-3 mx-auto py-5 rounded-2xl text-black text-center text-2xl">
          {error}
        </div>
      )}
    <div className='bg-blue-800 w-full p-14 '>
     <h1 className='text-white text-4xl '>Complete Web Development + <br /> Devops + Blockchain Cohort</h1>
    </div>
    <div className='md:flex space-y-reverse   md:justify-evenly gap-20 mx-20 my-5'>
        <div className='w-96 h-96 '>
        </div>
        <div className=" md:w-[1000px] mx-auto md:-translate-y-36">
          {loading ? (
            <>
              
            </>
          ) : (
            <div className="card w-72 md:w-96 h-auto md:mx-auto border-2 border-gray-400 rounded-2xl">
              <img src={course.image} className="rounded-t-2xl" />
              <div className="p-2">
                <h1 className="text-center mt-3 text-black font-bold text-xl">
                  {course.title}
                </h1>
                <div className="prices flex justify-between mx-5 mt-8">
                  <p>
                    <i className="fa-solid fa-indian-rupee-sign"> &nbsp;</i>
                    {course.price}
                  </p>
                  <p>16 off</p>
                </div>
                <div className="btn mt-5">
                  <button onClick={Buy} className="bg-blue-600 w-full rounded-3xl py-2 text-lg text-white mb-2  hover:bg-blue-800 delay-200">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
             )}
         
        </div>
    </div>
    </>
  )
}
