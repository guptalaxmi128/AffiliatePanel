import { Form, Input, Row, Col, Upload, Button,Breadcrumb } from 'antd';
import { HomeOutlined , UploadOutlined } from "@ant-design/icons";
import "./AddAdvisor.css";

const AddAdvisor = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
      };
    
  return (
    <>
      <div className="advisor-breadcrumb">
        <div className="advisor-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Add Advisor
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Advisor</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="advisor-container">
        <div className="advisor-subcontainer">
            <h2>Advisor Information</h2>
            <Form
      name="myForm"
      onFinish={onFinish}
      labelCol={{ span: 24 }} 
      wrapperCol={{ span: 24 }}    
   
    >
      <Row gutter={16}>
        <Col lg={8} sm={24} xs={24} md={8} >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your Name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={8} sm={24} xs={24} md={8} >
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: true, message: 'Please enter your Mobile number' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={8} sm={24} xs={24} md={8} >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your Email' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col lg={8} sm={24} xs={24} md={8} >
          <Form.Item
            label="Upload Image"
            name="image"
          
          >
            <Upload
              beforeUpload={() => false} 
            >
              <Button icon={<UploadOutlined />} className='upload-btn'>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item >
        <Button  className='advisor-btn' htmlType="submit">
          Add Advisor
        </Button>
      </Form.Item>
    </Form>
        </div>
      </div>
    </>
  );
};

export default AddAdvisor;
