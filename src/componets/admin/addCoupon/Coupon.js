import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  message,
} from "antd";
import moment from "moment";
import { useDispatch} from "react-redux";
import { getCourse } from "../../../actions/course/course";
import "./Coupon.css";
import { addCoupon } from "../../../actions/addCoupon/addCoupon";

const Coupon = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [couponType, setCouponType] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [amount, setAmount] = useState(null);
  const [validTill, setValidTill] = useState(null);
  const [couponName, setCouponName] = useState("");

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const handleCouponTypeChange = (value) => {
    setCouponType(value);
  };

  const handleApplyCoupon = async () => {
    try {
      await form.validateFields();
      const couponData = {
        couponName,
        couponType,
        validTill: String(validTill),
        integerValue: String(amount),
        percentageValue: String(percentage),
      };
      // console.log("Coupon data to send to the backend:", couponData);

      const res = await dispatch(addCoupon(couponData));
      console.log(res);

      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setCouponName('');
        setCouponType(null);
        setPercentage(null);
        setAmount(null);
        setValidTill(null);
      }
    } catch (error) {
      console.log("Error",error);
      console.error("Form validation failed:", error.response.data.message);
      message.error(error.response.data.message)
    }
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <>
      <Form
        name="myForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleApplyCoupon}
        form={form}
      >
        <Row gutter={16}>
          <Col lg={12} sm={24} xs={24} md={12}>
            <Form.Item
              label="Coupon Slug"
              name="couponName"
              rules={[{ required: true, message: "Please enter coupon slug" }]}
            >
              <Input onChange={(e) => setCouponName(e.target.value)} />
            </Form.Item>
          </Col>
         
          <Col lg={12} sm={24} xs={24} md={12}>
            <Form.Item
              label="Valid till"
              name="validTill"
              rules={[{ required: true, message: "Please select valid till" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => {
                  const timestamp = new Date(date).getTime();
                  const adjustedTimestamp = timestamp - 330 * 60 * 1000;
                  setValidTill(adjustedTimestamp);
                }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12} sm={24} xs={24} md={12}>
            <Form.Item
              label="Select Coupon Type"
              name="couponType"
              rules={[{ required: true, message: "Please select coupon type" }]}
            >
              <Select
                placeholder="Select coupon type"
                style={{ width: "100%" }}
                onChange={handleCouponTypeChange}
              >
                <Select.Option value="INTEGER">Add Amount</Select.Option>
                <Select.Option value="PERCENT">Add Percentage</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {couponType === "INTEGER" && (
            <Col lg={12} sm={24} xs={24} md={12}>
              <Form.Item
                label="Add Amount"
                name="amount"
                rules={[{ required: true, message: "Please enter amount" }]}
              >
                <Input onChange={(e) => setAmount(e.target.value)} />
              </Form.Item>
            </Col>
          )}
          {couponType === "PERCENT" && (
            <Col lg={12} sm={24} xs={24} md={12}>
              <Form.Item
                label="Add Percentage"
                name="percentage"
                rules={[{ required: true, message: "Please enter percentage" }]}
              >
                <Input onChange={(e) => setPercentage(e.target.value)} />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Form.Item>
          <Button className="coupon-btn" htmlType="submit">
            Apply Coupon
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Coupon;
