import express from "express";
// import { checkUserJWT, checkUserPermission } from "./../middlewares/JWTActions.js"
import UserM from "./../middlewares/UserM.js"
import UploadC from "./../controller/UploadC.js"
const router = express.Router();
const initUploadsRoutes = (app) => {
    // router.all('*', UserM.checkUserJWT);
    router.get('/images/:collectionId/:imageName', UploadC.uploadImage);

    return app.use('/uploads', router);
}

export default initUploadsRoutes