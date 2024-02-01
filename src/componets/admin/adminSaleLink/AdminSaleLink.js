import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../actions/course/course";
import { addAdminSaleLink } from "../../../actions/addAdminSaleLink/addAdminSaleLink";
import "./AdminSaleLink.css";

const { Option } = Select;

const AdminSaleLink = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const course = useSelector((state) => state.course.course);

  useEffect(() => {
    if (course.data) {
      setCourses(course.data);
    }
  }, [course.data]);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const handleCourseChange = (value) => {
    console.log(value);
    const course = courses.find((course) => course.id === value);
    setTitle(course ? course.title : "Unknown Title");
  };

  console.log(title);

  const handleChange = async (values) => {
    // console.log(values);
    try {
      const data = {
        marketingTag: values.marketingTag,
        originalLink: values.originalLink,
        courseId: values.course,
        linkType: values.linkType,
      };

      // console.log(data);
      const res = await dispatch(addAdminSaleLink(data));
      console.log("Response:", res);
      if (res.success) {
        message.success(res.message);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error.response.data.message);
      message.error("Error in adding data");
    }
  };
  return (
    <>
      <div className="admin-sale-link-breadcrumb">
        <div className="admin-sale-link-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Add Link (Sales,Checkout etc)
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Link</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="admin-sale-link-container">
        <div className="admin-sale-link-subcontainer">
          <Form
            form={form}
            name="myForm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={handleChange}
          >
            <Row gutter={16}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Domain"
                  name="originalLink"
                  rules={[
                    {
                      required: true,
                      message: "Please enter domain",
                    },
                  ]}
                >
                  <Input placeholder="Enter domain" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Select a Course"
                  name="course"
                  rules={[
                    {
                      required: true,
                      message: "Please select a course",
                    },
                  ]}
                >
                  <Select
                    defaultValue="Select Course"
                    style={{ width: "100%" }}
                    onChange={handleCourseChange}
                  >
                    <Option value="Select Course" disabled>
                      Select Course
                    </Option>
                    {courses.map((course) => (
                      <Option
                        key={course.id}
                        value={course.id}
                        style={{ color: "black" }}
                      >
                        {course.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Select link type"
                  name="linkType"
                  rules={[
                    {
                      required: true,
                      message: "Please select a link type",
                    },
                  ]}
                >
                  <Select
                    defaultValue="Select link tag"
                    style={{ width: "100%" }}
                  >
                    <Option value="Select link tag" disabled>
                      Select link tag
                    </Option>
                    <Option value="GETSTART">Get Start</Option>
                    <Option value="REGISTER">Register</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item label="Tracking Tag" name="marketingTag">
                  <Input placeholder="Enter tracking tag" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                className="admin-sale-link-btn"
                htmlType="submit"
                style={{ fontFamily: "Rajdhani" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminSaleLink;
