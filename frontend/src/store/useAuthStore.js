import { create } from "zustand";
import { axiosIncteance } from "../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  verifierEmail: null,
  isSignIn: false,
  islogIn: false,
  isUpdateProfile: false,
  isChekingAuth: false,
  OnLineUsers: [],
  socket: null,
  logIn: async (data) => {
    set({ islogIn: true });
    try {
      const res = await axiosIncteance.post("/auth/logIn", data);
      console.log("Full login response:", res);

      set({ authUser: res.data });
      setTimeout(() => {
        toast.success("login");
      }, 1000);
      get().connectSocket();
      return res.data;
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

      toast.success(res.data.message);
      console.log("Full signup response:", res.data);
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

  ProfileUpdate: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosIncteance.put("/auth/UpdateProfile", data);
      set({ authUser: res.data });
      toast.success("profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || !authUser.id) {
      return;
    }

    if (get().socket?.connected) {
      get().socket.disconnect();
    }

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ OnLineUsers: userIds });
    });
  },

  disSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
    }
    set({ socket: null, OnLineUsers: [] });
  },
  verfierEmail: async (value) => {
    try {
      const res = await axiosIncteance.post("/auth/verify", {
        code: value.code,
      });
      get().connectSocket();
      toast.success("compte vérifié avec succès", res.data.message);
      set({ verifierEmail: res.data });
    } catch (error) {
      toast.error(
        "Échec de la vérification de l'email",
        error.response?.data?.message || "Une erreur s'est produite"
      );
    }
  },
  handleUnload: async (value) => {
    if (value?.code) {
      const data = JSON.stringify({ code: value.code });
      console.log("Sending pending user cancel data:", data);
      navigator.sendBeacon("/auth/pendingUserCancel", data);
    }
  },
}));
