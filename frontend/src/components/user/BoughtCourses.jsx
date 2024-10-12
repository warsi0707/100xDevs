import React, { useEffect } from 'react'

export default function Purchased() {
  const authenticate =async()=>{
    const response = await fetch("http://localhost:3000/api/user/check-aut")
    const result = await response.json()
    console.log(result)
  }
  useEffect(()=>{
    authenticate()
  },[])
  return (
    <>
      <h1>courses</h1>
    </>
  )
}
