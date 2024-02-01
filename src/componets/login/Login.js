import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/img/logo_white.png";
import { loginAdmin } from "../../actions/addAdmin/addAdmin";
import "./Login.css";


const Login = () => {
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
    // console.log("Received values:", values);

    try {
      setLoading(true);

      const response = await dispatch(loginAdmin(values));
      // console.log("Admin Login Response:", response);

      if (response.success) {
        navigate("/admin/dashboard");
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

  // console.log(currentUserType)

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
          {/* <Form.Item label="Select User Type" name="userType">
            <Row gutter={16}>
              <Col lg={24} sm={24} xs={24}>
                <Select
                  placeholder="Select Option"
                  value={currentUserType}
                  onChange={handleUserTypeChange}
                >
                  {userTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Form.Item> */}

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

          {/* <Form.Item
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
          </Form.Item> */}

          <div className="button-container">
            <Link
              to="#"
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

export default Login;
