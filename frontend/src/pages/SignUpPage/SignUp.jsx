import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useAuthStore } from "../../store/useAuthStore";
const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    fullName: "",
    password: "",
  });
   const {signIn} = useAuthStore();



  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("handleSubmit called with values:", values);
      signIn(values);
     
  };
};

  const handleValidation = () => {
    const { fullName, email, password } = values;

   
    if (!fullName || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
     if (!validateEmail(email)) {
      toast.error("Email invalide");
      return false;
    }
    if (password.length < 6) {
      toast.error(
        "Le mot de passe doit contenir au moins 6 caractères" );
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="login_container_left">
          <img src={assets.icon} alt="Logo" height={100} width={100} />
          <p className="text">
            <span>U</span>chat_ai
          </p>
        </div>
        <div className="login_container_right">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <h1>Register</h1>
              <input
                name="fullName"
                onChange={handleChange}
                value={values.fullName}
                type="text"
                placeholder="fullName"
              />
              <input
                name="email"
                onChange={handleChange}
                value={values.email}
                type="email"
                placeholder="Email"
              />
              <input
                name="password"
                onChange={handleChange}
                value={values.password}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Register</button>
              <p onClick={() => navigate("/")}>
                have an account? <span>Click here</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
