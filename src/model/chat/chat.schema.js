import mongoose from "mongoose"

export const chatSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    user_id:{
        type: String,
        required: true,
    },
    
    message:{
        type: Array,
        required: true
    },
    timestamp:{
        type:Date,
        defaul:Date.now()
    }
})
