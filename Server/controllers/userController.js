const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt=require('jsonwebtoken');
const Conn = require('../models/connection');
const register = async (req, res) => {
    try {
        const { name, email, password,location, bio, role } = req.body;
        if (!name || !email || !password || !location || !bio || !role) {
            console.log("register: any field is missing");
            return res.status(400).json({ status: 'fail', message: "Something is missing!" });
        }

        const isUserExists=await User.findOne({email:email});
        if(isUserExists){
            return res.status(400).json({ status: 'fail', message: "This email already registered!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        if (role === 'provider') {
            const { course, mode } = req.body;
            if (!course || !mode) {
                console.log("register: any field is missing");
                return res.status(400).json({ status: 'fail', message: "Something is missing!" });
            }

            const user = new User({
                name,
                email,
                password: hashPassword,
                location,
                role,
                profile:{
                    course:[course],
                    bio,
                    mode
                }
            })
            await user.save();
            return res.status(200).json({ status: 'success', message: "Your registration is successfull!" });

        };

        const user = new User({
            name,
            email,
            role,
            password: hashPassword,
            profile:{
                bio,
            }
        })
        await user.save();
        return res.status(200).json({ status: 'success', message: "Your registration is successfull!" });


    } catch (error) {
        console.log("register:", error.message);
        res.status(500).json({ status: 'error', message: "Internal server error" });
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            console.log("register: any field is missing");
            return res.status(400).json({ status: 'fail', message: "Something is missing!" });
        }

        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ status: 'fail', message: "Invalid email or password!" });
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({ status: 'fail', message: "Invalid email or password!" });
        }

        let userData=user.toObject();//Don't send the password
        delete userData.password;

        const token=jwt.sign({userId:user._id},"my_secret_key",{expiresIn:'1d'});

        return res.cookie('token',token,{httpOnly:true,sameSite:"strict",maxAge:1*24*60*60*1000}).json({status:"success",user:userData,message:"LoggedIn successfully!"});

    } catch (error) {
        console.log("login:", error.message);
        res.status(500).json({ status: 'error', message: "Internal server error" });
    }
}


const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({}).select({password:0,email:0});
        return res.status(200).json({ status: 'success', users});
    } catch (error) {
        console.log("getAllUsers:", error.message);
        res.status(500).json({ status: 'error', message: "Internal server error" });
    }
}

const getAllConnections=async(req,res)=>{
    try {
        const userId=req.user?._id;
        const connections=await Conn.find({$or:[{sender:userId}, {receiver:userId}]}).populate('sender', 'name profilePicture role profile').populate('receiver', 'name profilePicture role profile');
        return res.status(200).json({ status: 'success', connections});
    } catch (error) {
        console.log("getAllConnections:", error.message);
        res.status(500).json({ status: 'error', message: "Internal server error" });
    }
}

const addProfileImage=async(req,res)=>{
    try {
        const userId=req?.user?._id;
        const fileName=req?.file?.filename;
        const user=await User.findByIdAndUpdate({_id:userId},{$set:{profilePicture:fileName}},{new:true}).select({password:0});
        res.status(200).json({status:'success',message:'Profile Image Updated!',imageName:fileName,user});

    } catch (error) {
        console.log("addProfileImage:", error.message);
        res.status(500).json({ status: 'error', message: "Internal server error" });
    }
}

module.exports={
    register,
    login,
    getAllUsers,
    getAllConnections,
    addProfileImage
}