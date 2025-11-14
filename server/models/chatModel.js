import mongoose from "mongoose";

const chatDataSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.String,
        ref : 'UsersData',
        required : true,
    },
    userName : {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    chatName : {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    messages : [
        {
            isImage : {
                type : mongoose.Schema.Types.Boolean,
                required : true,
            },
            isPublished : {
                type : mongoose.Schema.Types.Boolean,
                required : true,
            },
            role : {
                type : mongoose.Schema.Types.String,
                required : true,
            },
            content : {
                type : mongoose.Schema.Types.String,
                required : true,
            },
            timestamps : {
                type : mongoose.Schema.Types.Number,
                required : true,
            },
        }
    ]

}, {timestamps : true})

export const ChatData = mongoose.model("ChatsData", chatDataSchema)