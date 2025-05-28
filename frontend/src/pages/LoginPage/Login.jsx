import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { authUser, islogIn, logIn } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        await logIn(values);
        // Redirige vers la page d'accueil après connexion réussie
        navigate("/");
      } catch (error) {
        // L'erreur toast est déjà gérée dans useAuth
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Email invalide");
      return false;
    }
    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login">
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
              <h1>Login</h1>
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
              <button type="submit" disabled={islogIn}>
                {islogIn ? "Loading..." : "Login"}
              </button>
              <p onClick={() => navigate("/signUp")}>
                Don't have an account? <span>Click here</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;