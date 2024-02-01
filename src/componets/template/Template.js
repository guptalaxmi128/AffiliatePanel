import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Upload,
  Button,
  Breadcrumb,
  message,
  Table,
  Space,
} from "antd";
import {
  HomeOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTemplate,
  deleteTemplate,
  getTemplate,
} from "../../actions/addTemplate/addTemplate";
import "./Template.css";

const Template = () => {
  
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const template = useSelector((state) => state.template.template);
  const [imageName, setImageName] = useState(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);

  // console.log(template);

  const onFinish = async (values) => {
    try {
      //   console.log("Received values:", values);
      const formData = new FormData();
      formData.append("template", values.template);
      formData.append("templateImage", image);

      const res = await dispatch(addTemplate(formData));

      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setImageName(null);
        setImage(null);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error(
        "Error while adding template:",
        error.response.data.message
      );
      message.error(error.response.data.message);
    }
  };

  const beforeUpload = (file) => {
    setImageName(file.name);
    setImage(file);
    return false;
  };

  useEffect(() => {
    dispatch(getTemplate());
  }, [dispatch]);

  useEffect(() => {
    if (template) {
      setData(template.data);
    }
  }, [template]);

  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const columns = [
    {
      title: "Template Name",
      dataIndex: "template",
      key: "template",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },

    {
      title: "Action",
      key: "action",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await dispatch(deleteTemplate(id));
  
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error while deleting template:", error.response.data.message);
      message.error(error.response.data.message);
    }
  };
  

  return (
    <>
      <div className="add-template-breadcrumb">
        <div className="add-template-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Add Template
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Template</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="add-template-container">
        <div className="add-template-subcontainer">
          <h2>Template</h2>
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
                  label="Template Name"
                  name="template"
                  rules={[
                    { required: true, message: "Please enter template name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item
                  label="Upload Image"
                  name="image"
                  rules={[
                    { required: true, message: "Please upload an image" },
                  ]}
                >
                  <Upload beforeUpload={beforeUpload} showUploadList={false}>
                    <Button icon={<UploadOutlined />} className="upload-btn">
                      {imageName || "Click to Upload"}
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button className="add-template-btn" htmlType="submit">
                Add Template
              </Button>
            </Form.Item>
          </Form>
          <div style={{ marginTop: "50px" }}>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
