import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "../utils/axiosInstance.js";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setisLoggedin, getUserData} = useContext(Context);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
          confirmPassword,
        });

        if(data.success){
          setisLoggedin(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message);
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password});
        if(data.success){
          setisLoggedin(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.chatauth}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-32 h-32 sm:w-56 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create your account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Register your account"
            : "Login to your account"}
        </p>

        <form action="" onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <br />
          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <br />
          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <br />
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="bg-transparent outline-none text-white"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          <br />
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>
          <br />
          <button className="w-full py-2.5 active:scale-90 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?&nbsp;
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?&nbsp;
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
