const jwt=require('jsonwebtoken');
const User = require('../models/user');
const isAuth=async(req,res,next)=>{
    console.log("is Auth")
    try {
        const token=req.cookies?.token;
        const payload=jwt.verify(token,'my_secret_key');
        const user=await User.findById(payload?.userId).select("-password");
        if(!user){
            return res.status(400).json({status:'fail',message:"Unauthorized error! Please login again."})
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("isAuth :",error);
        return res.status(400).json({status:'fail',message:"Unauthorized error! Please login again."})
    }
}


module.exports={
    isAuth
}