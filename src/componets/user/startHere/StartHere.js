import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button, message, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import rank from "../../../assets/img/affiliate.jpg";
import "./StartHere.css";

const StartHere = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  return (
    <div>
      <div style={{ padding: "10px", background: "#fff" }}>
        <div className="header-container">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Welcome to Affiliate Section
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Start Here</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="blueprint-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="blueprint-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Affiliate Indians</h2>
                <p>
                Complete the assignment below and get Your Rankings.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="blueprint-subcontainer1">
              <img src={rank} alt="rank" className="rank-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 start-here-container">
            <div className="start-here-nested-container">
              <h2>Your Assignments</h2>

              <div className="inner-sub-container">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">ITEM</p>
                        <p className="content2">1</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={16} lg={24} xl={20}>
                    <Form
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      form={form}
                    >
                      <Col span={24}>
                        <Form.Item
                          label={
                            <p
                              style={{
                                fontSize: "16px",
                                fontFamily: "Rajdhani",
                              }}
                            >
                              "Enter a brief bio of yourself we will use on the
                              Leaderboards section when you begin to crush it!"
                            </p>
                          }
                          name="bios"
                        />
                      </Col>

                      <Col span={24}>
                        <Form.Item name="bios">
                          <Input.TextArea
                            placeholder="Enter Your Bios"
                            rows={4}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button className="start-here-btn">Save</Button>
                        </Form.Item>
                      </Col>
                    </Form>
                  </Col>
                </Row>
              </div>
              <div className="inner-sub-container">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">ITEM</p>
                        <p className="content2">2</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={16} lg={24} xl={20}>
                    <Form
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      form={form}
                    >
                      <Col span={24}>
                        <Form.Item
                          label={
                            <p
                              style={{
                                fontSize: "16px",
                                fontFamily: "Rajdhani",
                              }}
                            >
                              Go set up a gravatar profile and photo of yourself
                              we can use to show you off on the leaderboards!
                            </p>
                          }
                        />
                      </Col>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={6} lg={6}>
                          <Form.Item>
                            <Button className="gravatar-btn">
                              SET UP GRAVATAR
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={14} lg={14}>
                          <Form.Item>
                            <Input
                              placeholder="Email"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={4} lg={4}>
                          <Form.Item>
                            <Button className="gravatar-btn">SAVE</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartHere;
