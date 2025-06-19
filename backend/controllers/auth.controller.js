import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.config.js";
import { sendEmail } from "../lib/mailer.js";
import { PendingUser } from "../models/user.model.js";
export const SignUp = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 caractere long" });
    }

    const existeUser = await User.findOne({ email });
    if (existeUser) {
      return res.status(400).json({ message: "Email is already exist" });
    }
    const existPendingUser = await PendingUser.findOne({ email });
    if (existPendingUser) {
      return res.status(400).json({ message: "Email is already pending" });
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    await sendEmail(
      email,
      "Verification Code",
      `Your verification code is ${code}`
    );
    if (!code) {
      return res
        .status(500)
        .json({ message: "Failed to generate verification code" });
    }

    // Here you would typically save the code to the database or session for later verification

    const hashPassword = await bcrypt.hash(password, 10);
    await PendingUser.create({
      email,
      code,
      userData: { fullName, email, password: hashPassword },
      codeExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    return res.status(201).json({ message: "code envoyé a l'email " });
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
        bio: bio,
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
export const VerfierEmail = async (req, res) => {
  const { code } = req.body;
  console.log("code", code);
  try {
    const pendingUser = await PendingUser.findOne({ code });
    if (!pendingUser) {
      return res.status(400).json({ message: "Code invalide" });
    }

    if (pendingUser.code !== code) {
      return res.status(400).json({ message: "Invalid  code" });
    }

    if (pendingUser.codeExpires < Date.now()) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    // If everything is valid, create the user
    const newUser = new User(pendingUser.userData);
    await newUser.save();
    await PendingUser.deleteOne({ code: code.toString() })
    generateToken(newUser._id, res);
    return res.status(201).json({
      message: "Email verified successfully",
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("VerifyEmail error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const pendingUserCancel =async(req,res)=>{
  const {code} = JSON.parse(req.body);
   console.log("Reçu via sendBeacon:", req.body); 
  try{
    const pendingUser = await PendingUser.findOne({ code });
    if (!pendingUser) {
      return res.status(404).json({ message: "Pending user not found" });
    }

    await PendingUser.deleteOne({ code });
    return res.status(200).json({ message: "Pending user canceled successfully" });
  } catch (error) {
    console.error("Cancel pending user error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}