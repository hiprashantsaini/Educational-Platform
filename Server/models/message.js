const mongoose=require("mongoose");

const messSchema=new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    reveiverId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    message:{type:String,required:true}
},{timestamps:true});

const Message=mongoose.model('Message',messSchema);

module.exports=Message;