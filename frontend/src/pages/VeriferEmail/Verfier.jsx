import React, { useState } from "react";
import { useEffect } from "react";
import "./VerfierEmail.css";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";
const Verfier = () => {

  const { verfierEmail,handleUnload } = useAuthStore();
  const [value, setValue] = useState({
    code: "",
  });

  useEffect(() => {
    window.addEventListener("unload", handleUnload);
    return () => window.removeEventListener("unload", handleUnload);
  }, [value, handleUnload]);

  const handleSubmit = async () => {
    try {
      await verfierEmail(value);
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Verification failed. Please try again.");
    }
  };
  return (
    <div>
      <input
        type="number"
        onChange={(e) => setValue({ ...value, code: e.target.value })}
        placeholder="Enter the verification code"
        className="verification-input"
      />
      <button className="verification-button" onClick={handleSubmit}>
        Verify
      </button>
    </div>
  );
};

export default Verfier;
