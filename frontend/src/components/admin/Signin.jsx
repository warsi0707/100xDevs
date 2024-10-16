import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router-dom";
import Footer from '../course/Footer';


export default function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const Signin =async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch("https://one00xdevs-cx2s.onrender.com/api/v1/user/signin",{
        method : "POST",
        credentials: 'include',
        headers : {
          "Content-Type": "application/json"
        },
        
        body: JSON.stringify({username, password})
      })
      const result =await response.json()
      if(response.status === 404){
        setError(result.message)
        setTimeout(() => {
          setError("")
        }, 3000);
      }else{
      setUsername("")
      setPassword("")
      setMessage("")
      setError("")
      setMessage(result.message)
      setTimeout(() => {
        navigate("/",{state: {message: `welcome ${username}`}})
      }, 2000);
      
    }
    }catch(error){
      console.log("Login error", error)   
  }
}
  return (
    <>
     <div className="bg-black h-screen ">
   
    {message && (
        <div className="bg-green-500 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-5 mx-auto py-5 rounded-2xl text-white text-center text-2xl">
          {message}
        </div>
      )}

      <div>
        {error && (
          <div className="bg-red-500 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-5 mx-auto py-5 rounded-2xl text-white text-center text-2xl">
            {error}
          </div>
        )}
    </div>
      <div className='p-10 w-[550px] mx-auto pt-10 '>
       <div className='bg-white  rounded-2xl p-5'>
        <h1 className='text-center text-2xl'>Sign into your account</h1>
        <div>
          <form onSubmit={Signin}>
          <Box
              component="form"
              sx={{ '& > :not(style)': { m: 2, width: '45ch' } }}>
              <TextField id="outlined-basic" value={username} onChange={(e)=> setUsername(e.target.value)} type='text' label="Username" variant="outlined" />
              <TextField id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} type='password' label="Password" variant="outlined" />
            
          </Box>
        <div className="btn mt-10">
          <Stack>
                <Button size='medium' type='submit' variant="contained" >Signin</Button>
            </Stack>
       </div>
       </form>
        
        </div>
        <h1 className='ml-5 my-3'>Dont have an account? <a href="/signup" className='hover:underline text-blue-700'>Signup</a></h1>
       </div>
      </div>
      </div>
      <Footer/>
    </>
  )
}
