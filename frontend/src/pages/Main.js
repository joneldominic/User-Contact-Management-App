import React, { useContext } from "react";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header/Header";
import RightSection from "../components/RightSection/RightSection";
import LeftSection from "../components/LeftSection/LeftSection";

import AuthContext from "../context/auth-context";
import { ContactContextProvider } from "../context/contact-context";

import globalStyles from "../assets/global-styles/bootstrap.min.module.css";

const Main = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    console.log("Main (AuthContext IsLoggedIn): " + authCtx.isLoggedIn);
    if (!authCtx.isLoggedIn) {
      history.replace("/sign-in");
    }
  }, [authCtx, history]);

  return (
    <ContactContextProvider>
      <Header />
      <div className={globalStyles.container}>
        <div className={globalStyles.row}>
          <div className={globalStyles["col-lg-6"]}>
            <LeftSection />
          </div>
          <div className={globalStyles["col-lg-6"]}>
            <RightSection />
          </div>
        </div>
      </div>
    </ContactContextProvider>
  );
};

export default Main;
