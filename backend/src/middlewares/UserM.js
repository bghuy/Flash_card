
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
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                // Xóa cookie khi JWT đã hết hạn
                res.clearCookie('token');
                return res.status(401).json({
                    EM: "The login session is over, please log in",
                    EC: -1,
                    DT: null
                });
            }
            let user = await db.User.findOne(
                { where: { email: decoded.email } }
            )
            if (user && user.username && user.email && user.id) {
                let payload = {
                    username: user.username,
                    email: user.email,
                }
                let recreateToken = JwtU.createJWT(payload)
                req.user = payload;
                req.token = recreateToken;
                req.userId = user.id
            }
            else {
                req.user = null;
                req.token = null;
                req.userId = null;
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