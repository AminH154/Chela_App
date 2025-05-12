import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.config.js";


export const SignUp =async (req,res) =>{
    const {email,fullName,password} = req.body;
    try {
        if(!email || !password || !fullName){
           return  res.status(400).json({message :'all fields are required'});
        }
        if (password.length <= 6 ){
            return res.status(400).json({message :'password must be at least 6 caractere long' });
        }
        const existeUser =await User.findOne({email});
        if(existeUser){
            return res.status(400).json({message : 'Email is already exist '});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            fullName,
            email,
            password : hashPassword,
        })
        if (newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                message:"sign Up success",
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic,

            })

        }else{
            res.status(400).json({message: 'invalide user data' })
        }

    } catch (error) {
        res.status(500).json({message : 'Internal server error.'})
    }
};

export const LogIn =async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message:'ivalid  credential'});
        };
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            res.status(400).json({Message:'ivalid password'});
        };

        generateToken(user._id,res);
        res.status(200).json({
            message:"login with success",
            id : user._id,
            fullName : user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            

        
        });
    }
    catch(error){
        console.log('erreur ',error.message);
        res.status(500).json({message:"erreur au service"});
    };
};

export const LogOut = async (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge : 0});
        res.status(201).json({messag :" lougOut avec succes"});
    } catch (error) {
        console.log("errer",error.message);
        res.status(500).json("erreur au server ");
    }
  
};

export const  UpdateProfile =async (req,res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            res.status(400).json({message :'proficPin is not define '})
        }

        const UploadResponse =await cloudinary.uploader.upload(profilePic);
        const UpdateUser = await User.findByIdAndUpdate(
            userId,
            { profilePic :UploadResponse.secure_url},
            {new:true}
        )
        
        res.status(200).json(UpdateUser);

    }catch{
        res.status(500).json({message :'erruer au serveur '})
    }
}


export const isAuth=async (req,res)=>{
    res.status(201).json({message:"is oready auth"})
}