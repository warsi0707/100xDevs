import React from 'react'
import { useRouteError } from 'react-router-dom'


export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)
  return (
    <div className='bg-black h-[400px] text-white'>
        <div className='top-10 grid justify-self-center'>
        <div className='bg-gray-500 rounded-2xl  w-[500px] p-2 mx-auto  items-center grid grid-rows-3 justify-center text-center text-2xl'>
            <div>
            <h1 className='text-5xl text-red-900'>Opps!</h1>
            </div>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <h1>{error.statusText}</h1>
                <h1>{error.message}</h1>
            </p>
        </div>
        </div>
      
    </div>
  )
}
