import { create } from "zustand";
import { axiosIncteance } from "../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSignIn: false,
  islogIn: false,
  isUpdateProfile: false,
  isChekingAuth: false,
  OnLineUsers:[],
  socket:null,
  
  logIn: async (data) => {
    set({ islogIn: true });
    try {
      const res = await axiosIncteance.post("/auth/logIn", data);
      console.log("Full login response:", res); 
      // Ensure we have the correct user ID
      const userData = res.data;
      if (!userData || !userData._id) {
        console.error("Invalid user data received:", userData);
        throw new Error("Invalid user data received from server");
      }
      
      set({ authUser: userData });
      console.log("Auth user set to:", userData);

      setTimeout(() => {
        toast.success("login");
      }, 1000);
      
      // Delay socket connection slightly to ensure state is updated
      setTimeout(() => {
        get().connectSocket();
      }, 100);
      
      return userData;
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      toast.success(
        error.response?.data?.message || "Identifiants incorrects",
        {
          position: "top-center",
        }
      );
      throw error;
    } finally {
      set({ islogIn: false });
    }
  },


chekAuth: async () => {
    set({ isChekingAuth: true });
    try {
      const res = await axiosIncteance.get("/auth/isAuth");
      set({ authUser: res.data });
      get().connectSocket();
      return res.data;
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ authUser: null });
      return null;
    } finally {
      set({ isChekingAuth: false });
    }
  },
  logOut: async () => {
    try {
      await axiosIncteance.post("/auth/logOut");
      set({ authUser: null });
      toast.success("loged out sucessfuly");
      get().disSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  signIn: async (data) => {
    set({ isSignIn: true });
    try {
      const res = await axiosIncteance.post("/auth/signUp", data);
      set({ authUser: res.data });
      toast.success("Compte créé avec succès", {
        autoClose: 2000,
        position: "top-center",
      });
      get().connectSocket();
      return res.data;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Erreur lors de la création du compte",
        {
          position: "top-center",
        }
      );
      throw error;
    } finally {
      set({ isSignIn: false });
    }
  },


  ProfileUpdate : async(data)=>{
    set({isUpdateProfile :true});
    try {
       const res =await axiosIncteance.put("/auth/UpdateProfile",data);
      set({authUser:res.data});
      toast.success("profile updated successfully");
      
    } catch (error) {
      toast.error(error.response.data.message)
      
    }finally{
      set({isUpdateProfile : false})
    }
  },
  connectSocket :()=>{
    const {authUser}=get();
    if (!authUser) {
      return;
    }
    if (!authUser.id) {
      return;
    }

    if (get().socket?.connected) {
      console.log("Socket already connected");
      return;
    }

    console.log("Attempting to connect socket with user ID:", authUser.id);
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id
      },
      transports: ['websocket'],
      reconnection: true
    });

    socket.on('connect', () => {
      console.log("Socket connected successfully");
    });

    socket.on('connect_error', (error) => {
      console.error("Socket connection error:", error);
    });

    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ OnLineUsers : userIds });
      console.log("Online users:", userIds);
    });
  },
  disSocket:()=>{
    if (get().socket?.connected) get().socket.disconnect();
    set({ socket: null });
  }
}));
