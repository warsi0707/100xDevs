import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const Signin =async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:3000/api/user/signin",{
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
      }else{
      setUsername("")
      setPassword("")
      setMessage("")
      setError("")
      setMessage(result.message)
      setTimeout(() => {
        navigate("/")
      }, 3000);
    }
    }catch(error){
      console.log("Login error", error)   
  }
}



  return (
    <>
   
    {message && (
        <div className="bg-green-500 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-5 mx-auto mt-5 rounded-2xl text-white text-center text-2xl">
          {message}
        </div>
      )}

      <div>
        {error && (
          <div className="bg-red-500 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-5 mx-auto mt-5 rounded-2xl text-white text-center text-2xl">
            {error}
          </div>
        )}
    </div>
      <div className='bg-purple-500 p-10 w-[550px] mx-auto mt-5 '>
       <div className='bg-white  rounded-2xl p-5'>
        <h1 className='text-center text-2xl'>Sign into your account</h1>
        <div>
          <form onSubmit={Signin}>
          <Box
              component="form"
              sx={{ '& > :not(style)': { m: 2, width: '45ch' } }}>
              <TextField id="outlined-basic" value={username} onChange={(e)=> setUsername(e.target.value)}  label="Username" variant="outlined" />
              <TextField id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" />
            
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
    </>
  )
}
