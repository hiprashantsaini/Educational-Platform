const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['seeker','provider','admin'],
        default:'seeker'
    },
    profile:{
        expertise:[String],
        course:[String],
        rate:Number,
        mode:String,
        bio:String,
        gender:{
            type:String,
            enum:{
                values:['male','female','other'],
                message:"Invalid gender field"
            }
        }
    },
    location:{
        type:String,
        enum:{
            values:['Remote','Hybrid','Offline','Delhi','Meerut','Mumbai','Patna','Other'],
            message:"Select location from the available list."
        }
    },
    profilePicture:{
        type:String,
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    followed:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}],
    connections:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],

},{timestamps:true});

const User=mongoose.model("User",userSchema);

module.exports=User;