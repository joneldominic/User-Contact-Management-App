import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import styles from "./Header.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../../context/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onLogoutHandler = () => {
    authCtx.onLogout();
    history.replace("/sign-in");
  };

  return (
    <div className={styles.topnav}>
      <h3 className={styles.floatLeft}>My Contacts</h3>
      <div className={styles.user}>
        <img
          src={require("../../assets/images/img_avatar.png").default}
          alt="Avatar"
          className={styles.avatar}
        />
        <h3>{authCtx.authUser.name}</h3>
        <FaSignOutAlt className={styles.signout} onClick={onLogoutHandler} />
      </div>
    </div>
  );
};

export default Header;
