import React, { useState } from "react";
import { Layout, Row, Col, Space, Menu, Button, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  PercentageOutlined,
  TeamOutlined,
  BarsOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import backgroundImage from "../../assets/img/cube_dark.jpg";
import logo from "../../assets/img/logo_white.png";
import AllCourse from "../user/course/allCourse/AllCourse";
import MyCourse from "../user/course/MyCourse";
import Curriculum from "../user/course/curriculum/Curriculum";
import Profile from "../user/profile/Profile";
import FAQ from "../user/faq/FAQ";
import AffiliateBluePrint from "../user/affiliateBluePrint/AffiliateBluePrint";
import { LOGOUT_USER } from "../../constants/actionTypes";
import { useDispatch } from "react-redux";
import StartHere from "../user/startHere/StartHere";
import EWallet from "../user/eWallet/EWallet";
import Leads from "../user/leads/Leads";
import Members from "../user/members/Members";
import Reports from "../user/reports/Reports";
import Rank from "../user/rank/Rank";
import Commission from "../user/commission/Commission";
import Stream from "../user/stream/Stream";
import Traffic from "../user/traffic/Traffic";
import LeaderBoard from "../user/leaderBoard/LeaderBoard";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
    // console.log("User");
    message.success("User logout successfully!");
    navigate("/sign_in");
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
        // {
        //   key: "2.2",
        //   label: "Settings",
        //   link: "/settings",
        //   icon: <SettingOutlined />,
        // },
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
      // link: "/user/start-here",
    },
    // {
    //   key: "5",
    //   label: "My Advisor",
    //   icon: <TeamOutlined />,
    //   link: "/my-advisor",
    // },
    {
      key: "5",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const menuSliderItems = [
    {
      key: "1",
      label: "Start Here",
      icon: <DashboardOutlined />,
      link: "/user/start-here",
    },
    {
      key: "2",
      label: "eWallet",
      icon: <BookOutlined />,
      link: "/user/eWallet",
    },

    {
      key: "3",
      label: "Affiliate Links",
      icon: <PercentageOutlined />,
      link: "/user/affiliate-indians-blueprint",
    },
    {
      key: "4",
      label: "Leads",
      icon: <TeamOutlined />,
      link: "/user/leads",
    },
    {
      key: "5",
      label: "Members",
      icon: <TeamOutlined />,
      link: "/user/members",
    },
    {
      key: "6",
      label: "Reports",
      icon: <BookOutlined />,
      link: "/user/reports",
    },

    {
      key: "7",
      label: "Rank",
      icon: <BookOutlined />,
      link: "/user/rank",
    },
    {
      key: "8",
      label: "Leaderboard",
      icon: <TeamOutlined />,
      link: "/user/leaderboard",
    },
    {
      key: "9",
      label: "Commission",
      icon: <TeamOutlined />,
      link: "/user/commission",
    },
    {
      key: "10",
      label: "[PRO] Streams of Income",
      icon: <TeamOutlined />,
      link: "/user/stream-income",
    },
    {
      key: "11",
      label: "[PRO] Get Traffic",
      icon: <TeamOutlined />,
      link: "/user/get-traffic",
    },
    {
      key: "12",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Rajdhani",
    marginTop: "10px",
    fontSize: "16px",
  };

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
                        <Menu.Item
                          key={item.key}
                          icon={item.icon}
                          onClick={item.key === "5" ? item.onClick : null}
                        >
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
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={customMenuStyle}
                >
                  {menuSliderItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      style={customMenuItemStyle}
                      onClick={item.key === "12" ? item.onClick : null} //for side bar logout
                    >
                      <Link to={item.link} style={{ textDecoration: "none" }}>
                        {item.label}
                      </Link>
                    </Menu.Item>
                  ))}

                  <div className="demo-logo-vertical" />
                </Menu>
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
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      onClick={item.key === "5" ? item.onClick : null}
                    >
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
                  location.pathname !== "/user/profile" &&
                  location.pathname !== "/user/faq" &&
                  location.pathname !== "/user/affiliate-indians-blueprint" &&
                  location.pathname !== "/user/start-here" &&
                  location.pathname !== "/user/eWallet" &&
                  location.pathname !== "/user/leads" &&
                  location.pathname !== "/user/members" &&
                  location.pathname !== "/user/reports" &&
                  location.pathname !== "/user/rank" &&
                  location.pathname !== "/user/commission" &&
                  location.pathname !== "/user/stream-income" &&
                  location.pathname !== "/user/get-traffic" && 
                  location.pathname !== "/user/leaderboard" 
                    ? "16px"
                    : "0",
              }}
            >
              {location.pathname === "/user/my-courses" && <MyCourse />}
              {location.pathname === "/user/all-courses" && <AllCourse />}
              {location.pathname === "/user/enrolled/:id" && <Curriculum />}
              {location.pathname === "/user/profile" && <Profile />}
              {location.pathname === "/user/faq" && <FAQ />}
              {location.pathname === "/user/affiliate-indians-blueprint" && (
                <AffiliateBluePrint />
              )}
              {location.pathname === "/user/start-here" && <StartHere />}
              {location.pathname === "/user/eWallet" && <EWallet />}
              {location.pathname === "/user/leads" && <Leads />}
              {location.pathname === "/user/members" && <Members />}
              {location.pathname === "/user/reports" && <Reports />}
              {location.pathname === "/user/rank" && <Rank />}
              {location.pathname === "/user/commission" && <Commission />}
              {location.pathname === "/user/stream-income" && <Stream />}
              {location.pathname === "/user/get-traffic" && <Traffic />}
              {location.pathname === "/user/leaderboard" && <LeaderBoard />}
            </Content>
            <Footer style={{ textAlign: "center", fontFamily: "Rajdhani" }}>
              Affiliate Indians by @ Tech Astute
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default MyLayout;
