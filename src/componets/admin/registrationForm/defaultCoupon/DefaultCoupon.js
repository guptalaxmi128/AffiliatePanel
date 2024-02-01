import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../../actions/course/course";
import { getCoupon } from "../../../../actions/addCoupon/addCoupon";
import { addCouponToCourse } from "../../../../actions/addCoupon/addCoupon";

const DefaultCoupon = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const coupon = useSelector((state) => state.coupon.coupon);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseChange = (value) => {
    setSelectedCourses([value]);
  };
  console.log(selectedCourses);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  const handleCouponChange = (value) => {
    setSelectedCoupons([value]);
  };

  const onFinish = async (values) => {
    try {
      const data = {
        couponsId: selectedCoupons,
        coursesId: selectedCourses,
        type: 'DEFAULT',
      };
      console.log(data);
      const res = await dispatch(addCouponToCourse(data));
  
      if (res.success) {
        message.success(res.message);
      } else {
        message.error("Failed to add coupon to course. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("An error occurred. Please try again.");
    }
  };
  return (
    <Form
      name="myForm"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Row gutter={16}>
        <Col lg={12} sm={24} xs={24} md={8}>
          <Form.Item
            label="Select Course"
            name="selectedCourses"
            rules={[{ required: true, message: "Please select courses" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select Course"
              onChange={handleCourseChange}
            >
              {course?.data?.map((course) => (
                <Select.Option key={course.id} value={course.id}>
                  {course.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* <Col lg={8} sm={24} xs={24} md={8}>
          {" "}
          <Form.Item
            label="Course Price"
            name="coursePrice"
            rules={[{ required: true, message: "Please enter course price" }]}
          >
            <Input />
          </Form.Item>
        </Col> */}
        <Col lg={12} sm={24} xs={24} md={8}>
          <Form.Item
            label="Select Coupon"
            name="selectedCoupon"
            rules={[{ required: true, message: "Please select coupon" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select Coupon"
              onChange={handleCouponChange}
            >
              {coupon?.data?.map((coupon) => (
                <Select.Option key={coupon.id} value={coupon.id}>
                  {coupon.couponName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button className="create-new-form-btn" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DefaultCoupon;
