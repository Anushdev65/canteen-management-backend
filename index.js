import express, { json, urlencoded } from "express";

import { config } from "dotenv";
import { connectDb } from "./src/connectdb/db.js";
import { apiVersion, port, staticFolder } from "./src/config/config.js";
import errorHandler from "./src/middleware/errorHandler.js";
import cors from "cors";
import apiRouter from "./src/routes/index.js";
import limiter from "./src/middleware/rateLimiter.js";
import { deleteInvalidToken } from "./src/services/deleteInvalidToken.js";
let expressApp = express();
config();

let corseOption = {
  origin: [
    "http://localhost:8002",
    "http://localhost:8001",
    "https://project-dw.onrender.com",
  ],
};
// app.use(cors());
expressApp.use(limiter);
expressApp.use(cors());
expressApp.use(json());
// expressApp.use(urlencoded({ extended: true }));//may be it is not need (multer will work for this)

expressApp.use(`${apiVersion}`, apiRouter);

expressApp.use(express.static(staticFolder));
// expressApp.use("/aaa", firstRouter);

expressApp.use(errorHandler);

// try {
//   await sendMail({
//     from: '"Fred Foo" <nitanthapa425@gmail.com>',
//     to: ["nitanthapa123@gmail.com", "sandeshbca5@arunima.edu.np"],
//     subject: "this is subject",
//     html: "<h1>Hello World<h1>",
//   });
//   console.log("email is sent successfully");
// } catch (error) {}

connectDb();
deleteInvalidToken();

expressApp.listen(port, () => {
  console.log(`the port is listening at ${port}`);
});
