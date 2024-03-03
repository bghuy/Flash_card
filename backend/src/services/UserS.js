import db from "./../models/index.js"
import UserU from "./../utilities/UserU.js"
import JwtU from "./../utilities/JwtU.js"
import { Op } from 'sequelize';
const create = async (data) => {
    try {
        const { email, password, username, phone } = data;
        if (!UserU.isValidEmail(email)) {
            return {
                EM: "email is not valid",
                EC: -1,
                DT: null
            };
        }
        if (!UserU.isValidPhone(phone)) {
            return {
                EM: "phone number must contain at least 10 characters",
                EC: -1,
                DT: null
            };
        }

        if (!UserU.isValidPassword(password)) {
            return {
                EM: "password must contain at least 8 characters and no space",
                EC: -1,
                DT: null
            };
        }

        if (await UserU.isExistEmail(email)) {
            return {
                EM: "email has existed",
                EC: -1,
                DT: null
            };
        }
        if (await UserU.isExistPhone(phone)) {
            return {
                EM: "phone number has existed",
                EC: -1,
                DT: null
            };
        }
        if (await UserU.isExistUsername(username)) {
            return {
                EM: "username has existed",
                EC: -1,
                DT: null
            };
        }

        const hashedPassword = UserU.hashPassword(password);
        await db.User.create({ email: email, password: hashedPassword, username: username, phone: phone });
        return {
            EM: "create user success",
            EC: 0,
            DT: null
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}

const login = async (data) => {
    try {
        const { valueLogin, password } = data;
        if (UserU.isExistEmail(valueLogin) || UserU.isExistPhone(valueLogin)) {
            const user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: valueLogin },
                        { phone: valueLogin }
                    ]
                }
            });
            if (user && user.password && UserU.checkPassword(password, user.password)) {
                let payload = {
                    email: user.email,
                    username: user.username,
                }
                let token = JwtU.createJWT(payload);
                return {
                    EM: "login successfully",//error message
                    EC: 0,//error code -1 means error , 0 means no error
                    DT: {
                        email: user.email,
                        username: user.username,
                        token: token,
                    }
                }
            } else {
                return {
                    EM: "login fail, email/phone number or password is in correct",//error message
                    EC: -1,//error code -1 means error , 0 means no error
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "login unsuccessfully",
                EC: -1,
                DT: null
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}

const fetch = async (email) => {
    try {
        let user = await db.User.findOne(
            { where: { email: email } }
        )
        if (user) {
            return {
                EM: "found user",//error message
                EC: 0,//error code -1 means error , 0 means no error
                DT: {
                    email: user.email,
                    username: user.username,
                    phone: user.phone,
                }
            }
        }
        else {
            return {
                EM: "not found user",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}

const updateUserPW = async (data) => {
    try {
        let user = await db.User.findOne(
            { where: { email: data.email } }
        )
        if (user) {
            if (UserU.checkPassword(data.currentPassword, user.password)) {
                if (data.newPassword === data.confirmedNewPassword) {
                    const hashedPassword = UserU.hashPassword(data.newPassword);
                    user.password = hashedPassword;
                    await user.save()
                    return {
                        EM: "update user password success",
                        EC: 0,
                        DT: null
                    }
                }
                else {
                    return {
                        EM: "confirmed password is incorrect",//error message
                        EC: -1,//error code -1 means error , 0 means no error
                        DT: null
                    }
                }
            } else {
                return {
                    EM: "current password is incorrect",//error message
                    EC: -1,//error code -1 means error , 0 means no error
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "not found user",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}
const editUsername = async (data) => {
    try {
        let user = await db.User.findOne(
            { where: { email: data.email, username: data.username } }
        )
        if (user) {
            if (data && data.newUsername) {
                user.username = data.newUsername;
                await user.save()
                return {
                    EM: "update username success",
                    EC: 0,
                    DT: null
                }
            }
            else {
                return {
                    EM: "please enter new username",
                    EC: -1,
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "not found user",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}
const updateEmail = async (data) => {
    try {
        const { email, newEmail } = data;
        let user = await db.User.findOne(
            { where: { email: email } }
        )
        if (user) {
            if (data && data.newEmail) {
                user.email = newEmail;
                await user.save()
                return {
                    EM: "update email success",
                    EC: 0,
                    DT: null
                }
            }
            else {
                return {
                    EM: "please enter new email",
                    EC: -1,
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "not found user",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}
const updatePhone = async (data) => {
    try {
        const { email, newPhone } = data
        let user = await db.User.findOne(
            { where: { email: email } }
        )
        if (user) {
            if (newPhone) {
                user.phone = newPhone;
                await user.save()
                return {
                    EM: "update phone number success",
                    EC: 0,
                    DT: null
                }
            }
            else {
                return {
                    EM: "please enter new phone number",
                    EC: -1,
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "not found user",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: -1,
            DT: null
        }
    }
}



module.exports = { create, login, fetch, updateUserPW, editUsername, updateEmail, updatePhone }