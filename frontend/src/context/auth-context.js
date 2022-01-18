import React, { useState, useEffect } from "react";
import { fetchUserData } from "../service/auth-service";

const AuthContext = React.createContext({
  isLoggedIn: false,
  authUser: {},
  onLogout: () => {},
  onLogin: ({ username, password }) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    const _token = localStorage.getItem("TOKEN");
    console.log("AuthContext");
    if (_token !== null) {
      fetchUserData()
        .then((response) => {
          setAuthUser(response.data);
          setIsLoggedIn(true);
        })
        .catch((e) => {
          console.log("Invalid Token");
          if (_token !== null) {
            alert("Invalid Token");
          }
          localStorage.clear();
          setIsLoggedIn(false);
        });
    }
  }, []);

  const logoutHandler = () => {
    console.log("Logged out From Auth Context");
    localStorage.removeItem("TOKEN");
    setIsLoggedIn(false);
  };

  const loginHandler = (data) => {
    console.log("Logged In From Auth Context");
    localStorage.setItem("TOKEN", data.token);

    fetchUserData()
      .then((response) => {
        setAuthUser(response.data);
        setIsLoggedIn(true);
      })
      .catch((e) => {
        console.log("Invalid Token");
        alert("Invalid Token");
        localStorage.clear();
        setIsLoggedIn(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        authUser: authUser,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
