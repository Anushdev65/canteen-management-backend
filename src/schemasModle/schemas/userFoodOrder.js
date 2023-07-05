import { Schema } from "mongoose";


const userFoodOrderSchema = Schema(
    {
        foodItem: {
            type: String,
            ref: "GenerateMenu"
        },
        img: {
            type: String,
        },
        availableTime: {
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
        },
        rate: {
            type: Number,
        },
        subRate: {
            type: Number,
        },
        initialQuantity: {
            type: Number,
        },
        availableQuantity: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },

    }
)

export default userFoodOrderSchema;