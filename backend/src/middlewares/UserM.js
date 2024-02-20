
require("dotenv").config()
const nonSecurePaths = ['/login', '/register', '/logout', '/community'];
import UserU from "./../utilities/JwtU.js"
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    console.log("check cookies", cookies);
    if (cookies && cookies.token) {
        let token = cookies.token;
        let decoded = UserU.verifyToken(token);
        if (decoded) {
            console.log(decoded)
            req.user = decoded;
            req.token = token;
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