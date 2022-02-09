import React from "react";
import { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaUsers, FaUser } from "react-icons/fa";

import Card from "../../core/UI/Card";
import CardContent from "../../core/UI/CardContent";
import Button from "../../core/UI/Button";

import UnderlinedInput from "../../components/common/UnderlinedInput";
import UnderlinedPasswordInput from "../../components/common/UnderlinedPasswordInput";

import AppRoutes from "../../constants/app-routes";

import { Header, Wrapper, Form, FormAction, Footer } from "./styles";

import { authenticateUser } from "../../redux/auth-slice";

const initialState = {
  username: { value: "", isValid: null },
  password: { value: "", isValid: null },
};

const SignInReducer = (state, action) => {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: {
          value: action.value,
          isValid: action.value.trim().length !== 0,
        },
      };
    case "password":
      return {
        ...state,
        password: {
          value: action.value,
          isValid: action.value.trim().length !== 0,
        },
      };
    default:
      throw Error("Something Wrong! Please Try Again");
  }
};

const SignIn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [formIsValid, setFormIsValid] = useState(false);

  const [formControlState, dispatchFormControl] = useReducer(
    SignInReducer,
    initialState
  );

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

  const inputChangeHandler = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    dispatchFormControl({ type, value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const credentials = {
        username: formControlState.username.value,
        password: formControlState.password.value,
      };

      dispatch(authenticateUser(credentials));
    }
  };

  return (
    <Wrapper>
      <Card height="380px" width="500px">
        <CardContent>
          <Header>
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
              value={formControlState.username.value}
              onChange={inputChangeHandler}
            />
            <UnderlinedPasswordInput
              id="password"
              name="password"
              placeholder="Password"
              value={formControlState.password.value}
              onChange={inputChangeHandler}
            />
            <FormAction>
              <Button variant="contained" disabled={!formIsValid || isLoading}>
                {!isLoading ? "Sign In" : "Loading..."}
              </Button>
            </FormAction>
          </Form>
          <Footer>
            <p>
              Don't have an account yet?{" "}
              <Link to={!isLoading ? AppRoutes.SignUpPage.path : "#"}>
                Sign Up
              </Link>
            </p>
          </Footer>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default SignIn;
