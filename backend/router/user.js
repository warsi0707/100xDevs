const { Router } = require("express");
const { User, Course } = require("../database/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { USER_JWT_SECRET,REFRESH_JWT_TOKEN,refreshToken,NODE_ENV  } = require("../config")
const { userAuth } = require("../middleware/authentication");


const userRouter = Router()


userRouter.post("/signup", async (req, res) => {

    try {
        const { username, email, password, fullName } = req.body;
        const exisUser = await User.findOne({
            username: username
        })
        if (exisUser) {
            return res.status(404).json({
                message: `User already exist with ${username} Please login`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPassword,
            fullName: fullName
        })
        return res.json({
            message: `${fullName}, Signup successfully`,
            user: newUser
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundUser = await User.findOne({
            username: username
        })
       data = foundUser && foundUser.password ? await bcrypt.compare(password, foundUser.password) : false;
        if(!data){
            return res.status(404).json({
                message: "Username or password not correct"
            })
        }
      
        // const comparePassword = await bcrypt.compare(password, foundUser.password)
        if (foundUser && foundUser) {
            const accessToken = jwt.sign({ //seeding the user info in the cookies, this information available on every authenticated request
               id : foundUser._id
            }, USER_JWT_SECRET,{expiresIn: '15m'})

            const refreshToken = jwt.sign({
                id : foundUser._id
            },REFRESH_JWT_TOKEN,{expiresIn: "7d"})

            res.cookie("refreshToken", refreshToken,{
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
                secure:process.env.NODE_ENV==="Development"?false:true,
            })
            return res.json({
                message: `${username} sign in,`,
                token: accessToken,
                refreshToken : refreshToken
            })
        } else {
            return res.json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/buy/:coursId", userAuth, async (req, res) => {
    const { coursId } = req.params; //req course id from the params
    const  id  = req.user
    try {
        // const foundCourse = await User.findById(coursId).populate("purchased")
        const foundCourse = await User.findOne({
            _id:id, 
            purchased: {$in: [coursId]}})
        if(foundCourse){
            return res.status(404).json({
                message: "You have already bought this course"
            })
        }
        const user = await User.findById(id) //find the user id in db.
        if (!user) {
            return res.json({
                message: "User not found, please login"
            })
        }
        const purchase = user.purchased.push(coursId) //if user found push the courseId in the user purchased table
        await user.save()
        return res.json({
            message: "You have bought this course",
            purchase: purchase
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.get("/courses", userAuth, async (req, res) => {
    const  id  = req.user // calling user id from the cookies
    try {
        const user = await User.findById(id).populate("purchased") //inside user model find the user with the id and users purchases table
        if(!user){
            return res.status(404).json({
                message: "User not found, please login"
            })
        }
        const result = user.purchased;
        if(result){
            return res.json({
                message: "Your purchased course",
                purchased: result
            })
            
        }else{
            return res.json({
                message:"No courses available, please buy"
            })
        }
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
userRouter.get("/auth-status",userAuth,async(req,res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
       
        if(!refreshToken){
            return res.status(404).json({
                authenticated: false
            })
        }
        const decode = jwt.verify(refreshToken, REFRESH_JWT_TOKEN)
       
        const user = await User.findById(decode.id)
        if(!user){
            return res.status(404).json({
                authenticated: false,
                username: user.username
            })
        }
        return res.json({
            authenticated: true

        })
        
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/logout", userAuth, async (req, res) => {
    res.clearCookie("refreshToken",{
        httpOnly: true,
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    })
    res.json({
        message: "Loged out"
    })
})

module.exports = {
    userRouter
}