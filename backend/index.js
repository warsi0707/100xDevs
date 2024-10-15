require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const { adminRouter } = require("./router/admin")
const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const cookieParser = require("cookie-parser")

// const { required } = require('joi')

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}))

app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api", courseRouter)

const main =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Data base connected successfully")
        app.listen(3000)
        console.log("App listing on port 3000")
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
}
main()

