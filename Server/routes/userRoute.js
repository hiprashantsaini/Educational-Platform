const express=require('express');
const { register, login, getAllUsers, getAllConnections, addProfileImage } = require('../controllers/userController');
const { isAuth } = require('../authentication/auth');
const uploads = require('../utils/multer');

const userRoute=express.Router();

userRoute.post('/register',register);
userRoute.post('/login',login);
userRoute.get('/profile',isAuth,(req,res)=>{
    res.status(200).json({status:"success",user:req.user});
});

userRoute.get('/logout',isAuth,(req,res)=>{
    return res.cookie('token','',{maxAge:0}).json({status:"success",user:req.user});
});

userRoute.get('/allUsers',getAllUsers);
userRoute.get('/connections',isAuth,getAllConnections);

userRoute.post('/profileImage',isAuth,uploads.single('profileImage'),addProfileImage);




module.exports=userRoute;