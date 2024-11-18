import React, { useState } from 'react'
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  
  return (
    <>
    <footer className='bg-blue-200 p-5 space-y-2 md:flex  justify-between w-[500px] px-20 pt-10 md:w-[1100px] mx-auto mt-10 rounded-t-xl pb-10'>
      <div className="logo">
        <img src="/logo.png" className='flex justify-items-center' width={80} height={80} alt="" />
      </div>  
      <div className="inks">
        <h1 className='text-black font-bold text-xl '>Quicks Links</h1>
        <div className='flex flex-col mt-5 underline text-blue-700'>
        <a href="">Contact</a>
        <a href="">Terms and Conditions</a>
        <a href="">Privacy Policy</a>
        </div>
      </div>
      <div className="apps">
        <h1>Download app</h1>
      </div>

    </footer>
      
    </>
  )
}
