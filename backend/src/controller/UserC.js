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
        if (req.body && req.body.loginData && req.body.password) {

            let data = await UserS.login(req.body);
            if (data && data.DT && data.DT.access_token) {
                res.cookie("token", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
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
            EC: "1",//error code -1 means error , 0 means no error
            DT: "",//data
        })
    }
}
const logoutFunc = async (req, res) => {
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

const readFunc = async (req, res) => {
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


module.exports = { loginFunc, logoutFunc, createFunc, readFunc, updateFunc };