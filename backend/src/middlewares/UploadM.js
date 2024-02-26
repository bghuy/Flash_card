const fileFilter = (req, file, cb) => {
    // Kiểm tra kiểu file, chỉ cho phép upload file ảnh
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        if (file.size > 1024 * 1024) { // Ví dụ: giới hạn kích thước là 1MB
            cb(new Error('File size exceeds the limit'), false);
        } else {
            cb(null, true);
        }
    } else {
        cb(new Error('Only JPEG/PNG images are allowed'), false);
    }
};
module.exports = { fileFilter }