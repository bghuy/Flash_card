import UploadS from "./../services/UploadS.js"
const appRoot = require('app-root-path');
const readImage = async (req, res) => {
    const imageName = req.params.imageName;
    console.log(imageName);
    // const collectionId = req.params.collectionId;
    if (!imageName) {
        // Nếu không có imageName, gửi phản hồi lỗi 400 (Bad Request) cho người dùng
        return res.status(400).send("Bad Request: Missing imageName and collectionId parameter");
    }
    // Tiếp tục xử lý nếu imageName đã được cung cấp
    res.sendFile(`${appRoot}/src/public/images/${imageName}`);
}
const uploadImage = async (req, res) => {
    try {
        if (req.imageFileName && req.userId && req.collectionId) {
            let data = await UploadS.uploadImageCollection(req.imageFileName, req.userId, req.collectionId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            return res.status(200).json({
                EM: "missing information",
                EC: 3,
                DT: null
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EM: "error in saving image",
            EC: 4,
            DT: null
        })
    }


}

module.exports = {
    readImage, uploadImage
};