import { create } from "zustand";
import { axiosIncteance } from "../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useAuth = create((set) => ({
  authUser: null,
  isSignIn: false,
  islogIn: false,
  isUpdateProfile: false,
  isChekingAuth: false,

  logIn: async (data) => {
    set({ islogIn: true });
    try {
      const res = await axiosIncteance.post("/auth/logIn", data);
      set({ authUser: res.data });

      setTimeout(() => {
        toast.success("login");
      }, 1000);
      console.log(res.data);
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
}));
