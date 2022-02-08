import React from "react";
import { useReducer, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FaUsers, FaUser, FaUserTie } from "react-icons/fa";

import Card from "../../core/UI/Card";
import CardContent from "../../core/UI/CardContent";
import Button from "../../core/UI/Button";

import UnderlinedInput from "../../components/common/UnderlinedInput";
import UnderlinedPasswordInput from "../../components/common/UnderlinedPasswordInput";

import AppRoutes from "../../constants/app-routes";
import { addNewUser, userActions } from "../../redux/user-slice";

import { Header, Wrapper, Form, FormAction, Footer } from "./styles";

const initialState = {
  username: { value: "", isValid: null, hasInput: false },
  name: { value: "", isValid: null, hasInput: false },
  password: { value: "", isValid: null, hasInput: false },
  passwordConfirmation: { value: "", isValid: null, hasInput: false },
};

const SignUpReducer = (prevState, action) => {
  switch (action.type) {
    case "username":
      return {
        ...prevState,
        username: {
          value: action.value,
          isValid: action.value.trim().length >= 6,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "name":
      return {
        ...prevState,
        name: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "password":
      return {
        ...prevState,
        password: {
          value: action.value,
          isValid: action.value.trim().length >= 8,
          hasInput: action.value.trim().length > 0,
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
          hasInput: action.value.trim().length > 0,
        },
      };
    default:
      throw Error("Something Wrong! Please Try Again");
  }
};

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading, userAdded } = useSelector((state) => state.user);

  const [formIsValid, setFormIsValid] = useState(false);

  const [formControlState, dispatchFormcontrol] = useReducer(
    SignUpReducer,
    initialState
  );

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
    if (userAdded) {
      history.replace("/sign-in");
      dispatch(userActions.clearState());
    }
  }, [history, userAdded, dispatch]);

  const inputChangeHandler = (event) => {
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

      dispatch(addNewUser(userInfo));
    }
  };

  return (
    <Wrapper>
      <Card height="480px" width="500px">
        <CardContent>
          <Header>
            Welcome to
            <FaUsers />
            My Contacts
          </Header>
          <Form onSubmit={submitFormHandler}>
            <UnderlinedInput
              icon={<FaUser />}
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              isInvalid={
                !formControlState.username.isValid &&
                formControlState.username.hasInput
              }
              invalidFeedback="Username must be atleast 6 characters"
              value={formControlState.username.value}
              onChange={inputChangeHandler}
            />
            <UnderlinedInput
              icon={<FaUserTie />}
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              isInvalid={
                !formControlState.name.isValid && formControlState.name.hasInput
              }
              invalidFeedback="Name must be atleast 2 characters"
              value={formControlState.name.value}
              onChange={inputChangeHandler}
            />
            <UnderlinedPasswordInput
              id="password"
              name="password"
              placeholder="Password"
              isInvalid={
                !formControlState.password.isValid &&
                formControlState.password.hasInput
              }
              invalidFeedback="Password must be [8-20] characters"
              value={formControlState.password.value}
              onChange={inputChangeHandler}
            />
            <UnderlinedPasswordInput
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              isInvalid={
                !formControlState.passwordConfirmation.isValid &&
                formControlState.passwordConfirmation.hasInput
              }
              invalidFeedback="Password does not match"
              value={formControlState.passwordConfirmation.value}
              onChange={inputChangeHandler}
            />
            <FormAction>
              <Button variant="contained" disabled={!formIsValid || isLoading}>
                {!isLoading ? "Sign Up" : "Loading..."}
              </Button>
            </FormAction>
          </Form>
          <Footer>
            <p>
              Already have an account?{" "}
              <Link to={AppRoutes.SignInPage.path}>Sign In</Link>
            </p>
          </Footer>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default SignUp;
