import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import axios from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(Context);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const inputHandler = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.chatauth}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-32 h-32 sm:w-56 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-center text-2xl font-semibold mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your 6 digit code sent to your email id
        </p>
        <div className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => inputHandler(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
        </div>
        <button className="cursor-pointer active:scale-95 active:brightness-90 w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
