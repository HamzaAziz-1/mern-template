/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUser = (userData) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser(null);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/users/showMe`,
        {
          withCredentials: true,
        }
      );
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/auth/logout`, {
        withCredentials: true,
      });
      removeUser();
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        user,
        saveUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
