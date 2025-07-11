import axiosInstance from "../utils/axiosInstance.js";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [isLoggedin, setisLoggedin] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/is-auth");
      if (data.success) {
        setisLoggedin(true);
        await getUserData();
      } else {
        setisLoggedin(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
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
