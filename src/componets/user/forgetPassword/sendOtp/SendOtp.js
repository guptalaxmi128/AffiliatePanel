import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../../assets/img/logo_white.png";
import "./SendOtp.css";
import { addSendOtp } from "../../../../actions/forgetPassword/forgetPassword";

const SendOtp = () => {
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

  const onFinish = async (values) => {
    console.log("Received values:", values);

    try {
      setLoading(true);

      const response = await dispatch(addSendOtp(values));
      console.log("User Login Response:", response);

      if (response.success) {
        navigate("/verify-otp", { state: { email: response.data.email } })
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
        <h2>Please Enter Your Registered Email ID</h2>
        <Form
          layout="vertical"
          name="login-form"
          initialValues={{  remember: true }}
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

          <div className="send-otp-button-container">
            <Form.Item>
              <Button
                className="send-otp-btn"
                htmlType="submit"
                loading={loading}
              >
                {loading ? "Get OTP..." : "Get OTP"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SendOtp;
