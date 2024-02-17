import express from "express";
// import { checkUserJWT, checkUserPermission } from "./../middlewares/JWTActions.js"
import UserC from "../controller/UserC.js"
const router = express.Router();
const initUserRoutes = (app) => {
    // router.post("/user/create", apiController.createUser);
    // router.all('*', checkUserJWT, checkUserPermission,);
    router.post("/login", UserC.loginFunc);
    // router.post("/user/logout", UserC.logoutFunc);
    router.post("/register", UserC.createFunc);
    // router.get("/user/read", UserC.readFunc);
    // router.put("/user/update", UserC.updateFunc);
    // router.get("/user/account", userController.getUserAccount)
    // router.delete("/user/delete", userController.deleteFunc);
    // router.get("/group/read", groupController.readFunc);

    return app.use('/user/v1', router);
}

export default initUserRoutes