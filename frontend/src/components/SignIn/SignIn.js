import React from "react";
import { Link } from "react-router-dom";

import { FaUsers, FaUser } from "react-icons/fa";

import Card from "../../core/UI/Card";
import CardContent from "../../core/UI/CardContent";
import Button from "../../core/UI/Button";

import InputUnderlined from "../common/InputUnderlined";
import PasswordInputUnderlined from "../common/PasswordInputUnderlined";

import AppRoutes from "../../constants/app-routes";

import { Header, Wrapper, Form, FormAction, Footer } from "./styles";

const SignIn = () => {
  return (
    <Wrapper>
      <Card height="380px" width="500px">
        <CardContent>
          <Header>
            <FaUsers />
            My Contacts
          </Header>
          <Form>
            <InputUnderlined
              icon={<FaUser />}
              id="username"
              name="username"
              type="text"
              placeholder="Username"
            />
            <PasswordInputUnderlined
              id="password"
              name="password"
              placeholder="Password"
            />
            <FormAction>
              <Button variant="contained">Sign In</Button>
            </FormAction>
          </Form>
          <Footer>
            <p>
              Don't have an account yet?{" "}
              <Link to={AppRoutes.SignUpPage.path}>Sign Up</Link>
            </p>
          </Footer>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default SignIn;
