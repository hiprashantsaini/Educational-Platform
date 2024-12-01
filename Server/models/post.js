const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
   title:{type:String,required:true},
   description:{type:String},
   author:{type:mongoose.Schema.ObjectId,ref:'User'},
   likes:[{type:mongoose.Schema.ObjectId,ref:'User'}],
   comments:[{type:mongoose.Schema.ObjectId,ref:'Comment'}],
   type:{
    enum:['text','image','video'],
    message:"Please enter valid post type",
   },
   files:[{type:String}]//url of image of video

},{timestamps:true});

const Post=mongoose.model('Post',messSchema);

module.exports=Post;