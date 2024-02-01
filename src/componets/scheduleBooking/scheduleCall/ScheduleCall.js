import React, { useState } from "react";
import {
  Form,
  Select,
  DatePicker,
  Button,
  Breadcrumb,
  Col,
  Row,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import moment from "moment";
import "./ScheduleCall.css";
import { useDispatch } from "react-redux";
import { addScheduleCall } from "../../../actions/scheduleCall/scheduleCall";

const { Option } = Select;

const timeArray = [
  "11:30 AM - 11:40 AM",
  "11:40 AM - 11:50 AM",
  "11:50 AM - 12:00 PM",
  "12:00 PM - 12:10 PM",
  "12:10 PM - 12:20 PM",
  "12:20 PM - 12:30 PM",
  "12:30 PM - 12:40 PM",
  "12:40 PM - 12:50 PM",
  "12:50 PM - 1:00 PM",
  "1:00 PM - 1:10 PM",
  "1:10 PM - 1:20 PM",
  "1:20 PM - 1:30 PM",
  "1:30 PM - 1:40 PM",
  "1:40 PM - 1:50 PM",
  "1:50 PM - 2:00 PM",
  "2:00 PM - 2:10 PM",
  "2:10 PM - 2:20 PM",
  "2:20 PM - 2:30 PM",
  "2:30 PM - 2:40 PM",
  "2:40 PM - 2:50 PM",
  "2:50 PM - 3:00 PM",
  "3:00 PM - 3:10 PM",
  "3:10 PM - 3:20 PM",
  "3:20 PM - 3:30 PM",
  "3:30 PM - 3:40 PM",
  "3:40 PM - 3:50 PM",
  "3:50 PM - 4:00 PM",
  "4:00 PM - 4:10 PM",
  "4:10 PM - 4:20 PM",
  "4:20 PM - 4:30 PM",
];

const ScheduleCall = () => {
  const dispatch = useDispatch();
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [form] = Form.useForm();

  const handleSelectChange = (selectedValues) => {
    setSelectedTimes(selectedValues);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const onFinish = async (values) => {
    try {
      // console.log("Received values:", values);
      const data = {
        month: values.month,
        date: selectedDate,
        checkedTimes: selectedTimes,
        unCheckedTimes: timeArray.filter(
          (time) => !selectedTimes.includes(time)
        ),
      };
      // console.log(data);
      const res = await dispatch(addScheduleCall(data));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setSelectedTimes([]);
        setSelectedDate(null);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error in onFinish:", error.response.data.message);
      message.error(error.response.data.message);
    }
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
          <Form
            form={form}
            name="myForm"
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Row gutter={16}>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item
                  label="Month"
                  name="month"
                  rules={[{ required: true, message: "Please select a month" }]}
                >
                  <Select defaultValue="Select Month">
                    <Option value="JANUARY">January</Option>
                    <Option value="FEBRUARY">February</Option>
                    <Option value="MARCH">March</Option>
                    <Option value="APRIL">April</Option>
                    <Option value="MAY">May</Option>
                    <Option value="JUNE">June</Option>
                    <Option value="JULY">July</Option>
                    <Option value="AUGUST">August</Option>
                    <Option value="SEPTEMBER">September</Option>
                    <Option value="OCTOBER">October</Option>
                    <Option value="NOVEMBER">November</Option>
                    <Option value="DECEMBER">December</Option>
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
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setSelectedDate(dateString);
                    }}
                    disabledDate={disabledDate}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item
                  label="Select Timing"
                  name="selectTiming"
                  rules={[
                    { required: true, message: "Please select a timing" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select time intervals"
                    value={selectedTimes}
                    onChange={handleSelectChange}
                    style={{ width: "100%" }}
                    dropdownStyle={{ maxWidth: "300px", overflow: "hidden" }}
                  >
                    {timeArray.map((timeInterval) => (
                      <Option key={timeInterval} value={timeInterval}>
                        {timeInterval}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
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
