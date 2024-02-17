import jwt from "jsonwebtoken"
require("dotenv").config()
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    // return jwt.verify(token, key);
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}
module.exports = { createJWT, verifyToken }