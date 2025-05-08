import User from "../models/user.model.js";
import  jwt  from 'jsonwebtoken';



export const protectRoute =async (req,res,next) =>  {
    try {
        const token =req.cookies.jwt;
        if(!token){
            res.status(401).json({message : "unauthorized : No token provider "});
        }

        const decoded = jwt.verify(token,process.env.JWT_TOKEN);
        if(!decoded){
            res.status(401).json({message : 'unauthorize : invalid token'});

        }
        const user= await User.findById(decoded.UserId).select('-password');

        if(!user){
            res.status(404).json({message: "user not found"});
        }

        req.user= user;
        next();

    } catch (error) {
        console.log("erreur dans le middleware protectRoute:",error.message);
        res.status(500).json({message: "erreur au serveur"});
        
    }


}