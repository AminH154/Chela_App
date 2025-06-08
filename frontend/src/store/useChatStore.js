import {create}
 from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosIncteance } from "../lib/axios";

export const useChatStore = create((set, get)=>({
    messages :[],
    users:[],
    selectedUser: null,
    isUserLoding: false,
    isMessagesLoading: false,

    GetUsers : async()=>{
        set({isUserLoding: true});
        try{
            const res =await axiosIncteance.get("/message/getUsers");
            set({users: res.data});
            toast.success("Users loaded successfully");

        }catch(error){
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || "Failed to load users");

        }finally{
            set({isUserLoding: false});
        }
    },

    getMessages :async(userId)=>{
        set({isMessagesLoading:true });
        try{  
            const res = await axiosIncteance.get(`/message/${userId}`);
            if(!res.data || res.data.length === 0){
                toast.info("No messages found for this user");
                return;
            }
            set({messages: res.data});

    }catch(error){
        toast.error(error.response?.data?.message || "Failed to load messages");

    }finally{
        set({isMessagesLoading: false});
    }
    },
    setSelectedUser:(selectedUser)=>{
        set({selectedUser});
    },
    SendMessage:async(MessageData)=>{
        const { selectedUser,messages } = get();
        try{
            const res =await axiosIncteance.post(`/message/send/${selectedUser._id}`, MessageData);
            set({
                messages: [...messages,res.data],
            });
        }catch(error){
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    }
}))