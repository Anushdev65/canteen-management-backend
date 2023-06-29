import { Router } from "express";
import fileUploadRouter from "./fileUpload.js";
import roleRouter from "./roleRouter.js";
import authRouter from "./authRouter.js";
import generateMenuRouter from "./generateMenuRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/auths`,
    router: authRouter,
  },
  {
    path: `/files`,
    router: fileUploadRouter,
  },
  {
    path: `/roles`,
    router: roleRouter,
  },

  {
    path: `/generateMenu`,
    router: generateMenuRouter,
  }
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
