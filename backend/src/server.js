import express from "express"
import configViewEngine from "./config/viewEngine";
require("dotenv").config()
import { configCors } from "./config/cors.js";
import initUserRoutes from './routes/UserR.js'
import initMyCollectionRoutes from "./routes/MyCollectionR.js";
import initUploadsRoutes from "./routes/Upload.js";
import { handleMulterError } from "./middlewares/MulterM.js"
import initCardRoutes from "./routes/CardR.js";
const bodyParser = require('body-parser')
const app = express();
import cookieParser from "cookie-parser";
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
configCors(app);
app.use(cookieParser())
app.use(handleMulterError);
configViewEngine(app);
initUserRoutes(app);
initMyCollectionRoutes(app);
initUploadsRoutes(app);
initCardRoutes(app);
const PORT = process.env.PORT || 8000;
app.use((req, res) => {
    res.send("404 not found");
})
app.listen(PORT, () => {
    console.log(`Server backend is running at http://localhost:${PORT}`)
})
