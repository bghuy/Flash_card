import express from "express";
// import { checkUserJWT, checkUserPermission } from "./../middlewares/JWTActions.js"
import CardC from "./../controller/CardC.js"
import UserM from "./../middlewares/UserM.js"
const router = express.Router();
const initCardRoutes = (app) => {
    router.all('*', UserM.checkUserJWT);
    router.get("/read", CardC.readFunc);
    router.post("/create", CardC.createFunc);
    router.put("/update", CardC.updateFunc);
    router.delete("/delete", CardC.deleteFunc);
    return app.use('/card/v1', router);
}

export default initCardRoutes