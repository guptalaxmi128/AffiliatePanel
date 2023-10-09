import React, { useState } from "react";
import { Layout, Row, Col, Space, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  PercentageOutlined,
  TeamOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import backgroundImage from "../../assets/img/cube_dark.jpg";
import logo from "../../assets/img/logo_white.png";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MyLayout = () => {
  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const menuItems = [
    {
      key: "1",
      label: "Courses",
      icon: <BookOutlined />,
      subMenu: [
        {
          key: "1.1",
          label: "My Courses",
          link: "/my-courses",
          icon: <BarsOutlined />,
        },
        {
          key: "1.2",
          label: "All Courses",
          link: "/all-courses",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "2",
      label: "Account",
      icon: <UserOutlined />,
      subMenu: [
        {
          key: "2.1",
          label: "Profile",
          link: "/profile",
          icon: <UserOutlined />,
        },
        {
          key: "2.2",
          label: "Settings",
          link: "/settings",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      key: "3",
      label: "Support",
      icon: <QuestionCircleOutlined />,
      subMenu: [
        {
          key: "3.1",
          label: "FAQ",
          link: "/faq",
          icon: <SettingOutlined />,
        },
        {
          key: "3.2",
          label: "Facebook Group",
          link: "/facebook-group",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      key: "4",
      label: "Affiliate",
      icon: <PercentageOutlined />,
      link: "/affiliate",
    },
    {
      key: "5",
      label: "My Advisor",
      icon: <TeamOutlined />,
      link: "/my-advisor",
    },
  ];

  return (
    <div className="layout-container">
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header" style={{ background: "transparent" }}>
          <Row justify="space-between">
            <Col>
              <img
                src={logo}
                alt="Logo"
                className="logo-image"
                style={{ height: "60px" }}
              />
            </Col>
            <Col>
              <Space>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  {menuItems.map((item) =>
                    item.subMenu ? (
                      <SubMenu
                        key={item.key}
                        icon={item.icon}
                        title={item.label}
                      >
                        {item.subMenu.map((subItem) => (
                          <Menu.Item
                            key={subItem.key}
                            icon={subItem.icon}
                            // style={{ paddingLeft: "30px" }}
                          >
                            <Link to={subItem.link}>{subItem.label}</Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    ) : (
                      <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.link}>{item.label}</Link>
                      </Menu.Item>
                    )
                  )}
                </Menu>
              </Space>
            </Col>
          </Row>
        </Header>

        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            width={240}
            style={carouselStyle}
          >
            <div className="demo-logo-vertical" />
          </Sider>
          <Layout>
            <Content style={{ padding: "16px" }}>
              {/* Content area goes here */}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              {/* Footer content goes here */}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default MyLayout;
