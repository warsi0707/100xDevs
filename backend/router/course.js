const {Router} = require("express");
const { Course } = require("../database/db");

const courseRouter = Router()

courseRouter.get("/",async(req, res) =>{
    try{
        const allCourse = await Course.find({})
        res.json({
            courses : allCourse
        })
    }catch(error){
        error: error
    }
})

courseRouter.get("/:id",async(req, res) =>{
    const id = req.params.id;
    try{
        const course = await Course.findById({
            _id:id
       })
       if(!course){
           res.json({
               message: "No data available with this id"
           })
       }
       res.json({
           course : course
       })
    }catch(error){
        res.status(404).json({
            message : error.message
        })
    }
    
})

module.exports = {
    courseRouter
}