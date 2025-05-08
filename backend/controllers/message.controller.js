import User from "../models/user.model.js";


export const GetUsers =async (req,res)=>{
    try{
        console.log(req.user);
        if(!req.user || !req.user._id)
        {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }
        const userId = req.user._id
        console.log('userId',userId)
        const Filtre = await User.find({_id:{$ne : userId}}).select("-password");

       res.status(200).json(Filtre)


    }catch(error){
        console.log('errur to fuch users',error.message);
        res.status(500).json({message :'erreur au serveur'})
    }
}