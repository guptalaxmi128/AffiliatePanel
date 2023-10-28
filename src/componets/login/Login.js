import React from "react";
import { Form, Input, Button} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo_white.png";
import "./Login.css";

const Login = () => {
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
    console.log("Received values:", values);
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo" className="login-logo" width={200} />
      </div>

      <div className="form-container">
        <h2>Welcome to Affiliate Indians!</h2>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              { validator: validateEmail },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              { validator: validatePassword },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className="button-container">
            <Link to="#" style={{textDecoration:'none',fontFamily:'Rajdhani'}}>Forget Your Password</Link>

            <Form.Item>
            <Link to={"/user"}  style={{textDecoration:'none'}}>
              <Button className="login-btn" htmlType="submit">
                Login Now <ArrowRightOutlined />
              </Button>
              </Link>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
