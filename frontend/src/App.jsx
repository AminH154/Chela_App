import React,{ useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {useAuth} from "./store/useAuth.js"
import SignUp  from "../src/pages/SignUpPage/SignUp.jsx"
import LogIn from "../src/pages/LoginPage/Login.jsx"
import Home from "../src/pages/Home/Home.jsx"
import {Loader} from "lucide-react"
const App = () => {
  const {authUser,chekAuth,isChekingAuth} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    chekAuth();
  },[chekAuth])
  console.log(authUser)
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
         <Route path="/"  element={authUser ? <Home /> : navigate('/logIn') } />
         <Route path="/signUp" element={<SignUp/>} />
         <Route path="/login" element={!authUser ? <LogIn/> : navigate('/')} />

        </Routes>
      
    </div>
  )
}

export default App
