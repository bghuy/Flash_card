import UserS from "./../services/UserS.js"
const createFunc = async (req, res) => {
    try {
        if (req.body && req.body.phone && req.body.email && req.body.username && req.body.password) {

            let data = await UserS.create(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        } else {
            return res.status(200).json({
                EM: "lack of information",//error message
                EC: 2,//error code 2 means error , 0 means no error
                DT: null,//data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: 1,//error code 1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const loginFunc = async (req, res) => {
    try {
        if (req.body && req.body.valueLogin && req.body.password) {
            ;
            let data = await UserS.login(req.body);
            if (data && data.DT && data.DT.token) {
                res.cookie("token", data.DT.token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
            }
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        } else {
            return res.status(200).json({
                EM: "email/phone number or password is required",//error message
                EC: 2,//error code 2 means error , 0 means no error
                DT: null,//data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: 1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const logoutFunc = async (req, res) => {
    try {
        let cookies = req.cookies;
        console.log("check cookies", cookies);
        if (cookies && cookies.token) {
            res.clearCookie("token");
            return res.status(200).json({
                EM: "log out successfully",//error message
                EC: 0,//error code -1 means error , 0 means no error
                DT: null,//data
            })
        }
        else {
            return res.status(200).json({
                EM: "log out unsuccessfully",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null,//data
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: 1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}

const readFunc = async (req, res) => {
    try {
        if (req.query && req.query.email) {
            const { email } = req.query;
            let data = await UserS.fetch(email);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "no query found",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null,//data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: 1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const updateFunc = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "1",//error code -1 means error , 0 means no error
            DT: "",//data
        })
    }
}
const getUserAccount = async (req, res) => {
    if (req && req.user && req.token) {
        return res.status(200).json({
            EM: "ok",//error message
            EC: 0,//error code -1 means error , 0 means no error
            DT: {
                email: req.user.email,
                username: req.user.username,
                token: req.token,
            },
        })
    }
    else {
        return res.status(401).json({
            EM: "Not authenticated the user",
            EC: -1,
            DT: null
        })
    }
}
const updatePWFunc = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmedNewPassword, email } = req.body;
        if (req.body && currentPassword && newPassword && confirmedNewPassword && email) {
            let data = await UserS.updateUserPW(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "update password fail",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null,//data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: 1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const updateUNFunc = async (req, res) => {
    try {
        const { email, username, newUsername } = req.body;
        if (req.body && username && newUsername && email) {
            let data = await UserS.updateUserPW(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "update password fail",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null,//data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: 1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}



module.exports = { loginFunc, logoutFunc, createFunc, readFunc, updateFunc, getUserAccount, updatePWFunc, updateUNFunc };