import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../course/Footer";
import { redirect } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const Signup = async (e) => {
    e.preventDefault();
    try {
      const addUser = { username, email, password, fullName };
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(addUser),
      });
      const result = await response.json();
      if(response.status === 404) {
        setError(result.message);
        setTimeout(() => {
          setError("")
          setUsername("");
          setEmail("");
          setPassword("");
          setFullName("");
          setError("");
        }, 2000);
        setTimeout(() => {
          navigate("/signup",{state: {message: "Error"}});
        }, 3000);
       
      }else{
      setUsername("");
      setEmail("");
      setPassword("");
      setFullName("");
      setError("");
      setMessage(result.message)
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
    <div className="bg-black h-screen ">
  
      {message && (
        <div className="bg-green-500 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-5 mx-auto py-5 rounded-2xl text-white text-center text-xl">
          {message}
        </div>
      )}

      <div>
        {error && (
          <div className="bg-red-500 w-[350px] px-2 sm:w-[500px] md:w-[500px] p-2 mx-auto py-2 rounded-2xl text-white text-center text-xl">
            {error}
          </div>
        )}
      </div>

      <div className=" p-10 w-full  md:mx-auto md:w-[550px]   ">
        <div className="bg-gray-300  rounded-2xl p-5">
          <h1 className="text-center text-2xl">Sign into your account</h1>
          <div>
            <form onSubmit={Signup}>
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 2, width: "45ch" } }}
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name"
                  variant="outlined"
                />
              </Box>
              <div className="btn mt-10">
                <Stack>
                  <Button type="submit" size="medium" variant="contained">
                    Signup
                  </Button>
                </Stack>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}
