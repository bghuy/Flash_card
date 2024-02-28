import MyCollectionS from "./../services/MyCollectionS.js"
const appRoot = require('app-root-path');
const readFunc = async (req, res) => {
    try {
        if (req.query && req.query.email) {
            if (req.query.page && req.query.limit) {
                const { page, limit, email } = req.query;
                let search = req.query.search ? req.query.search : null;
                let field = req.query.field ? req.query.field : "id";
                let order = req.query.order ? req.query.order : "DESC";
                let favorite = req.query.favorite;
                let data = await MyCollectionS.fetchWithPageAndLimit(email, +page, +limit, search, field, order, favorite);
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
        console.log(req.body);
        console.log(req.userId);
        if (id && title && req.userId) {
            let data = await MyCollectionS.update(req.body, +req.userId);
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

        // console.log("id:", id);
        // console.log("userId:", userId);
        const userId = req.userId;
        if (req.body && req.body.id && userId) {
            const id = req.body.id;
            let data = await MyCollectionS.deleteCollection(id, userId);
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
        const { title } = req.body;
        if (title && req.userId) {
            let data = await MyCollectionS.create(req.body, +req.userId);
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
const setFavorite = async (req, res) => {
    try {
        const { id, favorite } = req.body;
        if (id && (favorite === true || favorite === false) && req.userId) {
            let data = await MyCollectionS.setFavorite(+id, +req.userId, favorite);
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

module.exports = { readFunc, updateFunc, deleteFunc, createFunc, setFavorite }