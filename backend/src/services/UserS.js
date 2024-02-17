import db from "./../models/index.js"
import UserU from "./../utilities/UserU.js"
import JwtU from "./../utilities/JwtU.js"
import { Op } from 'sequelize';
const create = async (data) => {
    try {
        if (!UserU.isValidEmail(data.email)) {
            return {
                EM: "email is not valid",
                EC: 3,
                DT: null
            };
        }
        if (!UserU.isValidPhone(data.phone)) {
            return {
                EM: "phone is not valid",
                EC: 3,
                DT: null
            };
        }

        if (!UserU.isValidPassword(data.password)) {
            return {
                EM: "password must contain at least 8 characters and no space",
                EC: 3,
                DT: null
            };
        }

        if (await UserU.isExistEmail(data.email)) {
            return {
                EM: "email has existed",
                EC: 3,
                DT: null
            };
        }
        if (await UserU.isExistPhone(data.phone)) {
            return {
                EM: "phone number has existed",
                EC: 3,
                DT: null
            };
        }
        if (await UserU.isExistUsername(data.username)) {
            return {
                EM: "username has existed",
                EC: 3,
                DT: null
            };
        }
        const { email, password, username, phone, fullname } = data;
        const hashedPassword = UserU.hashPassword(password);
        await db.User.create({ email: email, password: hashedPassword, username: username, phone: phone, fullname: fullname });
        return {
            EM: "create user success",
            EC: 0,
            DT: null
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: 4,
            DT: null
        }
    }
}

const login = async (data) => {
    try {
        const { loginData, password } = data;
        if (UserU.isExistEmail(loginData) || UserU.isExistPhone(loginData)) {
            const user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: loginData },
                        { phone: loginData }
                    ]
                }
            });
            if (user && user.password && UserU.checkPassword(password, user.password)) {
                let payload = {
                    email: user.email,
                    username: user.username,
                }
                let token = JwtU.createJWT(payload);
                // let decoded = JwtU.verifyToken(token);
                // console.log("check decoded >> ", decoded);
                return {
                    EM: "login successfully",//error message
                    EC: 0,//error code -1 means error , 0 means no error
                    DT: {
                        email: user.email,
                        username: user.username,
                        access_token: token,
                    }
                }
            } else {
                return {
                    EM: "login unsuccessfully",//error message
                    EC: 3,//error code -1 means error , 0 means no error
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "login unsuccessfully",
                EC: 3,
                DT: null
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: 4,
            DT: null
        }
    }
}


module.exports = { create, login }