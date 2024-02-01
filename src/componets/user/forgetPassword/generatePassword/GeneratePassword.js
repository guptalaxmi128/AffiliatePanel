import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../../assets/img/logo_white.png";
import "../sendOtp/SendOtp.css";
import { generatePassword } from "../../../../actions/forgetPassword/forgetPassword";

const GeneratePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email;
  const dispatch = useDispatch();
//   console.log(email);

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
    console.log("Received values:", values);

    try {
      setLoading(true);

      const response = await dispatch(generatePassword(values));
      console.log("User Login Response:", response);

      if (response.success) {
        navigate("/");
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
    <div className="send-otp-container">
      <div className="login-logo">
        <img src={logo} alt="Logo" className="send-otp-logo" width={200} />
      </div>

      <div className="send-otp-form-container">
        <h2>Reset Your Password.</h2>
        <Form
          layout="vertical"
          name="login-form"
          initialValues={{ email:email,remember: true }}
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

          <div className="send-otp-button-container">
            <Form.Item>
              <Button
                className="send-otp-btn"
                htmlType="submit"
                loading={loading}
              >
                {loading ? "Submit..." : "Submit"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GeneratePassword;
