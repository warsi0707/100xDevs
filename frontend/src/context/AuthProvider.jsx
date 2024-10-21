import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export  function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUserame] = useState("")

    useEffect(()=>{
        const checkAuth =async()=>{
          try{
            const response = await fetch("https://one00xdevs-cx2s.onrender.com/api/user/auth-status",{
              method: "GET",
              credentials: 'include'
          })
          const result = await response.json()
          if(result.authenticated === true){
              setIsAuthenticated(true)
              setUserame(result.username)
          }else{
              setIsAuthenticated(false)
              
          }
          }catch(err){
            setIsAuthenticated(false)
          }
            
        }
        checkAuth()
    },[])
  return (
    <div>
      <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated,username, setUserame}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContext