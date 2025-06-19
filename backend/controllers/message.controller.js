import {User} from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.config.js";
import { getReceiverSocketId,io } from "../lib/socket.js";


export const GetUsers =async (req,res)=>{
    try{
        if(!req.user || !req.user._id)
        {
            res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }
        const userId = req.user._id;
        const Filtre = await User.find({_id:{$ne : userId}}).select("-password");

       res.status(200).json(Filtre);


    }catch(error){
        console.log('errur to fuch users',error.message);
        res.status(500).json({message :'erreur au serveur'})
    }
}

 
export const GetMessages = async (req, res) => {
    try {
        const { id: sendMs } = req.params;
        const MyMsId = req.user._id;
        const Messages = await Message.find({
            $or: [
                { senderMessage: sendMs, recivedMessage: MyMsId },
                { senderMessage: MyMsId, recivedMessage: sendMs }
            ]
        });

        
        res.status(200).json(Array.isArray(Messages) ? Messages : []);
    } catch (error) {
        console.log("erreur au cours de exécution de la requete", error.message);
        res.status(500).json({ message: "erreur au server" });
    }
};


export const PostMessages = async (req, res) => {
    try {
        const { text, Image } = req.body;
        const { id: senderMessage } = req.params;
        const recivedMessage = req.user._id;
        let pic;
        if (Image) {
            const UploadImg = await cloudinary.uploader.upload(Image);
            pic = UploadImg.secure_url;
        }

        const NewMessages = new Message({
            senderMessage,
            recivedMessage,
            text,
            Image: pic,
        });

        await NewMessages.save();
        
        // Get socket IDs for both sender and receiver
        const senderSocketId = getReceiverSocketId(senderMessage);
        const receiverSocketId = getReceiverSocketId(recivedMessage);
        
        // Emit to both sender and receiver if they are online
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", NewMessages);
        }
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", NewMessages);
        }

        res.status(201).json(NewMessages);

    } catch (error) {
        console.log("erreur au cours de exécution de la requete", error.message);
        res.status(500).json({ message: "erreur au server" });
    }
};