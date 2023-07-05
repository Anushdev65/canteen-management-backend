import { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

let categorySchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true
    },
  },
  { timestamps: true }
);

categorySchema.plugin(uniqueValidator, {
  message: function (props) {
    return `This category '${props.value}' already exists`;
  }
})

export default categorySchema;