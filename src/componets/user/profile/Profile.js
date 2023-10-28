import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Form, Input, Breadcrumb, Button, Row, Col } from "antd";
import "./Profile.css";

const Profile = () => {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  const onFinishDetail = (values) => {
    console.log("Form values:", values);
  };
  return (
    <>
     <div className="profile-outer-container">
      <div className="profile-breadcrumb1">
        <div style={{ display: "flex", justifyContent: "space-between",alignItems: "center"  }}>
          <p className="profile-breadcrumb">Profile</p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="account-profile">
      <div className="profile-container">
        <div className="col-lg-8 col-md-12 profile-subcontainer">
          <h2>Profile</h2>
          <p>
            Please keep your contact information up to date. If we can not reach
            you, you could miss important updates. Or in some cases risk losing
            your account or have it temporarily paused.
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "First Name is required" },
                    {
                      max: 30,
                      message: "First Name cannot exceed 30 characters",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Last Name is required" },
                    {
                      max: 30,
                      message: "Last Name cannot exceed 30 characters",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="Best Email"
                  name="bestEmail"
                  rules={[
                    { required: true, message: "Best Email is required" },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input placeholder="Best Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="Mobile Number"
                  name="mobileNumber"
                  rules={[
                    { required: true, message: "Mobile Number is required" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit mobile number",
                    },
                  ]}
                >
                  <Input placeholder="Mobile Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: "Country is required" }]}
                >
                  <Input placeholder="Country" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Address is required" }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "City is required" }]}
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "State is required" }]}
                >
                  <Input placeholder="State" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={16} lg={12}>
                <Form.Item
                  label="Pincode"
                  name="pincode"
                  rules={[{ required: true, message: "Pincode is required" }]}
                >
                  <Input placeholder="Pincode" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button className="profile-btn" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-lg-4 col-md-12 profile-subcontainer1">
          <h2>Update Password</h2>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter your new password" },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Please confirm your new password" },
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            <Form.Item>
              <Button className="profile-btn" htmlType="submit">
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="account-container">
        <div className="col-lg-12 col-md-12 account-subcontainer">
          <h2>Bank Account Details</h2>
          <Form layout="vertical" onFinish={onFinishDetail}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="Account Holder Name"
                  name="accountHolderName"
                  rules={[
                    {
                      required: true,
                      message: "Account holder name is required",
                    },
                    {
                      max: 30,
                      message:
                        "Account Holder Name cannot exceed 30 characters",
                    },
                  ]}
                >
                  <Input placeholder="Account Holder Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="Account Number"
                  name="accountNumber"
                  rules={[
                    { required: true, message: "Account number is required" },
                    {
                      max: 30,
                      message: "Account Number cannot exceed 30 characters",
                    },
                    {
                      validator: (rule, value) => {
                        return new Promise((resolve, reject) => {
                          if (/^[0-9]{5,15}$/.test(value)) {
                            resolve();
                          } else {
                            reject(
                              "Please enter a valid account number (between 5 and 15 digits)."
                            );
                          }
                        });
                      },
                    },
                  ]}
                >
                  <Input placeholder="Account Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={12}>
                <Form.Item
                  label="Bank Name"
                  name="bankName"
                  rules={[
                    { required: true, message: "Bank Name is required" },
                    
                  ]}
                >
                  <Input placeholder="Bank Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="Branch Name"
                  name="branchName"
                  rules={[
                    {
                      required: true,
                      message: "Branch name is required",
                    },
                   
                  ]}
                >
                  <Input placeholder="Branch Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="IFSC Code"
                  name="ifscCode"
                  rules={[
                    { required: true, message: "IFSC Code is required" },
                   
                  
                  ]}
                >
                  <Input placeholder="IFSC Code" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={12}>
                <Form.Item
                  label="PayTM Number"
                  name="paytmNumber"
                  rules={[
                    { required: true, message: "Paytm number is required" },
                    
                  ]}
                >
                  <Input placeholder="PayTM Number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="GPay Number"
                  name="gPayNumber"
                  rules={[
                    {
                      required: true,
                      message: "GPay number is required",
                    },
                   
                  ]}
                >
                  <Input placeholder="GPay Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={6}>
                <Form.Item
                  label="PhonePe Number"
                  name="phonePeNumber"
                  rules={[
                    { required: true, message: "PhonePe number is required" },
                   
                  
                  ]}
                >
                  <Input placeholder="PhonePe Number" />
                </Form.Item>
              </Col>
             
            </Row>
            <Form.Item>
              <Button className="profile-btn" htmlType="submit">
                Update Details
              </Button>
            </Form.Item>
            
          </Form>
        </div>
      </div>
      </div>
      </div>
      
    </>
  );
};

export default Profile;
