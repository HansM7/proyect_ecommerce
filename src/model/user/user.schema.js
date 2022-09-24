import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    direction:{
        type:String
    },
    age:{
        type:Number
    },
    number_phone:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    state:{
        type:String,
        default:"ACTIVE"
    },
    state_verify:{
        type:String,
        default:"0"
    },
    code_verify:{
        type:String,
        default:""
    },
    type_user:{
        type:String,
        default:"USER"
    },
    timestamp:{
        type:Date,
        defaul:Date.now()
    }
})
