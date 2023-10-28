import React from "react";
import { Form, Input, Button, Checkbox,Space } from "antd";
import { Link } from "react-router-dom";
import "./NewCourse.css";

const NewCourse = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  const handleBack = () => {
    // Handle back button click
  };

 
  return (
    <div className="course-container">
      <div className="content">
        <h2>Name your course</h2>
        <p>
          What would you like to name your course? Don’t worry, you can always
          change this later.
        </p>
        <Form layout="vertical" onFinish={onFinish} style={{ width: "335px" }}>
          <Form.Item
            label="Course title"
            name="courseTitle"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="e.g. React Course" />
          </Form.Item>
          <Form.Item>
            <Checkbox className="custom-checkbox">
              Help me generate a course outline
            </Checkbox>
          </Form.Item>
          <Space>
            <Button onClick={handleBack} className="course-back-btn">Back</Button>
            <Link to={"/admin/curriculum"} style={{textDecoration:'none'}}>
            <Button className="course-continue-btn"  htmlType="submit">
              Continue
            </Button>
            </Link>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default NewCourse;
