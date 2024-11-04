import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";


export default function Navbar() {
  const {isAuthenticated, setIsAuthenticated,username, setUserame} = useContext(AuthContext)
  const [menu, setMenu] = useState(false);
  const [signup, setSignup] = useState(false)
  const [signin, setSignin] = useState(false)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const Logout = async () => {
    try{
      const response = await fetch("https://one00xdevs-cx2s.onrender.com/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json()
      console.log(result)
      if(response.ok){
        setIsAuthenticated(false)
        setMessage(result.message)
        setTimeout(() => {
          navigate("/")
          setMessage("")
        }, 2000);
        
      }
    }catch(error){
      setError("Logout failed, please try again"),
      console.error("Logout failed ",error)
    }
  };

const handleSignup =()=>{
  setSignup(!signup)
}
const handleSignin =()=>{
  setSignin(!signin)
}
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <> 
      <div className="bg-black text-gray-200 text-xl p-6 sm:p-4 md:p-4 font-serif">
        <div className="flex justify-between ">
          <div className="logo mt-0 sm:mt-5 md:mt-6">
            <NavLink to="/">eCourse</NavLink>
          </div>
          <button
            className=" bg-neutral-900 rounded-full mr-5 text-xl py-3 px-5 flex items-center sm:hidden md:hidden"
            onClick={handleMenu}
          >
            {menu ? <RxCross1 /> : <GiHamburgerMenu />}
          </button>

          <div className="hidden center-nav sm:flex md:flex bg-neutral-950 gap-5 p-5 rounded-full ">
            <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
              <Link to="/#course">Course</Link>
            </h1>
            <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
              <Link>Testomonials</Link>
            </h1>
            <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
              <Link>FAQs</Link>
            </h1>
          </div>


          <div className="login hidden bg-neutral-900 sm:flex pt-5 rounded-full text-lg  px-8 ">
            <div className="flex gap-5">
              
              {isAuthenticated?  (
                <>
                <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
                <h1>{username}</h1>
              </h1>
                <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
                <Link to="/purchased">Your Courses</Link>
              </h1>
              
              <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
                <button onClick={Logout}>Logout</button>
              </h1> </>
              ) :(
              <>
              <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
                <Link onClick={handleSignup}>Signup</Link>
              </h1>
              <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
                <Link onClick={handleSignin}>Login</Link>
              </h1>
              </>
              )}
              <></>
            </div>
          </div>

          
        </div>
      </div>
     
      <div className={menu ? "md:hidden sm:hidden" : "hidden"}>
        <div className="w-full flex  justify-center  md:hidden mx-auto top-24  fixed ">
          <div className="backdrop-blur-md bg-neutral-900/30 grid justify-items-center  space-y-2 text-lg mx-10 w-[600px] text-white text-center  bg-neutral-900  py-5 gap-2 rounded-3xl  cursor-pointer">
            <Link to="/">Course</Link>
            <Link>Testomonials</Link>
            <Link>FAQs</Link>
            {isAuthenticated? (
              <>
            <h1>{username}</h1>
            <Link to="">Your courses</Link>
            <button  onClick={Logout}>Logout</button>
            
            </>
          ): (
            <>
            <Link onClick={handleSignup}>Signup</Link>
          <Link onClick={handleSignin}>Login</Link>
          </>
          )}
          </div>
        </div>
      </div>
      <div className="bg-gray-950">
      {message && <div className="bg-red-800 p-2 w-96 mx-auto text-center text-xl text-white rounded-xl">{message}</div> }
      {/* {error &&  <div className="bg-green-800 p-2 w-96 mx-auto text-center text-xl text-white rounded-xl">{error}</div>} */}
      </div>

      {signup? <>
      <div id="#signup" className="bg-gray-950  mx-auto pt-10  ">
      <div className='w-[350px] sm:w-[550px] md:w-[600px] bg-neutral-900/30  backdrop-blur-md s mx-auto p-5 rounded-2xl text-black md:mx-auto'>
        <h1 className="text-white text-3xl text-center">Signup</h1>
      <form action="">
        <div className="inputs flex flex-col space-y-3 p-2 sm:p-5 md:p-5">
          <label htmlFor="" className="text-white text-xl">Username</label>
          <input type="text" className="p-1 rounded-xl text-start text-2xl sm:p-2 md:p-2"/>
          <label htmlFor="" className="text-white text-xl">Username</label>
          <input type="text" className="p-1 rounded-xl text-start text-2xl sm:p-2 md:p-2"/>
          <label htmlFor="" className="text-white text-xl">Username</label>
          <input type="text" className="p-1 rounded-xl text-start text-2xl sm:p-2 md:p-2"/>
          <label htmlFor="" className="text-white text-xl">Username</label>
          <input type="text" className="p-1 rounded-xl text-start text-2xl sm:p-2 md:p-2"/>
        
        </div>
        <button className="btn w-full mt-5 bg-gray-700 text-center p-1 text-2xl rounded-2xl text-white hover:bg-gray-800">Signup</button>
      
        </form>
      </div>
      

      </div>
      </>: ""}
      {signin? <>
      <div className="bg-gray-950  mx-auto pt-10  ">
      <div className='w-[350px] sm:w-[550px] md:w-[600px] bg-neutral-900/30  backdrop-blur-md s mx-auto p-5 rounded-2xl text-black md:mx-auto'>
        <h1 className="text-white text-3xl text-center">Signin</h1>
      <form action="">
        <div className="inputs flex flex-col space-y-3 p-2 sm:p-5 md:p-5 text-white">
          <label htmlFor="" className="text-white text-xl">Username</label>
          <input type="text" className="p-1 rounded-xl text-black text-start text-2xl sm:p-2 md:p-2"/>
          <label htmlFor="" className="text-white  text-xl">Username</label>
          <input type="text" className="p-1 rounded-xl text-black text-start text-2xl sm:p-2 md:p-2"/>
          <h1 className="text-lg">Dont have an account  <a href="/signup" className="text-blue-600 underline">Signup</a></h1>
          
          <button className="btn bg-gray-700 text-center p-1 text-2xl rounded-2xl text-white hover:bg-gray-800">Signin</button>
        </div>
      
        </form>
      </div>
      

      </div>
      </>: ""}
    </>
  );
}
