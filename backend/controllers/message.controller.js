import User from "../models/user.model.js";



export const GetUsers =async (req,res)=>{
    try{
        if(!req.user || !req.user._id)
        {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }
        const userId = req.user._id
        const Filtre = await User.find({_id:{$ne : userId}}).select("-password");

       res.status(200).json(Filtre)


    }catch(error){
        console.log('errur to fuch users',error.message);
        res.status(500).json({message :'erreur au serveur'})
    }
}


export const GetUser= async(req,res)=>{
    try{
        const userId = req.user._id;
        const user = await User.findOne({_id : userId}).select("-password");
        if (!user){
            res.status(404).json({message : "user is not found"})
        }
        res.status(201).json(user);

    }catch(error){
        res.status(500).json({message:'erreur au find user'})
    }
}

 

