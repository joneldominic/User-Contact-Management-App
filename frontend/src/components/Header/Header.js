import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../../context/auth-context";

import styles from "./Header.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onLogoutHandler = () => {
    authCtx.onLogout();
    history.replace("/sign-in");
  };

  const InitialsAvatar = (props) => {
    return (
      <h3 className={classNames(globalStyles["text-white"], styles.avatar)}>
        {props.name && props.name[0].toUpperCase()}
      </h3>
    );
  };

  return (
    <nav
      className={classNames(
        globalStyles["navbar"],
        globalStyles["navbar-dark"],
        globalStyles["bg-dark"]
      )}
    >
      <div className={globalStyles.container}>
        <span className={globalStyles["navbar-brand"]}>My Contacts</span>
        <ul className={globalStyles["navbar-nav"]}>
          <li className={classNames(globalStyles["nav-item"], styles.user)}>
            <InitialsAvatar name={authCtx.authUser.name} />
            <h3 className={classNames(globalStyles["text-white"], styles.name)}>
              {authCtx.authUser.name}
            </h3>
            <FaSignOutAlt
              className={styles.signout}
              onClick={onLogoutHandler}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
