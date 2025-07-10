import axios from "../utils/axiosInstance.js";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Context = createContext();

export const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setisLoggedin] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const getAuthState = async() => {
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
      if(data.success){
        setisLoggedin(true);
        await getUserData();
      }else{
        setisLoggedin(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }

  const getUserData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/data');
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
    backendUrl,
    isLoggedin,
    setisLoggedin,
    userData,
    setUserData,
    getUserData,
    loading,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
