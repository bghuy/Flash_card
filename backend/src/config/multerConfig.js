import multer from 'multer';
const appRoot = require('app-root-path');
// Cấu hình multer cho việc upload ảnh
import { fileFilter } from '../middlewares/UploadM';
const uploadPath = `${appRoot}/src/public/images`
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Thư mục lưu trữ ảnh đã upload
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const collectionId = req.body.collectionId;
        req.imageFileName = collectionId + '_' + req.userId + '_' + file.originalname;
        req.collectionId = collectionId;
        cb(null, collectionId + '_' + req.userId + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage, fileFilter: fileFilter });
export default upload