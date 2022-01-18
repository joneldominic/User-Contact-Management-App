import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import AuthContext from "../../context/auth-context";
import { addNewUser } from "../../service/auth-service";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [eneteredName, setEnteredName] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPassConfirmation, setEnteredPassConfirmation] = useState("");

  useEffect(() => {
    console.log("Sign Up (AuthContext IsLoggedIn): " + authCtx.isLoggedIn);
    if (authCtx.isLoggedIn) {
      history.replace("/contacts");
    }
  }, [authCtx, history]);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passConfirmationChangeHandler = (event) => {
    setEnteredPassConfirmation(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (enteredPassword === enteredPassConfirmation) {
      const userInfo = {
        name: eneteredName,
        username: enteredUsername,
        password: enteredPassword,
      };
      console.log(userInfo);
      addNewUser(userInfo)
        .then((response) => {
          console.log("Signup Successful");
          history.replace("/sign-in");
        })
        .catch((err) => {
          console.log(err.response);
          alert(
            err.response.data.apierror.subErrors.map(
              (_error) => `field: ${_error.field}  |  message: ${_error.message}\n\n`
            )
          );
        });
    }
  };

  return (
    <Card className={styles.login}>
      <h2 className={styles.center_text}>My Contacts</h2>
      <form onSubmit={onSubmitHandler}>
        <div className={styles.control}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              defaultValue={enteredUsername}
              onChange={usernameChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter Full Name"
              defaultValue={eneteredName}
              onChange={nameChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              defaultValue={enteredPassword}
              onChange={passwordChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              defaultValue={enteredPassConfirmation}
              onChange={passConfirmationChangeHandler}
            ></input>
          </div>
        </div>
        <div className={styles.marginTop20}>
          <Button type="submit" className={styles.button} buttonStyle="success">
            Sign up
          </Button>
        </div>
        <div className={styles.center_text}>
          <p>
            Already have an Account? <Link to="sign-in">Sign In</Link>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
