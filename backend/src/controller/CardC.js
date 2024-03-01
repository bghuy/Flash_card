
import CardS from "./../services/CardS.js"
const readFunc = async (req, res) => {
    try {
        if (req.query && req.query.collectionId && req.userId) {
            if (req.query.page && req.query.limit) {
                const { page, limit, collectionId } = req.query;
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
        const { id } = req.body;
        if (id && req.userId) {
            let data = await CardS.update(req.body, +req.userId);
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
        const { id } = req.body;
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
        const { title, description, collectionId } = req.body;
        if (title && description && collectionId && req.userId) {
            let data = await CardS.create(req.body, +req.userId);
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


module.exports = { readFunc, updateFunc, deleteFunc, createFunc }