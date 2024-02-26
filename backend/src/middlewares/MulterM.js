import multer from 'multer';
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Lỗi từ Multer
        return res.status(418).json({
            EC: err.code,
            EM: err.message,
            DT: null
        });
        // Xử lý các loại lỗi khác từ Multer ở đây nếu cần
    } else if (err) {
        // Lỗi khác không phải từ Multer
        return res.status(500).json({
            EC: 409,
            EM: "Something went wrong!",
            DT: null
        });
    }
    // Nếu không phải lỗi từ Multer, tiếp tục middleware tiếp theo
    next();
};

module.exports = { handleMulterError }