import { Router } from "express";
import fileUploadRouter from "./fileUpload.js";
import roleRouter from "./roleRouter.js";
import authRouter from "./authRouter.js";
import generateMenuRouter from "./generateMenuRouter.js";
import categoryRouter from "./categoryRouter.js";
// import tagsRouter from "./tagsRouter.js";
import foodRouter from "./foodRouter.js";
import addStudentDepositRouter from "./addStudentDepositRouter.js";

// hello

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
  },
  {
    path: `/category`,
    router: categoryRouter,
  },
  // {
  //   path: `/tags`,
  //   router: tagsRouter,
  // },
  {
    path: `/food`,
    router: foodRouter,
  },
  {
    path: `/add-student-deposits`,
    router: addStudentDepositRouter,
  },
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
