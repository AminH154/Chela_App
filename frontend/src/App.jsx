import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from 'react';
import  {useAuth} from "./store/useAuth.js"
import SignUp  from "../src/pages/SignUpPage/SignUp.jsx"
import {Loader} from "lucide-react"
const App = () => {
  const {authUser,chekAuth,isChekingAuth} = useAuth();

  useEffect(()=>{
    chekAuth();
  },[chekAuth])
  if(isChekingAuth && !authUser){
    return <div>
         <Loader/>
    </div>
  }

  console.log(authUser)
  return (
   
    <div className='App'>
       <ToastContainer/>
       <Routes>
         <Route path="/" element={<SignUp />} />
         <Route path="/home" element={<Home/>} />

        </Routes>
      
    </div>
  )
}

export default App
