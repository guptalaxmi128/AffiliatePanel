import React from "react";
import { Layout, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  TeamOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MessageOutlined,
  MailOutlined,
  BarsOutlined
} from "@ant-design/icons";
import backgroundImage from "../../../assets/img/cube_dark.jpg";
import logo from "../../../assets/img/logo_white.png";
import Users from "../users/Users";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const SuperLayout = () => {
  const location = useLocation();
  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  // console.log(location.pathname);

  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      link: "/super-admin/dashboard",
    },

    {
      key: "2",
      label: "Users",
      icon: <TeamOutlined />,
      link: "/super-admin/users",
    },

    {
      key: "3",
      label: "Communication",
      icon: <TeamOutlined />,

      subMenu: [
        {
          key: "3.1",
          label: "Message",
          link: "/super-admin/message",
          icon: <MessageOutlined />,
        },
        {
          key: "3.2",
          label: "Email",
          link: "/super-admin/email",
          icon: <MailOutlined />,
        },
      ],
    },
    {
      key: "4",
      label: "Group",
      icon: <TeamOutlined />,

      subMenu: [
        {
          key: "4.1",
          label: "New Group",
          link: "/super-admin/new-group",
          icon: <BarsOutlined />,
        },
        {
          key: "4.2",
          label: "List Group",
          link: "/super-admin/list-group",
          icon: <BarsOutlined />,
        },
      ],
    },

    {
      key: "4",
      label: "Logout",
      icon: <LogoutOutlined />,
      link: "/",
    },
  ];

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Rajdhani",
    marginTop: "10px",
  };

  return (
    <div className="layout-container">
      <Layout style={{ minHeight: "100vh" }}>
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
            width={260}
            style={carouselStyle}
          >
            <Col>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "60px",
                  margin: "0 auto",
                  justifyItems: "center",
                }}
              />
            </Col>
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={customMenuStyle}
            >
              {menuItems.map((item) =>
                item.subMenu ? (
                  <SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                    style={customMenuItemStyle}
                  >
                    {item.subMenu.map((subItem) => (
                      <Menu.Item
                        key={subItem.key}
                        icon={subItem.icon}
                        style={{ paddingLeft: "30px" }}
                      >
                        <Link
                          to={subItem.link}
                          style={{ textDecoration: "none" }}
                        >
                          {subItem.label}
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    style={customMenuItemStyle}
                  >
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      {item.label}
                    </Link>
                  </Menu.Item>
                )
              )}

              <div className="demo-logo-vertical" />
            </Menu>
          </Sider>

          <Layout>
            <Content
              style={{
                padding:    location.pathname !== "/super-admin/users"
                    ? "16px"
                    : "0",
              }}
            >
                   {location.pathname === "/super-admin/users" && <Users />}
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

export default SuperLayout;
