import React, { useEffect, useState } from 'react'

export default function Course() {
  const [data, setData] = useState([])
  const getData=async()=>{
    const response = await fetch("http://localhost:3000/api")
    const jsonResponse = await response.json()
    setData(jsonResponse.courses)
    // console.log(jsonResponse.courses)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <>
    <section id='course'>
    
    <div  className=' w-full px-5 sm:w-[700px] md:w-[1000px] mx-auto sm:py-16 md:py-20'>
      <h1 className='text-4xl sm:text-5xl md:text-5xl text-white text-center pb-16'>What You'll Learn with us</h1>
        <div k className='p-5 space-y-5  grid justify-center   sm:space-y-0 sm:grid sm:grid-cols-2  md:grid md:grid-cols-3  gap-10 '>
          {data.map((item) =>(
            <div key={item._id} className='bg-neutral-900 h-[220px] w-[300px] rounded-3xl '>
          <img src={item.image} alt="" className=' w-full rounded-t-3xl'/>
          <div className='bg-blue-600 p-1 rounded-lg w-20 text-center mx-5 my-2  font-serif text-sm  '>
            <a href={item._id} >Buy Now</a>
          </div>
        </div> 
          ))}
     </div>
    
    </div>
    
    </section>
    
    </>
  )
}
