import React from "react";
import { Link } from "react-router-dom";

import { FaUsers, FaUser } from "react-icons/fa";

import Card from "../../core/UI/Card";
import CardContent from "../../core/UI/CardContent";
import Button from "../../core/UI/Button";

import UnderlinedInput from "../common/UnderlinedInput";
import UnderlinedPasswordInput from "../common/UnderlinedPasswordInput";

import AppRoutes from "../../constants/app-routes";

import { Header, Wrapper, Form, FormAction, Footer } from "./styles";

const SignUp = () => {
  return (
    <Wrapper>
      <Card height="480px" width="500px">
        <CardContent>
          <Header>
            Welcome to
            <FaUsers />
            My Contacts
          </Header>
          <Form>
            <UnderlinedInput
              icon={<FaUser />}
              id="username"
              name="username"
              type="text"
              placeholder="Username"
            />
            <UnderlinedInput
              icon={<FaUser />}
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Firstname"
            />
            <UnderlinedPasswordInput
              id="password"
              name="password"
              placeholder="Password"
            />
            <UnderlinedPasswordInput
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Confirm Password"
            />
            <FormAction>
              <Button variant="contained">Sign Up</Button>
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
