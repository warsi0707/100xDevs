import React, { useState } from 'react'
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  
  return (
    <>
    <footer className='bg-purple-700 h-[400px] flex justify-center items-center px-5 gap-5  sm:gap-20 md:gap-44 text-white'>
        <div className='flex flex-col text-start space-y-8'>
            <h1 className='text-3xl '>eCourse</h1>
            <p className='w-52 sm:w-80 md:w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus velit eius unde eos tenetur quae praesentium aperiam ipsam, illum consequuntur.</p>
        </div>
        <div className='text-center mb-12 space-y-10'>
            <h1 className='text-2xl '>get in touch</h1>
            <div className='flex text-2xl gap-3 md:gap-5 sm:text-4xl md:text-4xl'>
              <a href="" className='hover:bg-red-700 rounded-xl'><FaInstagram/></a>
                <a href=""className='hover:bg-red-700 rounded-xl' ><CiLinkedin/></a>
                <a href="" className='hover:bg-red-700 rounded-xl'><CiTwitter/></a>
            </div>
        </div>

    </footer>
      
    </>
  )
}
