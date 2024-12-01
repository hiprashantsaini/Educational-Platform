const mongoose=require("mongoose");

const commSchema=new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true},
    comment:{type:String,required:true}
},{timestamps:true});

const Comment=mongoose.model('Comment',commSchema);

module.exports=Comment;