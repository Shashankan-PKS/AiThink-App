import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    user_name : {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    user_email : {
        type : mongoose.Schema.Types.String,
        unique : true,
        required : true
    },
    user_password : {
        type : mongoose.Schema.Types.String,
    },
    reset_otp: {
        type: mongoose.Schema.Types.String,
        default: ""
    },
}) 

export const UserData = mongoose.model("UsersData", userDataSchema)