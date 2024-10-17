const jwt = require("jsonwebtoken")
const { ADMIN_JWT_SECRET, REFRESH_JWT_TOKEN } = require("../config")
const { USER_JWT_SECRET } = require("../config");


function adminAuth(req, res, next) {
    const token = req.cookies.token; //this cookies send in every request to verify the admin
    try {
        const decoded = jwt.verify(token, ADMIN_JWT_SECRET)
        if (decoded) {
            next()
        }
    } catch (error) {
        res.status(404).json({
            message: "You are not authorised"
        })
    }
}


function userAuth(req, res, next) {
    const refreshToken = req.cookies.refreshToken
    try {
        if (!refreshToken) {
            return renewToken(req, res)
            next()
        }
        const decoded = jwt.verify(refreshToken, REFRESH_JWT_TOKEN)
        if (decoded) {
            req.username = decoded.username
            next()
        } else {
            return res.status(404).json({
                message: "Not authenticated"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "You are not log in please log in"
        })
    }
}

const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.json({
            message: "Not authenticated"
        })
    }
    const decoded = jwt.verify(refreshToken, REFRESH_JWT_TOKEN)
    if (decoded) {
        const newAccessToken = jwt.sign({
            username: decoded.username
        }, USER_JWT_SECRET, { expiresIn: "15m" })
        res.cookies("accessToken", newAccessToken, { 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
        })
        next()
    } else {
        res.status(404).json({
            message: "Not authentiacated"
        })
    }
}

module.exports = {
    adminAuth,
    userAuth
}