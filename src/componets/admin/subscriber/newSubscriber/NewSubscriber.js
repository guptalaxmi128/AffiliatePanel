import React from "react";
import {
  UserOutlined,
  SearchOutlined,
  TeamOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Table, Checkbox, Row, Col, Input } from "antd";
import "./NewSubscriber.css";

const tableContentStyle = {
  fontFamily: "Rajdhani",
  textAlign: "center",
};

const dataSource = [
  {
    key: "1",
    name: "Ankit Khatri",
    avatarUrl: <Avatar icon={<UserOutlined style={{ fontSize: "20px" }} />} />,
    email: "ankitkhatri@gmail.com",
    subscriptionDate: "Mar 10, 2023",
    status: "Confirmed",
  },
  {
    key: "2",
    name: "Ankit Khatri",
    avatarUrl: <Avatar icon={<UserOutlined style={{ fontSize: "20px" }} />} />,
    email: "ankitkhatri@gmail.com",
    subscriptionDate: "Mar 10, 2023",
    status: "Confirmed",
  },
  {
    key: "3",
    name: "Ankit Khatri",
    avatarUrl: <Avatar icon={<UserOutlined style={{ fontSize: "20px" }} />} />,
    email: "ankitkhatri@gmail.com",
    subscriptionDate: "Mar 10, 2023",
    status: "Confirmed",
  },
  {
    key: "4",
    name: "Ankit Khatri",
    avatarUrl: <Avatar icon={<UserOutlined style={{ fontSize: "20px" }} />} />,
    email: "ankitkhatri@gmail.com",
    subscriptionDate: "Mar 10, 2023",
    status: "Confirmed",
  },
  {
    key: "5",
    name: "Ankit Khatri",
    avatarUrl: <Avatar icon={<UserOutlined style={{ fontSize: "20px" }} />} />,
    email: "ankitkhatri@gmail.com",
    subscriptionDate: "Mar 10, 2023",
    status: "Confirmed",
  },
  {
    key: "6",
    name: "Ankit Khatri",
    avatarUrl: <Avatar icon={<UserOutlined style={{ fontSize: "20px" }} />} />,
    email: "ankitkhatri@gmail.com",
    subscriptionDate: "Mar 10, 2023",
    status: "Confirmed",
  },
];

const columns = [
  {
    title: <Checkbox />,
    dataIndex: "checkbox",
    key: "checkbox",
    render: (text, record) => <Checkbox />,
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Subscriber",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={record.avatarUrl} />
        <div style={{ marginLeft: "10px", fontFamily: "Rajdhani" }}>
          <div>{text}</div>
          <div>{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Subscription Date",
    dataIndex: "subscriptionDate",
    key: "subscriptionDate",
    render: (text) => text,
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => text,
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
];
const NewSubscriber = () => {
  return (
    <>
      <Row gutter={16}>
        <Col lg={16} sm={24} xs={24}>
          <div className="new-subscriber-container">
            <h2>Confirmed Subscribers</h2>
            <Button type="default" className="bulk-btn">
              Bulk Actions
            </Button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
        </Col>

        <Col lg={8} xs={24} sm={24}>
        <div>
          <div className="new-subscriber-container0">
            <div className="new-subscriber-subcontainer">
              <Input placeholder="Search..." />
              <Button icon={<SearchOutlined />} />
            </div>
            <Button className="add-subscriber">Add Subscribers</Button>
            <Button className="manage-btn">
              Manage Subscriber Preferences
            </Button>
          </div>
          <div>
          <div className="add-subscriber-subcontainer">
              All Subscribers 4 subscribers
            </div>
            <div className="segment-container">
            <div className="segment">
                <TeamOutlined style={{ fontSize: "18px" }} />
                <h2>Segments</h2>
              </div>
              <div className="segment-subcontainer">
                <p>
                  Segments let you group subscribers group for broadcasts.
                  <a href="#" style={{ color: "blue" }}>
                    Learn more
                  </a>
                </p>
              </div>
              <div className="segment1">
                <Button className="segment-btn">
                  <PlusCircleOutlined style={{ fontSize: "12px" }} /> Create a
                  segment
                </Button>
               </div>
               </div>
               <div className="tag-super-container">
              <div className="tag-container">
                <TeamOutlined style={{ fontSize: "18px" }} />
                <h2>Tags</h2>
              </div>
              <div className="tag-subcontainer">
                <p>Imported October 20,2021 1 Subscriber</p>
              </div>
              <div className="tag-container1">
                
                <Button className="tag-btn">
                  <PlusCircleOutlined style={{ fontSize: "12px" }} /> Create a
                  tag
                </Button>
              </div>
            </div>
            <div className="product-super-container">
              <div className="product-container">
                <TeamOutlined style={{ fontSize: "18px" }} />
                <h2>Products</h2>
              </div>
              <div className="product-subcontainer">
                <p>Product your subscribers bought.</p>
              </div>
              <div className="product-container1">
                <Button className="product-btn">
                  <PlusCircleOutlined style={{ fontSize: "12px" }} />Learn how to set up purchase integrations 
                </Button>
              </div>
            </div>


          </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NewSubscriber;
