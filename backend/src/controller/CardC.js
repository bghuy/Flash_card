
import CardS from "./../services/CardS.js"
const readFunc = async (req, res) => {
    try {
        const { page, limit, collectionId, email } = req.query;
        const userId = req.userId
        if (email === req.user.email) {
            if (collectionId && userId) {
                if (page && limit) {
                    let search = req.query.search ? req.query.search : null;
                    let field = req.query.field ? req.query.field : "id";
                    let order = req.query.order ? req.query.order : "DESC";
                    const queryField = {
                        collectionId: collectionId,
                        page: +req.query.page || 1,
                        limit: +req.query.limit || 8,
                        search: search,
                        field: field,
                        order: order
                    }
                    let data = await CardS.fetchWithPageAndLimit(queryField, req.userId);
                    return res.status(200).json({
                        EM: data.EM,//error message
                        EC: data.EC,//error code -1 means error , 0 means no error
                        DT: data.DT,//data
                    });
                }
                else {
                    const { collectionId } = req.query;
                    let data = await CardS.fetchAll(collectionId, +req.userId);
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
const updateFunc = async (req, res) => {
    try {
        const { id, email } = req.body;
        const userId = req.userId
        if (email === req.user.email) {
            if (id && userId) {
                let data = await CardS.update(req.body, +userId);
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
            EC: 1,//error code -1 means error , 0 means no error
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
                let data = await CardS.deleteCard(req.body);
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
            EC: 1,//error code -1 means error , 0 means no error
            DT: null,//data
        })
    }
}
const createFunc = async (req, res) => {
    try {
        const { title, description, collectionId, email } = req.body;
        const userId = req.userId;
        if (email === req.user.email) {
            if (title && description && collectionId && userId) {
                let data = await CardS.create(req.body, +userId);
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


module.exports = { readFunc, updateFunc, deleteFunc, createFunc }