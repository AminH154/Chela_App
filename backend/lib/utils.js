import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const  generateToken = (UserId,res)=>{

    const token = jwt.sign({UserId},process.env.JWT_TOKEN,{
        expiresIn :"7d",
    });


    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
    });
    return token;

}