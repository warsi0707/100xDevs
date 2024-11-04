import React from 'react'
import { useState } from 'react';


export default function useSignup(url) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const Signup =async(e)=>{
        e.prevntDefault()
        try{
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({username, email, password, fullName})
            })
            const result = await response.json()
            if(response.ok){
                setUsername("");
                setEmail("");
                setPassword("");
                setFullName("");
                setError("");
                setMessage(result.message)
                setTimeout(() => {
                    navigate("/",);
                }, 3000);
            }
        }catch(err){
            setError(err)
        }
        
    }

  return {
    
  }
}
