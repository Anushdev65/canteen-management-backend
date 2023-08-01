import { Schema } from "mongoose";

const transctionReportSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
   
  },

  email: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },

  expense: {
    type: Number,
    
  },
});

export default transctionReportSchema;
