import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { IoSearchSharp } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import Signup from "../admin/Signup";
import Signin from "../admin/Signin";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated, username, setUserame } =
    useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const response = await fetch(
        "https://one00xdevs-cx2s.onrender.com/api/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setIsAuthenticated(false);
        setMessage(result.message);
        setTimeout(() => {
          navigate("/");
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      setError("Logout failed, please try again"),
        console.error("Logout failed ", error);
    }
  };

  const handleSignup = () => {
    setSignup(!signup);
  };
  const handleSignin = () => {
    setSignin(!signin);
  };
  const handleMenu = () => {
    setMenu(!menu);
  };
   return (
    <>
      <nav className="w-full bg-white text-gray-700 p-2 flex justify-between border-b-2 shadow-md  ">
        <div className="logo text-2xl text-black ml-10">
          <img src="/logo.png" width={50} height={40} alt="" />
        </div>
        <div className="right flex gap-5 mr-10">
          {/* <div className="hidden sm:flex">
              <form action="" className="">
                <input type="text" placeholder="type here to search..." className="border-2 text-xl p-2 text-left px-2 rounded-l-3xl" />
                <button className="p-3 text-lg  border-2 rounded-r-3xl hover:bg-gray-300"><IoSearchSharp/></button>
              </form>
            </div> */}

          <div className="md:flex hidden  gap-2">
            <div className="text-xl flex justify-center mt-3 gap-2">
              <NavLink to={"/#"} className="gap-1"><i className="fa-solid fa-house"></i>Home</NavLink>
              <NavLink to={"/course"}> <i className="fa-solid fa-graduation-cap"></i>Cource</NavLink>
            </div>
            {!isAuthenticated?<>
            <button onClick={handleSignup} className="bg-blue-600 px-6   text-md rounded-full text-white hover:bg-blue-700">
            Signup
            </button>
            <button onClick={handleSignin} className="bg-blue-600 px-6 text-md rounded-full text-white hover:bg-blue-700">
              Login
            </button>
            </>: <>
            <NavLink to={"/purchased"}  className="mt-3 text-xl"><i className="fa-solid fa-download"></i>Purchased</NavLink>
           
            <button onClick={Logout} className="bg-blue-600 px-6 text-md rounded-full text-white hover:bg-blue-700">
              Logout
            </button>
            </>}
          </div>
        </div>
        <div className="flex gap-2 text-center mt-2 mr-5 md:hidden">
          {/* <a href="" className="text-3xl text-gray-500">
            <IoSearchSharp />
          </a> */}
          <button onClick={handleMenu} className="text-3xl text-gray-500">
            <IoChevronForwardCircleOutline />
          </button>
          
        </div>
      </nav>
      {menu?<>
        <div className="w-full  mx-auto md:hidden mt-10 ">
          <div className="bg-gray-500 p-5 w-auto  sm:w-96 mx-auto rounded-xl  text-black flex flex-col gap-2 justify-center items-center">
            <NavLink to={"/#"} className="w-full hover:bg-indigo-300 p-1 text-center rounded-xl text-xl flex justify-center gap-2"><i className="fa-solid fa-house pt-1"></i>Home</NavLink>
            <NavLink to={"/course"} className="w-full hover:bg-indigo-300 p-1 text-center rounded-xl text-xl flex justify-center gap-2"><i className="fa-solid fa-graduation-cap"></i>Course</NavLink>
            {isAuthenticated?<>
              <NavLink to={"/purchased"} className="w-full hover:bg-indigo-300 p-1 text-center rounded-xl text-xl flex justify-center gap-2"><i className="fa-solid fa-download"></i>Purchased</NavLink>
             <button onClick={Logout} className="w-full bg-red-500 hover:bg-red-600 p-1 text-center rounded-xl text-xl flex justify-center gap-2">Logout</button>
            
            </>
            :
            <>
            <button onClick={handleSignup} className="w-full bg-yellow-500 hover:bg-yellow-600 p-1 text-center rounded-xl text-xl flex justify-center gap-2">Signup</button>
            <button onClick={handleSignin} className="w-full  bg-green-500 hover:bg-green-600 p-1 text-center rounded-xl text-xl flex justify-center gap-2" > <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">

  </svg>Signin</button>
            </>
            }
            
            
           
          </div>
        </div>
      </>: ""}
      
      {signup?<Signup/>: ""}
      {signin? <Signin/>: ""}
    </>
  );
}
