import {create}
 from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosIncteance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

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
        const { selectedUser } = get();
        try{
            const res = await axiosIncteance.post(`/message/send/${selectedUser._id}`, MessageData);
            console.log("Message sent successfully:", res.data);
            set((state) => ({
                messages: [...state.messages, res.data]
            }));
        }catch(error){
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },
    SubscribeToMessages:()=>{
        const {selectedUser} = get();
        if(!selectedUser) {
            console.log("No selected user, cannot subscribe to messages");
            return;
        }
        const socket = useAuthStore.getState().socket;
        if(!socket) {
            console.log("No socket connection available");
            return;
        }
        console.log("Subscribing to messages for user:", selectedUser._id);
        
        socket.off("newMessage");
        
        socket.on("newMessage", (newMessage) => {
            console.log("Received new message:", newMessage);
          
            if (newMessage.senderMessage === selectedUser._id || newMessage.recivedMessage === selectedUser._id) {
                set((state) => {
                   ates
                    const messageExists = state.messages.some(msg => msg._id === newMessage._id);
                    if (messageExists) {
                        return state;
                    }
                    return {
                        messages: [...state.messages, newMessage]
                    };
                });
            }
        });
    },
    UnsubscribeFromMessages:()=>{
        const socket = useAuthStore.getState().socket;
        if(socket) {
            console.log("Unsubscribing from messages");
            socket.off("newMessage");
        }
    },
}))