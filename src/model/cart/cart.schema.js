import mongoose from "mongoose"

export const cartSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    user_id:{
        type: String,
        required: true,
    },
    products:{
        type: Array,
        required: true
    },
    state:{
        type: String,
        default:"ACTIVE"
    },
    timestamp:{
        type:Date,
        defaul:Date.now()
    }
})
