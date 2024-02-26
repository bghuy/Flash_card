import express from "express"
// import initWebRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
// import initApiRoutes from "./routes/api.js"
require("dotenv").config()

// Add headers before the routes are defined
import { configCors } from "./config/cors.js";
import initUserRoutes from './routes/UserR.js'
import initMyCollectionRoutes from "./routes/MyCollectionR.js";
import initUploadsRoutes from "./routes/Upload.js";
import { handleMulterError } from "./middlewares/MulterM.js"
// import { createJWT, verifyToken } from "./middlewares/JWTActions.js"
const bodyParser = require('body-parser')
const app = express();
import cookieParser from "cookie-parser";
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
configCors(app);

// config cookie-parser
app.use(cookieParser())
app.use(handleMulterError);
configViewEngine(app);
initUserRoutes(app);
initMyCollectionRoutes(app);
initUploadsRoutes(app);
// initWebRoutes(app);
// initApiRoutes(app);
const PORT = process.env.PORT || 8000;

app.use((req, res) => {
    res.send("404 not found");
})
app.listen(PORT, () => {
    console.log(`JWT backend is running at http://localhost:${PORT}`)
})
