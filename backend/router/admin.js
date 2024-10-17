const {Router} = require("express");
const { Admin, User, Course } = require("../database/db");
const bcrypt = require('bcrypt');
const adminRouter = Router()
const jwt = require("jsonwebtoken")
const {adminAuth} = require("../middleware/authentication")

const { ADMIN_JWT_SECRET } = require("../config")

adminRouter.post("/signup", async(req, res) =>{ 
    const {username, email, password, fullName} =req.body;

    try{
        const existingAdmin = await Admin.findOne({
            $or : [{username}, {email}] // finding username or email in database, if anyone matched in db then it return error
            // username: username,
            // email: email
        })
        if(existingAdmin){
            res.status(404).json({
                message: "Admin already exist with this username or email"
            })
        } 
            const hashPassword = await bcrypt.hash(password, 5)
            const newAdmin = await Admin.create({
            username: username,
            email: email,
            password :hashPassword,
            fullName: fullName
        })
        return res.json({
            message: "Admin sign up successfully",
            admin : newAdmin
        })
        
    }catch(error){
        res.status(404).json({
            msg: error.message
        })
    }
})
adminRouter.post("/signin",async(req, res) =>{
    const {username, password} = req.body;
    try{
        const findAdmin = await Admin.findOne({
            username : username
        })
        
        const data = findAdmin && findAdmin.password ? await bcrypt.compare(password, findAdmin.password) : false;
        // const comparePassword =  bcrypt.compare(password, findAdmin.password)
        if(findAdmin && data){
            const token = jwt.sign({
                username: findAdmin.username
            },ADMIN_JWT_SECRET)
            //if user signin, then give them a token that is stored in the cookies
            res.cookie("token",token,{
                httpOnly: true
            })
            return res.json({
                message : "Admin sign in",
                token : token,
                admin: findAdmin
            })
        }else{
            return res.json({
                message: "Admin not found in database please sign up"
            })
        }
    }catch(error){
       res.status(404).json({
        message: error.message
       })
    }
    
})
adminRouter.post("/course",adminAuth,async(req, res) =>{
    const { title,description, content, price, image,validity} = req.body;
    try{
        const addCourse = await Course.create({
            title: title,
            description: description,
            content: content,
            price : price,
            image: image,
            validity: validity
        })
        return res.status(202).json({
            message: "Course added successfully",
            newCourse : addCourse
        })

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
adminRouter.put("/course/:id",adminAuth, async(req, res) =>{
    const {id} = req.params;
    const { title, content, price, image} = req.body;
    try{
        const course = await Course.findByIdAndUpdate({
            _id: id
        },{
            title: title,
            content: content,
            price: price,
            image: image
        })
        return res.json({
            message : "Course updated",
            updatedCourse: course
        })
    }catch(error){
        res.status(404).json({
            message : error.message
        })
    }
    
})
adminRouter.delete("/course/:id",adminAuth,async(req, res) =>{
    const {id} = req.params;
    try{
        const deletedCourse = await Course.findByIdAndDelete({
            _id: id
        })
        return res.json({
            message: "Course deleted successfully",
            deleted: deletedCourse
        })
    
    }catch(error){
        res.status(404).json({
            message : error.message
        })
    }
       
    
})

adminRouter.post("/logout",adminAuth, async(req, res) =>{
    try{
        res.clearCookie("token")
        return res.json({
            message: "Loged out"
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
      
    }
})
module.exports = {
    adminRouter
}