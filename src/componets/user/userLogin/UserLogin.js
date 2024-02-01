import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../assets/img/logo_white.png";
import "../../../componets/login/Login.css";
import { loginUser } from "../../../actions/loginUser/loginUser";

const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
    return Promise.reject("Password must be 8 characters long");
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await dispatch(loginUser(values));

      if (response.success) {
        navigate("/user/my-courses");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo" className="login-logo" width={200} />
      </div>

      <div className="form-container">
        <h2>Welcome to Affiliate Indians!</h2>
        <Form
          layout="vertical"
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              { validator: validateEmail },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              { validator: validatePassword },
            ]}
          >
            <Input.Password type="password" />
          </Form.Item>

          <div className="button-container">
            <Link
              to={{
                pathname: "/forget-password",
              }}
              style={{ textDecoration: "none", fontFamily: "Rajdhani" }}
            >
              Forget Your Password
            </Link>

            <Form.Item>
              <Button className="login-btn" htmlType="submit" loading={loading}>
                {loading ? "Logging in..." : "Login Now"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserLogin;
