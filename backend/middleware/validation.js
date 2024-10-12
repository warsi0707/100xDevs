const {z} = require("zod")

function signupValidation(req, res, next) {
        const requireBody = z.object({
            username: z.string().min(3).max(50),
            email : z.string().min(3).max(50).email(),
            password : z.string().min(3).max(50),
            fullName: z.string().min(3).max(50)
        })
        const parseValidateData = requireBody.safeParse(req.body)
        res.json({
            message: parseValidateData.error
        })
        next()
    }




module.exports = {
    signupValidation
}