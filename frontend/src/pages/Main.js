import React from "react";

import Header from "../components/Header/Header";
import Contacts from "../components/Contacts/Contacts";

import Modal from "../core/UI/Modal";
import Snackbar from "../core/UI/Snackbar";

const Main = () => {
  return (
    <>
      {/* <Snackbar />
      <Modal /> */}
      <Header />
      <Contacts />
    </>
  );
};

export default Main;
