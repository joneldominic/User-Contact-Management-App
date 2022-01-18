import React, { useContext } from "react";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header/Header";
import RightSection from "../../components/RightSection/RightSection";
import LeftSection from "../../components/LeftSection/LeftSection";

import styles from "./Main.module.css";
import AuthContext from "../../context/auth-context";
import { ContactContextProvider } from "../../context/contact-context";

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
      <div className={styles.flexContainer}>
        <LeftSection className={styles.flexItemLeft} />
        <RightSection className={styles.flexItemRight} />
      </div>
    </ContactContextProvider>
  );
};

export default Main;
