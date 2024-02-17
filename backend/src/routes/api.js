import express from "express";
// import { checkUserJWT, checkUserPermission } from "./../middlewares/JWTActions.js"
const router = express.Router();
const initApiRoutes = (app) => {
    // router.post("/user/create", apiController.createUser);
    // router.all('*', checkUserJWT, checkUserPermission,);
    router.post("/user/login", apiController.login);
    router.post("/user/logout", apiController.logout);
    router.get("/account", userController.getUserAccount)
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    // router.delete("/user/delete", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);

    return app.use('/api/v1', router);
}

export default initApiRoutes;