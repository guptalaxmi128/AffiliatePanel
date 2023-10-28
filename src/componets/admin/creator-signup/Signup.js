import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
// import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo_white.png";
import "./Signup.css";

const Signup = () => {
  const validateEmail = (rule, value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid email format");
  };

  const validatePassword = (rule, value) => {
    if (!value || value.length >= 8) {
      return Promise.resolve();
    }
    return Promise.reject("Password must be at least 8 characters long");
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  return (
    <>
      <div className="signup-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" className="login-logo" width={200} />
        </div>

        <div className="signup-form-container">
          <h2>Get started with Affiliate Indians</h2>
          <p>
            Join more than 100,000 creators who've sold over $1 billion in
            courses and coaching.
          </p>

          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{  margin: "0 auto" }} 
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "This field is required" },
                {
                  max: 30,
                  message: "This field cannot exceed 30 characters",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                { validator: validateEmail },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                { validator: validatePassword },
              ]}
            >
              <Input.Password type="password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                { validator: validatePassword },
              ]}
            >
              <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
              <Checkbox className="custom-checkbox">
                I agree to the <a href="/terms">Terms</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              {/* <Link to={"#"} style={{ textDecoration: "none" }}> */}
                <Button className="signup-btn" htmlType="submit">
                  Create Account
                </Button>
              {/* </Link> */}
            </Form.Item>
          </Form>
          <p>
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
