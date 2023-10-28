import React from "react";
import {
  Form,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Breadcrumb,
  Col,
  Row,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import moment from "moment";
import "./ScheduleCall.css";

const { Option } = Select;

const ScheduleCall = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <>
      <div className="call-breadcrumb">
        <div className="call-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Schedule Calls
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Schedule Calls</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="call-container">
        <div className="call-subcontainer">
          <h2>Schedule Calls</h2>
          <Form name="myForm" onFinish={onFinish}   labelCol={{ span: 24 }} 
      wrapperCol={{ span: 24 }}  >
            <Row gutter={16}>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item
                  label="Month"
                  name="month"
                  rules={[{ required: true, message: "Please select a month" }]}
                
                >
                   <Select defaultValue="Select Month">

                    <Option value="1">January</Option>
                    <Option value="2">February</Option>
                    <Option value="3">March</Option>
                    <Option value="4">April</Option>
                    <Option value="5">May</Option>
                    <Option value="6">June</Option>
                    <Option value="7">July</Option>
                    <Option value="8">August</Option>
                    <Option value="9">September</Option>
                    <Option value="10">October</Option>
                    <Option value="11">November</Option>
                    <Option value="12">December</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: "Please select a date" }]}
                >
                  <DatePicker
                    disabledDate={(current) => current && current < moment()}
                  
                    className="date-field"
                  />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item
                  label="Time Range"
                  name="timeRange"
                  rules={[
                    { required: true, message: "Please select a time range" },
                  ]}
                >
                  <TimePicker.RangePicker
                  
                     className="timing" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item >
              <Button className="schedule-call-btn" htmlType="submit">
                Hold a Appointment
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ScheduleCall;
