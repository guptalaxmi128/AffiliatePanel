import React, { useState } from "react";
import JoditEditor from "jodit-react";
import {
  Breadcrumb,
  Row,
  Col,
  Input,
  Button,
  Dropdown,
  Switch,
  Menu,
  Space,
  Modal,
  Card,
  Tabs,
  Select,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  FilterOutlined,
  HomeOutlined,
  MailOutlined,
  EditOutlined,
  ClockCircleOutlined,
  MenuOutlined,
  DownOutlined,
} from "@ant-design/icons";
import template from "../../../../../assets/img/email_template.jpg";
import "./EmailContent.css";

const { TabPane } = Tabs;
const { Option } = Select;

const EmailContent = () => {
  const [subjectLine, setSubjectLine] = useState(
    "Write a compelling subject..."
  );

  const [content, setContent] = useState(
    "Sequences are an automated series of emails.Use these emails to deliver valuable information, and after a few educational messages start to pitch your product.You can add more emails by clicking “Add Email” on the right and arrange emails by dragging them to the proper order."
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailContainers, setEmailContainers] = useState([]);
  const [nextKey, setNextKey] = useState(1);
  const [selectedDays, setSelectedDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const config = {
    value: content,
    height: "300px",
  };

  const handleChange = (newContent) => {
    setContent(newContent);
  };

  const handleDaySelection = (day) => {
    // Implement your logic to update the selected days here.
  };
  const menu = (
    <Menu>
      <Row gutter={16} className="menu">
        <Col xs={24} lg={20}>
        <Row gutter={8} align="middle">
    <Col xs={6} sm={4} lg={4}>
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Send Email</span>
    </Col>

    <Col xs={6} lg={4} sm={4}>
              <div className="small-container">
                <Input className="dropdown-input" />
              </div>
            </Col>
            <Col xs={6} lg={4} sm={4}>
              <Select defaultValue="day" style={{ width: 80 }} className="day">
                <Option value="day">Day</Option>
                <Option value="hour">Hour</Option>
              </Select>
            </Col>
            <Col xs={6} lg={4} sm={4}>
              <span style={{ width:'60px'}} className="email-text">after</span>
            </Col>
          </Row>
        </Col>
        <Col xs={6} lg={12}>
          <Row gutter={8}>
            <Col xs={6} sm={6} lg={12}>
              
                <div style={{ display: "flex",justifyContent: 'space-between',width:'320px' }}>
                  {selectedDays.map((day) => (
                    <div key={day} className="week-day">{day}</div>
                  ))}
                </div>
                <div style={{ display: "flex",justifyContent: 'space-between',width:'320px' }}>
                  {selectedDays.map((day) => (
                    <Checkbox
                      key={day}
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDaySelection(day)}
                      style={{textAlign:'center'}}
                    />
                  ))}
                </div>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </Menu>
  );

  const addEmailContainer = () => {
    const newEmailContainer = (
      <Row gutter={16} key={nextKey} style={{ marginTop: "10px" }}>
        <Col xs={24} lg={24}>
          <div className="email-tab">
            <p>Write a compelling subject</p>
            <MenuOutlined style={{ marginBottom: "8px" }} />
          </div>
        </Col>
        <Col xs={24} lg={24}>
          <div className="email-tab">
            <div>
              <ClockCircleOutlined style={{ fontSize: "13px" }} />
              <span style={{ marginLeft: "6px", fontSize: "12px" }}>1 day</span>
            </div>
            <div>
              <span className="draft">Draft</span>
            </div>
          </div>
        </Col>
      </Row>
    );

    setEmailContainers([...emailContainers, newEmailContainer]);
    setNextKey(nextKey + 1);
  };
  return (
    <>
      <div className="content-breadcrumb">
        <div className="content-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Sequences
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Content</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="content-container">
        <Row gutter={16}>
          <Col lg={17} sm={24} xs={24}>
            <div className="content-subcontainer">
              <p>Subject line</p>
              <div className="content-subcontainer0">
                <Input
                  value={subjectLine}
                  onChange={(e) => setSubjectLine(e.target.value)}
                  className="subject-line"
                />
                <Button className="edit-preview-btn">Edit preview text</Button>
              </div>
              <div className="content-subcontainer2">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <div>
                      <p style={{ margin: 0 }}>Published</p>
                      <Switch defaultChecked />
                    </div>
                  </Col>
                  <Col xs={24} md={16}>
                    <div>
                      <p style={{ margin: 0 }}>Send this email</p>
                      <Dropdown overlay={menu} placement="bottomLeft">
                        <Button>
                          After 1 day
                          <DownOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div>
                      <p style={{ margin: 0 }}>Template</p>
                      <Button className="template-btn" onClick={showModal}>
                        <span style={{ marginRight: "20px" }}>Text only</span>
                        <span>Change</span>
                      </Button>
                      <Modal
                        title="Choose a template for your broadcast"
                        open={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <div className="content-subcontainer3">
                          <p>Text only</p>
                          <Card
                            cover={
                              <img
                                alt="Image"
                                src={template}
                                className="template"
                              />
                            }
                          ></Card>
                        </div>
                      </Modal>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space style={{ marginTop: "20px", marginLeft: "10px" }}>
                      <Button>
                        <FilterOutlined
                          style={{ fontSize: "20px", color: "#8e8e8e" }}
                        />
                      </Button>
                      <Button>
                        <DeleteOutlined
                          style={{ fontSize: "20px", color: "#8e8e8e" }}
                        />
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
              <div>
                <JoditEditor config={config} onChange={handleChange} />
              </div>
            </div>
          </Col>
          <Col lg={7} xs={24} sm={24}>
            <div className="content-subcontainer1">
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      <MailOutlined />
                      Email
                    </span>
                  }
                  key="1"
                >
                  <div>
                    {emailContainers}
                    <Button
                      className="email-tab-btn"
                      onClick={addEmailContainer}
                    >
                      Add Email
                    </Button>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <EditOutlined />
                      Styles
                    </span>
                  }
                  key="2"
                >
                  <div className="style-tab">
                    <h2>Email</h2>
                    <p>Select an element to access its settings.</p>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EmailContent;
