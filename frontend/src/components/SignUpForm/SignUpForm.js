import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

import { connect, useDispatch } from "react-redux";
import Toast from "../common/Toast/Toast";
import FormInput from "../common/FormInput/FormInput";

import styles from "./SignUpForm.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import { addNewUser, userClear } from "../../redux/actions/userActions";

const formControlReducer = (prevState, action) => {
  switch (action.type) {
    case "username":
      return {
        ...prevState,
        username: {
          value: action.value,
          isValid: action.value.trim().length > 5,
        },
      };
    case "name":
      return {
        ...prevState,
        name: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
        },
      };
    case "password":
      return {
        ...prevState,
        password: {
          value: action.value,
          isValid: action.value.trim().length > 7,
        },
        passwordConfirmation: {
          ...prevState.passwordConfirmation,
          isValid: prevState.passwordConfirmation.value === action.value,
        },
      };
    case "passwordConfirmation":
      return {
        ...prevState,
        passwordConfirmation: {
          value: action.value,
          isValid: action.value === prevState.password.value,
        },
      };
    default:
      alert("Something Wrong! Please Try Again");
      return {
        username: { value: "", isValid: null },
        name: { value: "", isValid: null },
        password: { value: "", isValid: null },
        passwordConfirmation: { value: "", isValid: null },
      };
  }
};

const SignUpForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formIsValid, setFormIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const { isLoggedIn, isLoading, hasError, errorMessages, addNewUser } = props;

  const [formControlState, dispatchFormcontrol] = useReducer(
    formControlReducer,
    {
      username: { value: "", isValid: null },
      name: { value: "", isValid: null },
      password: { value: "", isValid: null },
      passwordConfirmation: { value: "", isValid: null },
    }
  );

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
      setFormIsValid(
        formControlState.username.isValid &&
          formControlState.name.isValid &&
          formControlState.password.isValid &&
          formControlState.passwordConfirmation.isValid
      );
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    formControlState.username.isValid,
    formControlState.name.isValid,
    formControlState.password.isValid,
    formControlState.passwordConfirmation.isValid,
  ]);

  useEffect(() => {
    return () => {
      dispatch(userClear());
    };
  }, [dispatch]);

  const inputChangeHandle = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    dispatchFormcontrol({ type, value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const userInfo = {
        name: formControlState.name.value,
        username: formControlState.username.value,
        password: formControlState.password.value,
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
                  isInvalid={!formControlState.username.isValid}
                  invalidFeedback="Username must be atleast 6 characters long"
                  defaultValue={formControlState.username.value}
                  onChange={inputChangeHandle}
                />
                <FormInput
                  id="name"
                  type="text"
                  label="Full Name"
                  isInvalid={!formControlState.name.isValid}
                  invalidFeedback="Full Name should have atleast 2 characters"
                  defaultValue={formControlState.name.value}
                  onChange={inputChangeHandle}
                />
                <FormInput
                  id="password"
                  type="password"
                  label="Password"
                  isInvalid={!formControlState.password.isValid}
                  invalidFeedback="Password must be [8-20] characters long"
                  defaultValue={formControlState.password.value}
                  onChange={inputChangeHandle}
                />

                <FormInput
                  id="passwordConfirmation"
                  type="password"
                  label="Confirm Password"
                  isInvalid={!formControlState.passwordConfirmation.isValid}
                  invalidFeedback="Password does not match"
                  defaultValue={formControlState.passwordConfirmation.value}
                  onChange={inputChangeHandle}
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
                    Already have an Account?{" "}
                    <Link to={!isLoading ? "sign-in" : "#"}>Sign In</Link>
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
