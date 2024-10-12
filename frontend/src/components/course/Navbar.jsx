import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  

 
    useEffect(() => {
      const checkAuth = async () => {
        try{
          const response = await fetch("http://localhost:3000/api/user/profile",{
            credentials: "include"
          });
          if(response.ok){
            setIsAuthenticated(true)
          }else{
            setIsAuthenticated(false)
          }
         
        }catch(error){
          setError("Failed to authenticate, Please try again"),
          console.error("Error: ",error)
        }
      };
      checkAuth();
    }, []);
  

  const Logout = async () => {
    try{
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if(response.ok){
        setIsAuthenticated(false)
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
                <Link to="#">Your Courses</Link>
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
            <button  onClick={Logout}>Logout</button>
            <Link to="">Your courses</Link>
            </>
          ): (
          <Link to="/signin">Login</Link>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
