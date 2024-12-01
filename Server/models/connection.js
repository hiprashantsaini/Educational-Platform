const mongoose=require("mongoose");

const connSchema=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:'Message'}],

},{timestamps:true});

const Conn=mongoose.model('Connection',connSchema);

module.exports=Conn;