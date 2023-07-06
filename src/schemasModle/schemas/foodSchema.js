import { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


let foodSchema = Schema(
  {
    foodName: {
      type: String,
      trim: true,
      unique: true,
    },
    rate: {
      type: Number,
      trim: true,
    },
    discountedRate: {
      type: Number,
      trim: true,
    },
    categoryId: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "categoryId is required"],
    },
    description: {
      type: String,
      trim: true,
    },


  },
  { timestamps: true }
);

foodSchema.plugin(uniqueValidator, { message: 'This food already exists' })

export default foodSchema;
