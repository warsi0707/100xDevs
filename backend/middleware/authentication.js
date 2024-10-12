const jwt = require("jsonwebtoken")
const { ADMIN_JWT_SECRET } = require("../config")
const { USER_JWT_SECRET } = require("../config")


function adminAuth(req, res, next){
    const token = req.cookies.token; //this cookies send in every request to verify the admin
    try{
        const decoded = jwt.verify(token, ADMIN_JWT_SECRET)
        if(decoded){
            next()
        }
    }catch(error){
        res.status(404).json({
            message: "You are not authorised"
        })
    }
    
}

function userAuth(req, res, next){
    const token = req.cookies.token
    if(!token){
        return res.status(404).json({message: "Not authenticated"})
    }
    try{
        const decoded = jwt.verify(token,USER_JWT_SECRET)
        if(decoded){
            req.user = decoded
            next()
        }
    }catch(error){
        res.status(404).json({
            message: "You are not log in please log in"
        })
    }
}

module.exports = {
    adminAuth,
    userAuth
}