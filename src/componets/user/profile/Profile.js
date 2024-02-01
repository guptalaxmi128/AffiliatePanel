import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Form, Input, Breadcrumb, Button, Row, Col, message } from "antd";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../actions/loginUser/loginUser";
import { changePassword } from "../../../actions/changeUserPassword/changeUserPassword";
import {
  addUserAccount,
  getUserAccount,
  updateUserAccount,
} from "../../../actions/userAccount/userAccount";

const Profile = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [accountData, setAccountData] = useState("");
  const users = useSelector((state) => state.loginUser.users);
  const account = useSelector((state) => state.userAccount.account);
  const user = users?.data;
  const name = user?.name;
  console.log(accountData);

  function extractFirstAndLastName(name) {
    if (name) {
      const nameParts = name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      return { firstName, lastName };
    }
    return { firstName: "", lastName: "" };
  }

  const { firstName, lastName } = extractFirstAndLastName(name);
  // console.log(firstName);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserAccount());
  }, [dispatch]);

  useEffect(() => {
    if (account.data) {
      setAccountData(account.data);
      setId(account.data.id);
    }
  }, [account.data]);
  console.log(accountData);

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);

      const email = user?.email;
      if (email) {
        const requestData = {
          email: email,
          newPassword: values.newPassword,
          previousPassword: values.previousPassword,
        };

        const res = await dispatch(changePassword(requestData));
        if (res.success) {
          message.success(res.message);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("Failed to change password. Please try again.");
    }
  };

  const validatePassword = (rule, value) => {
    if (!value || value.length >= 8) {
      return Promise.resolve();
    }
    return Promise.reject("Password must be at least 8 characters long");
  };

  const onFinish = async (values) => {
    try {
      // console.log("Form values:", values);
      const userInfo = {
        name: `${values.firstName} ${values.lastName}`,
        mobileNumber: values.mobileNumber,
        country: values.country,
        state: values.state,
        city: values.city,
        address: values.address,
        pinCode: values.pinCode,
      };
      console.log(userInfo);
      const res = await dispatch(updateUser(userInfo));
      // console.log(res)
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message || "An error occurred");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("An error occurred while updating user");
    }
  };

  const onFinishDetail = async (values) => {
    try {
      console.log("Form values:", values);
      const res = await dispatch(addUserAccount(values));

      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  const updateDetail = async (values) => {
    try {
      console.log("Form values:", values);
      const data = {
        id: id,
        ...values,
      };
      const res = await dispatch(updateUserAccount(data));

      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.log("error", error);
      console.error("Error submitting form:", error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="profile-outer-container">
        <div className="profile-breadcrumb1">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="profile-breadcrumb">Profile</p>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/user">
                  <HomeOutlined />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Profile</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="account-profile">
          <div className="profile-container">
            <div className="col-lg-8 col-md-8 profile-subcontainer">
              <h2>Profile</h2>
              <p>
                Please keep your contact information up to date. If we can not
                reach you, you could miss important updates. Or in some cases
                risk losing your account or have it temporarily paused.
              </p>
              {user && (
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                    firstName: firstName,
                    lastName: lastName,
                    bestEmail: user?.email,
                    mobileNumber: user?.mobileNumber,
                    country: user?.country,
                    state: user?.state,
                    city: user?.city,
                    address: user?.address,
                    pinCode: user?.pinCode,
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={6}>
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
                    <Col xs={24} sm={24} md={12} lg={6}>
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
                    <Col xs={24} sm={24} md={24} lg={12}>
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
                        <Input placeholder="Best Email" disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item
                        label="Mobile Number"
                        name="mobileNumber"
                        rules={[
                          {
                            required: true,
                            message: "Mobile Number is required",
                          },
                          {
                            pattern: /^[0-9]{10}$/,
                            message:
                              "Please enter a valid 10-digit mobile number",
                          },
                        ]}
                      >
                        <Input placeholder="Mobile Number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                          { required: true, message: "Country is required" },
                        ]}
                      >
                        <Input placeholder="Country" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                          { required: true, message: "Address is required" },
                        ]}
                      >
                        <Input placeholder="Address" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item
                        label="City"
                        name="city"
                        rules={[
                          { required: true, message: "City is required" },
                        ]}
                      >
                        <Input placeholder="City" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item
                        label="State"
                        name="state"
                        rules={[
                          { required: true, message: "State is required" },
                        ]}
                      >
                        <Input placeholder="State" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Form.Item
                        label="PinCode"
                        name="pinCode"
                        rules={[
                          { required: true, message: "Pincode is required" },
                        ]}
                      >
                        <Input placeholder="PinCode" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button className="profile-btn" htmlType="submit">
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
            <div className="col-lg-4 col-md-4 profile-subcontainer1">
              <h2>Update Password</h2>
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Previous Password"
                  name="previousPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                    { validator: validatePassword },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password",
                    },
                    { validator: validatePassword },
                  ]}
                >
                  <Input.Password placeholder="New Password" />
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
              {accountData && (
                <Form
                  layout="vertical"
                  onFinish={updateDetail}
                  initialValues={{
                    accountHolderName: accountData.accountHolderName,
                    accountNumber: accountData.accountNumber,
                    bankName: accountData.bankName,
                    branchName: accountData.branchName,
                    IFSCCode: accountData.IFSCCode,
                    payTMNumber: accountData.payTMNumber,
                    gPayNumber: accountData.gPayNumber,
                    phonePayNumber: accountData.phonePayNumber,
                    UPIID: accountData.UPIID,
                  }}
                >
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
                          {
                            required: true,
                            message: "Account number is required",
                          },
                          {
                            max: 30,
                            message:
                              "Account Number cannot exceed 30 characters",
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
                        name="IFSCCode"
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
                        name="payTMNumber"
                        rules={[
                          {
                            required: true,
                            message: "Paytm number is required",
                          },
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
                        name="phonePayNumber"
                        rules={[
                          {
                            required: true,
                            message: "PhonePe number is required",
                          },
                        ]}
                      >
                        <Input placeholder="PhonePe Number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={12}>
                      <Form.Item
                        label="UPI Id"
                        name="UPIID"
                        rules={[
                          {
                            required: true,
                            message: "UPI Id is required",
                          },
                        ]}
                      >
                        <Input placeholder="UPI Id" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button className="profile-btn" htmlType="submit">
                      Update Details
                    </Button>
                  </Form.Item>
                </Form>
              )}
              {accountData === "" && (
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
                          {
                            required: true,
                            message: "Account number is required",
                          },
                          {
                            max: 30,
                            message:
                              "Account Number cannot exceed 30 characters",
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
                        name="IFSCCode"
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
                        name="payTMNumber"
                        rules={[
                          {
                            required: true,
                            message: "Paytm number is required",
                          },
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
                        name="phonePayNumber"
                        rules={[
                          {
                            required: true,
                            message: "PhonePe number is required",
                          },
                        ]}
                      >
                        <Input placeholder="PhonePe Number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={12}>
                      <Form.Item
                        label="UPI Id"
                        name="UPIID"
                        rules={[
                          {
                            required: true,
                            message: "UPI Id is required",
                          },
                        ]}
                      >
                        <Input placeholder="UPI Id" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button className="profile-btn" htmlType="submit">
                      Add Details
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
