import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const checkAuth = async () => {
    try{
      const response = await fetch("https://one00xdevs-cx2s.onrender.com/api/user/profile",{
        method: "GET",
        credentials: "include",
        
      });
      const result = await response.json()
      setUsername(result.username.username)
      if(result.login === true){
        setIsAuthenticated(true)
      }else{
        setIsAuthenticated(false)
      }
      if(response.ok){
        const result = await response.json()
        setUsername(result.username)
      }else{
        setIsAuthenticated(false)
      }
     
    }catch(error){
      setError("Failed to authenticate, Please try again"),
      console.error("Error: ",error)
    }
  };
    useEffect(() => {
      checkAuth();
    }, []);
  

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
                <Link to="/signup">Signup</Link>
              </h1>
              <h1 className="transition delay-200 hover:underline  hover:text-blue-600">
                <Link to="/signin">Login</Link>
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
          <Link to="/signin">Login</Link>
          )}
          </div>
        </div>
      </div>
      <div className="bg-gray-950">
      {message && <div className="bg-red-800 p-2 w-96 mx-auto text-center text-xl text-white rounded-xl">{message}</div> }
      {/* {error &&  <div className="bg-green-800 p-2 w-96 mx-auto text-center text-xl text-white rounded-xl">{error}</div>} */}
      </div>
    
    </>
  );
}
