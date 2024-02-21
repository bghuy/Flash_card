import express from "express";
// import { checkUserJWT, checkUserPermission } from "./../middlewares/JWTActions.js"
import UserC from "../controller/UserC.js"
import UserM from "./../middlewares/UserM.js"
const router = express.Router();
const initUserRoutes = (app) => {
    // router.post("/user/create", apiController.createUser);
    router.all('*', UserM.checkUserJWT);
    router.post("/login", UserC.loginFunc);
    router.post("/logout", UserC.logoutFunc);
    router.post("/register", UserC.createFunc);
    router.get("/account", UserC.getUserAccount)
    router.get("/read", UserC.readFunc);
    router.put("/updatePassword", UserC.updatePWFunc)
    router.put("/updateUsername", UserC.updateUNFunc)
    // router.put("/user/update", UserC.updateFunc);

    // router.delete("/user/delete", userController.deleteFunc);
    // router.get("/group/read", groupController.readFunc);

    return app.use('/user/v1', router);
}

export default initUserRoutes