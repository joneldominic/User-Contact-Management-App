import React from "react";

import { useHistory } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import styles from "./Header.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import { logout } from "../../redux/actions/authActions";

const InitialsAvatar = (props) => {
  return (
    <h3 className={classNames(globalStyles["text-white"], styles.avatar)}>
      {props.name && props.name[0].toUpperCase()}
    </h3>
  );
};

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = props;

  const onLogoutHandler = () => {
    dispatch(logout());
    history.replace("/sign-in");
  };

  return (
    <nav
      className={classNames(
        globalStyles["navbar"],
        globalStyles["navbar-dark"],
        globalStyles["bg-primary"]
      )}
    >
      <div className={globalStyles.container}>
        <span className={globalStyles["navbar-brand"]}>My Contacts</span>
        <ul className={globalStyles["navbar-nav"]}>
          <li className={classNames(globalStyles["nav-item"], styles.user)}>
            <InitialsAvatar name={user.name} />
            <h3 className={classNames(globalStyles["text-white"], styles.name)}>
              {user.name}
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
