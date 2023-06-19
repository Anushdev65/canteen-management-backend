import mongoose from "mongoose";
import { dbUrl } from "../config/config.js";

export let connectDb = async () => {
  mongoose.set("strictQuery", false);

  const options = {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  };

  try {
    await mongoose.connect(dbUrl, options);
    console.log(
      `expressApp is connected to mongodb at port ${dbUrl} successfully`
    );
  } catch (error) {
    console.log(error.message);
  }
};
