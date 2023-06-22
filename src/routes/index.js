import { Router } from "express";
import adminRegisterRouter from "./adminRegisterRouter.js";
import fileUploadRouter from "./fileUpload.js";
import roleRouter from "./roleRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/auths`,
    router: adminRegisterRouter,
  },
  {
    path: `/files`,
    router: fileUploadRouter,
  },
  {
    path: `/roles`,
    router: roleRouter,
  },
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
