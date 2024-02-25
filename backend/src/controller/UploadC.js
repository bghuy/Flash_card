const appRoot = require('app-root-path');
const uploadImage = async (req, res) => {
    const imageName = req.params.imageName;
    const collectionId = req.params.collectionId;
    if (!imageName || !collectionId) {
        // Nếu không có imageName, gửi phản hồi lỗi 400 (Bad Request) cho người dùng
        return res.status(400).send("Bad Request: Missing imageName and collectionId parameter");
    }
    // Tiếp tục xử lý nếu imageName đã được cung cấp
    res.sendFile(`${appRoot}/src/public/images/${imageName}`);
}

module.exports = {
    uploadImage
};