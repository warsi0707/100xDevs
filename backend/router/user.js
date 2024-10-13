const { Router } = require("express");
const { User, Course } = require("../database/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { USER_JWT_SECRET } = require("../config")
const { userAuth } = require("../middleware/authentication")

const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
    const { username, email, password, fullName } = req.body;
    try {
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
        return  res.json({
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
        if(!foundUser){
            return res.status(404).json({
                message: `${username} not found, please signup `
            })
        }
        const data = foundUser && foundUser.password ? await bcrypt.compare(password, foundUser.password) : false;
        // const comparePassword = await bcrypt.compare(password, foundUser.password)
        if (foundUser && foundUser) {
            const token = jwt.sign({ //seeding the user info in the cookies, this information available on every authenticated request
                username: foundUser.username,
                email: foundUser.email,
                userId: foundUser._id,
                fullName: foundUser.fullName
            }, USER_JWT_SECRET)
            res.cookie("token", token, {
                domain: "https://e100xdevs.netlify.app",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "none",
                
                
            })
            res.json({
                message: `${username} sign in,`,
                token: token,
            })
        } else {
            res.json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

userRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { username, fullName,token } = req.user;
        if (!user && !token) {
            return res.status(404).json({
                message: "You are not authenticated, Please login"
            })
        }
        res.json({
            message: "User Information",
            username: username,
            fullName: fullName,
            token : token
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

userRouter.post("/buy/:coursId", userAuth, async (req, res) => {
    const { coursId } = req.params; //req course id from the params
    try {
        const { userId } = req.user //req userid from the cookies middleware
        const user = await User.findById(userId) //find the user id in db.
        if (!user) {
            return res.json({
                message: "User not found, please login"
            })
        }
        const purchase = user.purchased.push(coursId) //if user found push the courseId in the user purchased table
        await user.save()
        res.json({
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
    const { userId } = req.user // calling user id from the cookies
    try {
        const user = await User.findById(userId).populate("purchased") //inside user model find the user with the id and users purchases table
        if(!user){
            return res.status(404).json({
                message: "User not found, please login"
            })
        }
        const result = user.purchased;
        res.json({
            message: "Your purchased course",
            purchased: result
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

userRouter.post("/logout", userAuth, async (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Loged out"
    })
})

module.exports = {
    userRouter
}