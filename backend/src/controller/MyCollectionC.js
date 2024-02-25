import MyCollectionS from "./../services/MyCollectionS.js"
const appRoot = require('app-root-path');
const readFunc = async (req, res) => {
    try {
        if (req.query && req.query.email) {
            if (req.query.page && req.query.limit) {
                const { page, limit, email } = req.query;
                let search = null;
                if (req.query.search) {
                    search = req.query.search;
                }
                let data = await MyCollectionS.fetchWithPageAndLimit(email, +page, +limit, search);
                return res.status(200).json({
                    EM: data.EM,//error message
                    EC: data.EC,//error code -1 means error , 0 means no error
                    DT: data.DT,//data
                });
            }
            else {
                const { email } = req.query;
                let data = await MyCollectionS.fetchAll(email);
                return res.status(200).json({
                    EM: data.EM,//error message
                    EC: data.EC,//error code -1 means error , 0 means no error
                    DT: data.DT,//data
                });
            }

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
        const { id, title } = req.body;
        if (id && title) {
            let data = await MyCollectionS.update(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "missing information",//error message
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
const deleteFunc = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            let data = await MyCollectionS.deleteCollection(id);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "missing information",//error message
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
const createFunc = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        if (title && userId) {
            let data = await MyCollectionS.create(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "missing information",//error message
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
const readByPageFunc = async (req, res) => {

    try {
        if (req.query.page && req.query.limit) {

            const { page, limit } = req.query;
            let data = await MyCollectionS.fetchWithPageAndLimit(+page, +limit);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {

            let data = await userApiService.fetchAll();
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })

    }
}
module.exports = { readFunc, updateFunc, deleteFunc, createFunc, readByPageFunc }