import React from "react";

import { useState, useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import classNames from "classnames";

import styles from "./SignInForm.module.css";
import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";
import FormInput from "../common/FormInput/FormInput";
import Toast from "../common/Toast/Toast";
import { authClearError, authenticate } from "../../redux/actions/authActions";

const initialState = {
  username: { value: "", isValid: null },
  password: { value: "", isValid: null },
};

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
    case "password":
      return {
        ...prevState,
        password: {
          value: action.value,
          isValid: action.value.trim().length > 7,
        },
      };
    default:
      alert("Something Wrong! Please Try Again");
      return { ...initialState };
  }
};

const SignInForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formIsValid, setFormIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const { isLoggedIn, isLoading, hasError, errorMessage, authenticate } = props;

  const [formControlState, dispatchFormcontrol] = useReducer(
    formControlReducer,
    initialState
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
        formControlState.username.isValid && formControlState.password.isValid
      );
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [formControlState.username.isValid, formControlState.password.isValid]);

  useEffect(() => {
    return () => {
      dispatch(authClearError());
    };
  }, [dispatch]);

  const inputChangeHandle = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    dispatchFormcontrol({ type, value });
  };

  const toastCloseHandler = () => {
    setShowError(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const credentials = {
        username: formControlState.username.value,
        password: formControlState.password.value,
      };
      authenticate(credentials);
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

              {showError && (
                <Toast
                  onClose={toastCloseHandler}
                  className={globalStyles["text-danger"]}
                  message={errorMessage}
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
                  id="password"
                  type="password"
                  label="Password"
                  isInvalid={!formControlState.password.isValid}
                  invalidFeedback="Password must be [8-20] characters long"
                  defaultValue={formControlState.password.value}
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
                    Don't have an account?{" "}
                    <Link to={!isLoading ? "sign-up" : "#"}>Sign Up</Link>
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
  const { auth } = state;
  return {
    isLoggedIn: auth.isLoggedIn,
    isLoading: auth.isLoading,
    hasError: auth.error.hasError,
    errorMessage: auth.error.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (credentials) => dispatch(authenticate(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);