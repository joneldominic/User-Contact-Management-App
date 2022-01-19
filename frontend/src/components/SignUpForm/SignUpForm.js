import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

import AuthContext from "../../context/auth-context";
import { addNewUser } from "../../service/auth-service";
import Toast from "../common/Toast/Toast";
import FormInput from "../common/FormInput/FormInput";

import styles from "./SignUpForm.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";

const SignUpForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [enteredPassConfirmation, setEnteredPassConfirmation] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    console.log("Sign Up (AuthContext IsLoggedIn): " + authCtx.isLoggedIn);
    if (authCtx.isLoggedIn) {
      history.replace("/contacts");
    }
  }, [authCtx, history]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setUsernameIsValid(
        enteredUsername.trim().length === 0 || enteredUsername.trim().length > 5
      );
      setEnteredNameIsValid(
        enteredName.trim().length === 0 || enteredName.trim().length >= 2
      );
      setPasswordIsValid(
        enteredPassword.trim().length === 0 || enteredPassword.trim().length > 7
      );

      setIsPasswordMatch(
        enteredPassConfirmation.trim().length === 0 ||
          enteredPassword === enteredPassConfirmation
      );

      setFormIsValid(
        enteredUsername.trim().length > 5 &&
          enteredName.trim().length > 2 &&
          enteredPassword.trim().length > 7 &&
          enteredPassword === enteredPassConfirmation
      );
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredUsername, enteredName, enteredPassword, enteredPassConfirmation]);

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

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      setIsLoading(true);

      const userInfo = {
        name: enteredName,
        username: enteredUsername,
        password: enteredPassword,
      };

      console.log(userInfo);

      addNewUser(userInfo)
        .then((response) => {
          if (response.status === 201) {
            console.log("Signup Successful");
            history.replace("/sign-in");
          } else {
            alert("Something Wrong! Please Try Again");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                console.log("Invalid User Details");
                console.log(err.response);
                setErrorList(
                  err.response.data.apierror.subErrors.map(
                    (_error) => `${_error.field} ${_error.message}`
                  )
                );
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

  const toastCloseHandler = () => {
    setErrorList([]);
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
                Create Account
              </h4>

              {errorList.length !== 0 &&
                errorList.map((_err) => {
                  return (
                    <Toast
                      onClose={toastCloseHandler}
                      className={globalStyles["text-danger"]}
                      message={_err}
                    />
                  );
                })}

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
                  id="name"
                  type="text"
                  label="Full Name"
                  isInvalid={!enteredNameIsValid}
                  invalidFeedback="Full Name should have atleast 2 characters"
                  defaultValue={enteredName}
                  onChange={nameChangeHandler}
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

                <FormInput
                  id="passwordConfirmation"
                  type="password"
                  label="Confirm Password"
                  isInvalid={!isPasswordMatch}
                  invalidFeedback="Password does not match"
                  defaultValue={enteredPassConfirmation}
                  onChange={passConfirmationChangeHandler}
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
                  {!isLoading ? <span>Sign Up</span> : <span>Loading...</span>}
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
                    Already have an Account? <Link to="sign-in">Sign In</Link>
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

export default SignUpForm;
