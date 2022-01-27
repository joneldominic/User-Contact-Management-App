import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

import { connect } from "react-redux";
import Toast from "../common/Toast/Toast";
import FormInput from "../common/FormInput/FormInput";

import styles from "./SignUpForm.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import { addNewUser } from "../../redux/actions/userActions";

const SignUpForm = (props) => {
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
  const [showError, setShowError] = useState(false);

  const { isLoggedIn, isLoading, hasError, errorMessages, addNewUser } = props;

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/contacts");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    setShowError(hasError);
  }, [hasError]);

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
      const userInfo = {
        name: enteredName,
        username: enteredUsername,
        password: enteredPassword,
      };

      addNewUser(userInfo, () => {
        history.replace("/sign-in");
      });
    }
  };

  const toastCloseHandler = () => {
    setShowError(false);
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
              {showError && (
                <Toast
                  onClose={toastCloseHandler}
                  className={globalStyles["text-danger"]}
                  message={errorMessages}
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

const mapStateToProps = (state) => {
  const { auth, user } = state;
  return {
    isLoggedIn: auth.isLoggedIn,
    isLoading: user.isLoading,
    hasError: user.error.hasError,
    errorMessages: user.error.errorMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (userInfo, callback) =>
      dispatch(addNewUser(userInfo, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
