import { createContext } from "react";
import { useState } from "react";
import axios from 'axios';

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignupState] = useState(false);

  const [user, setUser] = useState(null);

  const saveUser = (formData) => {
    const userData = {
      username: formData.username,
      email: formData.email
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Optional: set state too
  };

  const getUserDetails = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <authContext.Provider
      value={{
        loginState,
        signupState,
        user,
        setLoginState,
        setSignupState,
        saveUser,
        getUserDetails,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
