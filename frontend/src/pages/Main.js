import React from "react";

import { useEffect } from "react";
import Header from "../components/Header/Header";
import RightSection from "../components/RightSection/RightSection";
import LeftSection from "../components/LeftSection/LeftSection";
import { ContactContextProvider } from "../context/contact-context";

import globalStyles from "../assets/global-styles/bootstrap.min.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../redux/actions/contactActions";

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getContacts(user.id));
  }, [dispatch, user]);

  return (
    <ContactContextProvider>
      <Header user={user} />
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
