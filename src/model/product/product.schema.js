import mongoose from "mongoose"

export const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    title:{
        type:String,
        required:true,
        max:200
    },
    tags:{
        type:Array
    },
    description:{
        type:String
    },  
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String
    },
    timestamp:{
        type:Date,
        defaul:Date.now()
    }
})
