import {create}
 from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosIncteance } from "../lib/axios";
export const useChatStore = create((set)=>({
    messages :[],
    users:[],
    selectedUser: null,
    isUserLoding: false,
    isMessagesLoading: false,

    getUsers : async()=>{
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
            set({messages: res.data});

    }catch(error){
        toast.error(error.response?.data?.message || "Failed to load messages");

    }finally{
        set({isMessagesLoading: false});
    }
    },
    setSelectedUser:(selectedUser)=>{
        set({selectedUser});
    }
}))