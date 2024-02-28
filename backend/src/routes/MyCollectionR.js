import express from "express";
// import { checkUserJWT, checkUserPermission } from "./../middlewares/JWTActions.js"
import MyCollectionC from "./../controller/MyCollectionC.js"
import UserM from "./../middlewares/UserM.js"
const router = express.Router();
const initMyCollectionRoutes = (app) => {
    router.all('*', UserM.checkUserJWT);
    router.get("/read", MyCollectionC.readFunc);
    router.post("/create", MyCollectionC.createFunc);
    router.post("/set-favorite", MyCollectionC.setFavorite)
    router.put("/update", MyCollectionC.updateFunc);
    router.delete("/delete", MyCollectionC.deleteFunc);
    return app.use('/my-collection/v1', router);
}

export default initMyCollectionRoutes