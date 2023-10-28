import React from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Breadcrumb,
  Row,
  Col,
} from "antd";
import { HomeOutlined, InboxOutlined } from "@ant-design/icons";
import "./SiteSetting.css";

const { Dragger } = Upload;
const { Option } = Select;

const SiteSetting = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <div className="site-breadcrumb">
        <div className="site-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Site Setting
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Site Setting</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="site-container">
        <div className="site-subcontainer">
          <h2>Site Setting</h2>
          <Form
            form={form}
            name="myForm"
            onFinish={handleSubmit}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Row gutter={16}>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item label="Favicon" name="favicon">
                  <Input type="file" />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item label="Color" name="color">
                  <Select defaultValue="Select Color">
                    <Option value="solid">Solid</Option>
                    <Option value="gradient">Gradient</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={8} sm={24} xs={24} md={8}>
                <Form.Item label="Font" name="font">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Col lg={8} sm={24} xs={24} md={8}>
              <Form.Item label="Logo" name="logo">
                <Dragger name="logo" multiple={false} showUploadList={false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined  style={{color:'#ddb42c'}} />
                  </p>
                  <p className="ant-upload-text">
                    Click logo file to this area to upload
                  </p>
                </Dragger>
              </Form.Item>
            </Col>

            <Form.Item>
              <Button htmlType="submit" className="site-btn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SiteSetting;
