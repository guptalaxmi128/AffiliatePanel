import React from "react";
import { Layout, Menu, Breadcrumb, Tabs } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  LockOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import backgroundImage from "../../../../assets/img/cube_dark.jpg";
import "./Lectures.css";
import Assignment from "./assignment/Assignment";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const menuItems = [
  {
    key: "1",
    icon: <LockOutlined />,
    label: "Day 1",
    link: "/day-content",
  },
];

const Lectures = () => {
  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={260}
        //   style={{
        //   ...carouselStyle,
        //   overflowY: 'auto',
        // }}
        style={carouselStyle}
      >
        <Menu
          mode="inline"
          //  defaultSelectedKeys={["1"]}
          style={customMenuStyle}
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={customMenuItemStyle}
            >
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}

          <div className="demo-logo-vertical" />
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div style={{ padding: "10px", background: "#fff" }}>
            <div className="header-container">
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: "Rajdhani",
                  padding: 0,
                  margin: 0,
                }}
              >
                Day 1 Training
              </p>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/user">
                    <HomeOutlined />
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Training</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="day-container rows" style={{ margin: "0px" }}>
            <div className="col-lg-8 col-md-12">
              <iframe
                width="97%"
                height="400"
                src="https://www.youtube.com/embed/kOhF_hYYk0U"
                title="Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="col-lg-4 col-md-12 custom-background">
              <div className="text-overlay">
                <h2>Attention</h2>
                <p> Claim Your Free Bonus Scripts and Templates!</p>
                <p>
                  {" "}
                  Click The Button and Schedule Your Business Plan Call with an
                  Advisor Right Now!
                </p>
                <button type="submit" className="web-badge">
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <AppleOutlined />
                    Quiz
                  </span>
                }
                key="1"
              >
                {/* <MyComponent1 /> */}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <AndroidOutlined />
                    Android Tab
                  </span>
                }
                key="2"
              >
                {/* <MyComponent2 /> */}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <WindowsOutlined />
                    Assignment
                  </span>
                }
                key="3"
              >
                <Assignment />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lectures;
