import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/useAuthStore.js";
import SignUp from "../src/pages/SignUpPage/SignUp.jsx";
import LogIn from "../src/pages/LoginPage/Login.jsx";
import Home from "../src/pages/Home/Home.jsx";
import { Loader } from "lucide-react";
import ProfileUpdates from "./pages/UpdateProfile/UpdateProfile.jsx";
import Verifier from "./pages/VeriferEmail/Verfier.jsx";
const App = () => {
  const { authUser, chekAuth, isChekingAuth ,verifierEmail } = useAuthStore();

  useEffect(() => {
    chekAuth();
  }, [chekAuth]);

  if (!authUser && isChekingAuth) {
    return (
      <div className="loader-rotate">
        <Loader size={64} color="#596aff" />
      </div>
    );
  }

  return (
    <div data-theme="dark" className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/verify" element={!verifierEmail ? <Verifier /> : <Navigate to="/login" />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/login"
          element={!authUser ? <LogIn /> : <Navigate to="/" />}
        />
        <Route path="/profileUpdate" element={<ProfileUpdates />} />
      </Routes>
    </div>
  );
};

export default App;
