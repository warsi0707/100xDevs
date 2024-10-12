import React from 'react'
import { NavLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

export default function StarterPage() {
  return (
    <>
      <div className='h-full bg-gray-950 text-gray-300 '>
        <div className='my md:w-[800px] py-20 px-10  md:py-36  flex justify-center mx-auto top-10 '>
            <div className='flex flex-col text-center space-y-10'>
                <h1 className='text-5xl'>Start Your Web and web3 Journey with us</h1>
                <h1 className='text-2xl text-neutral-500'>Join Our courses and get the firsthand knowledge about web adn web3</h1>
                <div>
                <button className=' bg-blue-700 text-xl w-40 p-3 rounded-full '>
               <button > <Link to='#course'>View Courses </Link></button>
                </button>
                </div>
            </div>
            
        </div>
        <div className="img mx-auto px-10  mb-24">
              <img src="/main.png" alt="" className=' mx-auto'/>
          </div>
        
    </div>
    </>
  )
}
