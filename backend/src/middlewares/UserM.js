
require("dotenv").config()
import db from "./../models/index.js"
const nonSecurePaths = ['/login', '/register', '/logout', '/community'];
import UserU from "./../utilities/JwtU.js"
import JwtU from "./../utilities/JwtU.js"
const checkUserJWT = async (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.token) {
        let token = cookies.token;
        let decoded = UserU.verifyToken(token);
        if (decoded) {
            let user = await db.User.findOne(
                { where: { email: decoded.email } }
            )
            if (user && user.username && user.email) {
                let payload = {
                    username: user.username,
                    email: user.email,
                }
                let recreateToken = JwtU.createJWT(payload)
                req.user = payload;
                req.token = recreateToken;
            }
            else {
                req.user = null;
                req.token = null;
            }
            return next();
        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: null
            })
        }
    }

    else {
        return res.status(401).json({
            EM: "Not authenticated the user",
            EC: -1,
            DT: null
        })
    }
}
module.exports = { checkUserJWT }