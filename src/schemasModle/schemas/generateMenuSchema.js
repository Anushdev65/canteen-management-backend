import { Schema } from "mongoose";

let generateMenuSchema = Schema(
    {
        foodItem: {
            type: Schema.Types.ObjectId,
            ref: "Food",
            unique: true,
        },
        profile: {
            type: String,
            trim: true,
        },
        availableTime: {
            type: {
                from: String,
                to: String
            },
            trim: true,
        },
        rate: {
            type: Number,
            trim: true,
        },

        initialQuantity: {
            type: Number,
            trim: true,

        },

        availableQuantity: {
            type: Number,
            trim: true,
        },

        addQuantity: {
            type: Number,
            trim: true,
        },

        subtractQuantity: {
            type: Number,
            trim: true,
        }

    },
    { timestamps: true }
);

export default generateMenuSchema;
