import db from "./../models/index.js"
const uploadImageCollection = async (imageFileName, userId, collectionId) => {
    try {

        let collection = await db.My_Collection.findOne(
            { where: { id: collectionId, userId: userId } }
        )
        if (collection) {
            collection.imageName = imageFileName;
            await collection.save();
            return {
                EM: "update poster success",
                EC: 0,
                DT: null
            }
        }
        else {
            return {
                EM: "not found collection",
                EC: 3,
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EM: "something wrong with service",
            EC: 4,
            DT: null
        })
    }
}
module.exports = { uploadImageCollection }