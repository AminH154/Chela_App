import {create} from "zustand"
import { axiosIncteance } from "../lib/axios"
import { toast } from "react-toastify";
 
 

export const useAuth = create((set) =>({
    authUser : null,
    isSignIn :false,
    islogIn:false,
    isUpdateProfile:false,
    isChekingAuth:false,



    chekAuth : async () =>{
        try{
            const res = await axiosIncteance.get('/auth/isAuth');
            set({authUser :res.data});
        }catch(error){
            console.log(error);
            set({authUser:null});
        }finally{
            set({authUser :false});
        }
    },

    signIn : async (data) =>{
        set({isSignIn : true})
        try {
            const res = await axiosIncteance.post('/auth/signUp',data);
            console.log(res)
            set({authUser :res.data}) 
            toast.success('account created with success')    
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("erreur",error.Message)
            
        }finally{
            set({isSignIn : false})
        }
    }

}))