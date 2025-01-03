const {Router} = require("express");
const { Course } = require("../database/db");

const courseRouter = Router()

courseRouter.get("/",async(req, res) =>{
    try{
        const allCourse = await Course.find({})
        return res.json({
            courses : allCourse
        })
    }catch(error){
        res.status(404).json({
            message: "Course not found",
            error: error.message
        })
    }
})
courseRouter.get("/starter", async(req, res) =>{
    try{
        const item = await Course.find({}).limit(3)
        return res.json({
            item: item
        })

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
courseRouter.get("/:id",async(req, res) =>{
    const id = req.params.id;
    try{
        const course = await Course.findById(id)
       if(!course){
           return res.json({
               message: "No data available with this id"
           })
       }
       return res.json({
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