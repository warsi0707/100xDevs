const MONGO_URL = process.env.MONGO_URL
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
const USER_JWT_SECRET = process.env.USER_JWT_SECRET
const REFRESH_JWT_TOKEN = process.env.REFRESH_JWT_TOKEN
const PORT = process.env.PORT
module.exports = {
    MONGO_URL : MONGO_URL,
    ADMIN_JWT_SECRET : ADMIN_JWT_SECRET,
    USER_JWT_SECRET : USER_JWT_SECRET,
    REFRESH_JWT_TOKEN: REFRESH_JWT_TOKEN,
    PORT: PORT

}