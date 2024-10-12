const { string } = require("joi");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const AdminSchema = new mongoose.Schema({
    username: {type: String, unique: true, required:true},
    email : {type: String, unique: true},
    password: {type:String, required:true},
    fullName: String
})
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true,required:true},
    email : String,
    password: {type:String, required:true},
    fullName: String,
    purchased : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
})
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    price: Number,
    image: String,
    validity: String
})

const Admin = mongoose.model("Admin", AdminSchema)
const User = mongoose.model("User", UserSchema)
const Course = mongoose.model("Course", CourseSchema)

module.exports = {
    Admin,
    User,
    Course
}