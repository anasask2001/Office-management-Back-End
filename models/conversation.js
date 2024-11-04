import mongoose from "mongoose";


const conversationSchema=new mongoose.Schema({
participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin',
    required:true
   },{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Staff',
    required:true
   }],

messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message',
    default:[]
}]
},{timestamps:true})


const Conversation=mongoose.model("Conversation",conversationSchema)

export default Conversation;