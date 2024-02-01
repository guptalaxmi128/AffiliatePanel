import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addAssignment } from "../../../../actions/addAssignment/addAssignment";
import "./AddAssignment.css";

const AddAssignment = ({ lessonId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const data = {
        id: lessonId,
        assignmentType: values.assignmentType,
        question: values.question,
      };
      //   console.log(data);
      const res = await dispatch(addAssignment(data));

      if (res.success) {
        message.success(res.message);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error while adding assignment:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("An error occurred while adding the assignment.");
      }
    }
  };

  return (
    <>
      <div className="add-assignment-breadcrumb">
        <div className="add-assignment-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Add Assignment
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Assignment</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="add-assignment-container">
        <div className="add-assignment-subcontainer">
          <h2>Assignment</h2>
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
                  label="Question"
                  name="question"
                  rules={[{ required: true, message: "Please enter question" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item
                  label="Select Assignment Type"
                  name="assignmentType"
                  rules={[
                    {
                      required: true,
                      message: "Please select assignment type",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Assignment Type "
                  >
                    <Select.Option value="SCHEDULE CALL">
                      Schedule Call
                    </Select.Option>
                    <Select.Option value="ANSWER">Answer</Select.Option>
                    <Select.Option value="INFORMATION">
                      Information
                    </Select.Option>
                    <Select.Option value="AFFILIATE LINK">
                      Affiliate Link
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button className="add-assignment-btn" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddAssignment;
