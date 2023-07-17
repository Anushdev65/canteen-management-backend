import { Router } from "express";
import fileUploadRouter from "./fileUpload.js";
import roleRouter from "./roleRouter.js";
import authRouter from "./authRouter.js";
import generateMenuRouter from "./generateMenuRouter.js";
import categoryRouter from "./categoryRouter.js";

import foodRouter from "./foodRouter.js";
import orderFoodRouter from "./orderFoodRouter.js";
import addStudentDepositRouter from "./addStudentDepositRouter.js";

const apiRouter = Router();

// let isExpired = () => {
//   let currentTime = new Date()
//   let givenTime = new Date()
//   let expiryTime = new Date()
//   if (currentTime = <givenTime&& currentTime >= expiryTime) {
//     return
//   }
// }

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
  {
    path: `/food`,
    router: foodRouter,
  },
  {
    path: `/add-student-deposits`,
    router: addStudentDepositRouter,
  },
  {
    path: `/order-food`,
    router: orderFoodRouter,
  },
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
