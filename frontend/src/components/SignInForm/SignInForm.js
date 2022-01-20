import React from "react";

import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

import AuthContext from "../../context/auth-context";
import { userLogin } from "../../service/auth-service";
import FormInput from "../common/FormInput/FormInput";
import Toast from "../common/Toast/Toast";

import styles from "./SignInForm.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";

const SignInForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  useEffect(() => {
    console.log("Sign In (AuthContext IsLoggedIn): " + authCtx.isLoggedIn);
    if (authCtx.isLoggedIn) {
      history.replace("/contacts");
    }
  }, [authCtx, history]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setUsernameIsValid(
        enteredUsername.trim().length === 0 || enteredUsername.trim().length > 5
      );
      setPasswordIsValid(
        enteredPassword.trim().length === 0 || enteredPassword.trim().length > 7
      );
      setFormIsValid(
        enteredUsername.trim().length > 5 && enteredPassword.trim().length > 7
      );
    }, 200);

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

  const toastCloseHandler = () => {
    setIsLoginFailed(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      setIsLoading(true);

      const userInfo = {
        username: enteredUsername,
        password: enteredPassword,
      };

      userLogin(userInfo)
        .then((response) => {
          if (response.status === 200) {
            authCtx.onLogin(response.data);
          } else {
            alert("Something Wrong! Please Try Again");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          if (err && err.response) {
            switch (err.response.status) {
              case 401:
                console.log("Authentication Failed. Incorrect Credentials");
                setIsLoginFailed(true);
                break;
              default:
                alert("Something Wrong! Please Try Again");
            }
          } else {
            alert("Something Wrong! Please Try Again");
          }
        });
    }
  };

  return (
    <div className={globalStyles["container-fluid"]}>
      <div
        className={classNames(
          globalStyles.row,
          globalStyles["vh-100"],
          globalStyles["justify-content-center"]
        )}
      >
        <div className={classNames(globalStyles.col, globalStyles["my-auto"])}>
          <div
            className={classNames(
              globalStyles.card,
              styles.card,
              globalStyles["mx-auto"],
              globalStyles["border-0"],
              globalStyles["shadow"]
            )}
          >
            <div className={globalStyles["card-body"]}>
              <h4
                className={classNames(
                  globalStyles["card-title"],
                  globalStyles["text-center"],
                  globalStyles["mt-2"],
                  globalStyles["mb-4"]
                )}
              >
                My Contacts
              </h4>

              {isLoginFailed && (
                <Toast
                  onClose={toastCloseHandler}
                  className={globalStyles["text-danger"]}
                  message="Authentication Failed. Incorrect Credentials"
                />
              )}

              <form onSubmit={submitFormHandler}>
                <FormInput
                  id="username"
                  type="text"
                  label="Username"
                  isInvalid={!usernameIsValid}
                  invalidFeedback="Username must be atleast 6 characters long"
                  defaultValue={enteredUsername}
                  onChange={usernameChangeHandler}
                />
                <FormInput
                  id="password"
                  type="password"
                  label="Password"
                  isInvalid={!passwordIsValid}
                  invalidFeedback="Password must be [8-20] characters long"
                  defaultValue={enteredPassword}
                  onChange={passwordChangeHandler}
                />
                <button
                  type="submit"
                  className={classNames(
                    globalStyles["btn"],
                    globalStyles["btn-primary"],
                    globalStyles["w-100"],
                    globalStyles["mt-3"],
                    !formIsValid && globalStyles.disabled
                  )}
                  disabled={!formIsValid || isLoading}
                >
                  {!isLoading ? <span>Sign In</span> : <span>Loading...</span>}
                </button>
                <div
                  className={classNames(
                    globalStyles["text-center"],
                    globalStyles["mt-4"],
                    globalStyles["card-footer"],
                    globalStyles["pt-3"]
                  )}
                >
                  <p>
                    Don't have an account? <Link to="sign-up">Sign Up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
