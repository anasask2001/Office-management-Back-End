import mongoose from "mongoose";


const messageSchema=mongoose.Schema({
   senderId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin',
    required:true
   },{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Staff',
    required:true                                               
   },
],
   receiverId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin',
    required:true
   },{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Staff',
    required:true
   }],

message:{
    type:String,
    required:true
   }
},{timestamps:true})


const Message=mongoose.model("Message",messageSchema)

export default Message;