import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.config.js";


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

 
export const GetMessages= async(req,res) =>{
    try{
        const {id : sendMs } = req.params;
        const MyMsId  = req.user._id;
        const Messages = await Message.find({
            $or:[
                {senderMessage : sendMs ,recivedMessage : MyMsId},
                {senderMessage:MyMsId ,recivedMessage : sendMs}
            ]})

        if(!Messages) {
            res.status(404).json({message : "Message is not available"})
        }

        res.status(201).json(Messages)
    }catch(error){
        console.log("erreur au cours de exécution de la requete",error.message);
        res.status(500).json({message:"erreur au server"})
    }
}


export const PostMessages= async(req,res)=>{
    try{
        const {text,Image} =req.body;
        const {id:senderMessage} = req.params;
        const recivedMessage = req.user._id;
        let pic ;
        if(Image){
           const  UploadImg = await cloudinary.uploader.upload(Image);
           pic = UploadImg.secure_url;
        }

        const NewMessages = new Message({
            senderMessage,
            recivedMessage,
            text,
            Image : pic,
        })

        if(!NewMessages){
            res.status(404).json({message:'erreur au cours de transmi '})
        }
        await NewMessages.save();

        res.status(201).json(NewMessages);

    }catch(error){
        console.log("erreur au cours de exécution de la requete",error.message);
        res.status(500).json({message:"erreur au server"})

    }
}