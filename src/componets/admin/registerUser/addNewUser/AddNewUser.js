import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Breadcrumb,
  Select,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "./AddNewUser.css";
import { getCourse } from "../../../../actions/course/course";
import { addNewUser } from "../../../../actions/adminUser/adminUser";

const { Option } = Select;

const AddNewUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const [courses, setCourses] = useState([]);

  const onFinish = async (values) => {
    try {
      //   console.log("Received values:", values);
      const data = {
        name: values.name,
        email: values.email,
        courseId: values.course,
      };
      //   console.log(data);
      const res = await dispatch(addNewUser(data));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (course.data) {
      setCourses(course.data);
    }
  }, [course.data]);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  return (
    <>
      <div className="add-new-user-breadcrumb">
        <div className="add-new-user-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Add New User
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add New User</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="add-new-user-container">
        <div className="add-new-user-subcontainer">
          <h2>New User Information</h2>
          <Form
            name="myForm"
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            form={form}
          >
            <Row gutter={16}>
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your Name" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your Email" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item label="Select Course" name="course">
                  <Select
                    defaultValue="Select Course"
                    style={{ width: "100%" }}
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

            <Form.Item>
              <Button className="add-new-user-btn" htmlType="submit">
                Add User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
