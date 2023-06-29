import { Schema } from "mongoose";

let tagsSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    startTime:{
        type:Date,
trim: true,
    },
endTime:{
    type:Date,
    trim: true,
}
  },
  { timestamps: true }
);

export default tagsSchema;