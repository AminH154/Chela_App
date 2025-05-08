import { text } from "express";
import mongoose, { mongo, Schema } from "mongoose";

const messageShema=new mongoose.Schema(
        {
        senderMessage:{
            type :mongoose.Schema.ObjectId,
            ref : "User",
            require:true
        },
        recivedMessage:{
            type:mongoose.Schema.ObjectId,
            ref :"User",
            require:true
        },
        text :{
            type : String,
        },
        Image:{
            type : String,

        }
        },
        {timestamps:true},


    )


const Message=mongoose.model("message",messageShema);
export default Message;