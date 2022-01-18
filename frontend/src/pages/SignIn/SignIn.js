import React from "react";

import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import AuthContext from "../../context/auth-context";
import { userLogin } from "../../service/auth-service";

import styles from "./SignIn.module.css";

const SignIn = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("Sign In (AuthContext IsLoggedIn): " + authCtx.isLoggedIn);
    if (authCtx.isLoggedIn) {
      history.replace("/contacts");
    }
  }, [authCtx, history]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setUsernameIsValid(
        enteredUsername.trim().length === 0 || enteredUsername.trim().length > 6
      );
      setPasswordIsValid(
        enteredPassword.trim().length === 0 || enteredPassword.trim().length > 6
      );
      setFormIsValid(
        enteredUsername.trim().length > 6 && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredUsername, enteredPassword]);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const userInfo = {
        username: enteredUsername,
        password: enteredPassword,
      };

      // const userInfo = {
      //   username: "user0001",
      //   password: "Password_1",
      // };

      userLogin(userInfo)
        .then((response) => {
          if (response.status === 200) {
            authCtx.onLogin(response.data);
          } else {
            console.log("Something Wrong!Please Try Again");
          }
        })
        .catch((err) => {
          if (err && err.response) {
            switch (err.response.status) {
              case 401:
                console.log("401 status");
                alert("Authentication Failed. Bad Credentials");
                console.log("Authentication Failed. Bad Credentials");
                break;
              default:
                console.log("Something Wrong!Please Try Again");
            }
          } else {
            console.log("Something Wrong!Please Try Again");
          }
        });
    }
  };

  return (
    <React.Fragment>
      <Card className={styles.signin}>
        <h2 className={styles.center_text}>My Contacts</h2>
        <form onSubmit={submitFormHandler}>
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
              {!usernameIsValid && (
                <span className={styles.invalidInput}>Invalid Username</span>
              )}
            </div>
            <hr className={styles.divider} />
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                defaultValue={enteredPassword}
                onChange={passwordChangeHandler}
              ></input>
              {!passwordIsValid && (
                <span className={styles.invalidInput}>Invalid Password</span>
              )}
            </div>
          </div>
          <div className={styles.marginTop20}>
            <Button
              type="submit"
              className={styles.button}
              buttonStyle="success"
              disabled={!formIsValid}
            >
              Sign In
            </Button>
          </div>
          <div className={styles.center_text}>
            <p>
              Don't have an account? <Link to="sign-up">Sign Up</Link>
            </p>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default SignIn;
