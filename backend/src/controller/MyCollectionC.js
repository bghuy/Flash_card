import MyCollectionS from "./../services/MyCollectionS.js"
const appRoot = require('app-root-path');
const readFunc = async (req, res) => {
    try {
        const { page, limit, email } = req.query;
        if (email === req.user.email) {
            if (+page && +limit) {
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
                let data = await MyCollectionS.fetchAll(email);
                return res.status(200).json({
                    EM: data.EM,//error message
                    EC: data.EC,//error code -1 means error , 0 means no error
                    DT: data.DT,//data
                });
            }

        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: null
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: -1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        const { id, title, email } = req.body;
        if (email === req.user.email) {
            const userId = req.userId;
            if (id && title && userId) {
                let data = await MyCollectionS.update(req.body, +userId);
                return res.status(200).json({
                    EM: data.EM,//error message
                    EC: data.EC,//error code -1 means error , 0 means no error
                    DT: data.DT,//data
                });
            }
            else {
                return res.status(200).json({
                    EM: "missing information",//error message
                    EC: -1,//error code -1 means error , 0 means no error
                    DT: null,//data
                });
            }
        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: null
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: -11,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }

}
const deleteFunc = async (req, res) => {
    try {
        const userId = req.userId;
        const { id, email } = req.body;
        if (email === req.user.email) {
            if (id && userId) {
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
                    EC: -1,//error code -1 means error , 0 means no error
                    DT: null,//data
                });
            }
        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: null
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: -1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const createFunc = async (req, res) => {
    try {
        const { title, email } = req.body;
        const userId = req.userId;
        if (email === req.user.email) {
            if (title && userId) {
                let data = await MyCollectionS.create(req.body, +userId);
                return res.status(200).json({
                    EM: data.EM,//error message
                    EC: data.EC,//error code -1 means error , 0 means no error
                    DT: data.DT,//data
                });
            }
            else {
                return res.status(200).json({
                    EM: "missing information",//error message
                    EC: -1,//error code -1 means error , 0 means no error
                    DT: null,//data
                });
            }
        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: null
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: -1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const setFavorite = async (req, res) => {
    try {
        const { id, favorite, email } = req.body;
        const userId = req.userId;
        if (email === req.user.email) {
            if (id && (favorite === true || favorite === false) && userId) {
                let data = await MyCollectionS.setFavorite(+id, +userId, favorite);
                return res.status(200).json({
                    EM: data.EM,//error message
                    EC: data.EC,//error code -1 means error , 0 means no error
                    DT: data.DT,//data
                });
            }
            else {
                return res.status(200).json({
                    EM: "missing information",//error message
                    EC: -1,//error code -1 means error , 0 means no error
                    DT: null,//data
                });
            }
        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: null
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: -1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}

module.exports = { readFunc, updateFunc, deleteFunc, createFunc, setFavorite }