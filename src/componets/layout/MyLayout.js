import React, { useState } from "react";
import { Layout, Row, Col, Space, Menu, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  MenuOutlined,
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
import AllCourse from "../user/course/allCourse/AllCourse";
import MyCourse from "../user/course/MyCourse";
import Curriculum from "../user/course/curriculum/Curriculum";
import Lectures from "../user/course/lectures/Lectures";
import Profile from "../user/profile/Profile";
import FAQ from "../user/faq/FAQ";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MyLayout = () => {
  const location = useLocation();
  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  // console.log(location.pathname);

  const menuItems = [
    {
      key: "1",
      label: "Courses",
      icon: <BookOutlined />,
      subMenu: [
        {
          key: "1.1",
          label: "My Courses",
          link: "/user/my-courses",
          icon: <BarsOutlined />,
        },
        {
          key: "1.2",
          label: "All Courses",
          link: "/user/all-courses",
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
          link: "/user/profile",
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
          link: "/user/faq",
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
            <div className="desktop-menu">
              <Col>
                <Space>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    // defaultSelectedKeys={["1"]}
                    style={{ backgroundColor: "#010001" }}
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
            </div>
            <div className="mobile-menu-icon">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleMobileMenu}
                style={{ color: "#fff" }}
              />
            </div>
          </Row>
        </Header>

        <Layout>
          {location.pathname !== "/user/my-courses" &&
            location.pathname !== "/user/all-courses" &&
            !location.pathname.startsWith("/user/enrolled/") &&
            !location.pathname.startsWith("/user/lecture") &&
            location.pathname !== "/user/profile" &&
            location.pathname !== "/user/faq" && (
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
                style={carouselStyle}
              >
                <div className="demo-logo-vertical" />
              </Sider>
            )}
          {showMobileMenu && (
            <div className="mobile-menu show">
              <Menu theme="dark" mode="inline" inlineIndent={16}>
                {menuItems.map((item) =>
                  item.subMenu ? (
                    <SubMenu key={item.key} title={item.label} icon={item.icon}>
                      {item.subMenu.map((subItem) => (
                        <Menu.Item key={subItem.key} icon={subItem.icon}>
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
            </div>
          )}
          <Layout>
            <Content
              style={{
                padding:
                  location.pathname !== "/user/enrolled/:id" &&
                  location.pathname !== "/user/lecture" &&
                  location.pathname !== "/user/profile" &&
                  location.pathname !== "/user/faq"
                    ? "16px"
                    : "0",
              }}
            >
              {location.pathname === "/user/my-courses" && <MyCourse />}
              {location.pathname === "/user/all-courses" && <AllCourse />}
              {location.pathname === "/user/enrolled/:id" && <Curriculum />}
              {location.pathname === "/user/lecture" && <Lectures />}
              {location.pathname === "/user/profile" && <Profile />}
              {location.pathname === "/user/faq" && <FAQ />}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Affiliate Indians by @ Tech Astute
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default MyLayout;
