import cron from "node-cron";
import { TokenData } from "../schemasModle/model.js";
// for every 30 days

export let deleteInvalidToken = () => {
  //   cron.schedule("*/5 * * * * *", async () => {
  cron.schedule("0 0 */30 * *", async () => {
    // console.log("hello");
    // const expiredTokens = await TokenData.find({
    //   expiration: { $lt: new Date() },
    // });
    // console.log(expiredTokens);
    // await TokenData.deleteMany({
    //   _id: { $in: expiredTokens.map((token) => token._id) },
    // });

    TokenData.deleteMany({ expiration: { $lt: new Date() } });
  });
};
