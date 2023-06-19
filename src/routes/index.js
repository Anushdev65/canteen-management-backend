import { Router } from "express";
import adminRegisterRouter from "./adminRegisterRouter.js";
import fileUploadRouter from "./fileUpload.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/admin`,
    router: adminRegisterRouter,
  },
  {
    path: `/file`,
    router: fileUploadRouter,
  },
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
