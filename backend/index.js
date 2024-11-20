require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const { adminRouter } = require("./router/admin")
const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const cookieParser = require("cookie-parser")

const bodyParser = require("body-parser")
// const { required } = require('joi')
const PORT = process.env.PORT || 5000



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:["https://one00xdevs-1fe.onrender.com"],
    // origin:["http://localhost:5173"] , 
    credentials: true,  
}))

// app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)


const main =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Data base connected successfully")
        app.listen(PORT)
        console.log(`Server running on port  ${PORT}`)
        

    }catch(error){
        console.error(error)
       
    }  
}
main()

