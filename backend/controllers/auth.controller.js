import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.config.js";
import { sendEmail } from "../lib/mailer.js";
export const SignUp = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (password.length <= 6) {
      return res.status(400).json({ message: "password must be at least 6 caractere long" });
    }
    
    const existeUser = await User.findOne({ email });
    if (existeUser) {
      return res.status(400).json({ message: "Email is already exist" });
    }

    const code=Math.floor(100000 + Math.random() * 900000);
    await sendEmail(email, "Verification Code", `Your verification code is ${code}`);
    if (!code) {
      return res.status(500).json({ message: "Failed to generate verification code" });
    }
    

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "invalide user data" });
    }

    await newUser.save();
    generateToken(newUser._id, res);
    
    return res.status(201).json({
      message: "sign Up success",
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid password" });
    }

    generateToken(user._id, res);
    return res.status(200).json({
      message: "login with success",
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "profilePic is not defined" });
    }

    const UploadResponse = await cloudinary.uploader.upload(profilePic);
    const UpdateUser = await User.findByIdAndUpdate(
      userId,
      { 
        profilePic: UploadResponse.secure_url, 
        bio: bio 
      },
      { new: true }
    );

    return res.status(200).json(UpdateUser);
  } catch (error) {
    console.error("UpdateProfile error:", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const isAuth = (req, res) => {
  try {
    return res.status(200).json({
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      profilePic: req.user.profilePic,
      bio: req.user.bio,
    });
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ message: "server error" });
  }
};
