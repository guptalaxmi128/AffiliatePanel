import React from "react";
import { Layout, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  BookOutlined,
  PercentageOutlined,
  TeamOutlined,
  BarsOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import backgroundImage from "../../../assets/img/cube_dark.jpg";
import logo from "../../../assets/img/logo_white.png";
import AddVideo from "./addVideo/AddVideo";
import AddText from "./addText/AddText";
import AddFiles from "./addFiles/AddFiles";
import AddQuiz from "./addQuiz/AddQuiz";
import MediaEmbedder from "./embedMedia/MediaEmbedder";
import AddUpsell from "./addUpsell/AddUpsell";
import FileViewer from "./fileViewer/FileViewer";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const LessonLayout = () => {
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
      label: "Add Video",
      icon: <DashboardOutlined />,
      link: "/lesson/add-video",
    },
    {
      key: "2",
      label: "Add Files",
      icon: <BookOutlined />,
      link: "/lesson/add-files",
    },

    {
      key: "3",
      label: "Add Text",
      icon: <PercentageOutlined />,
      link: "/lesson/add-text",
    },
    {
      key: "4",
      label: "Add Quiz",
      icon: <TeamOutlined />,
      link: "/lesson/add-quiz",
    },
    {
      key: "5",
      label: "Add Code Example",
      icon: <TeamOutlined />,
      link: "/lesson/add-code-example",
    },

    {
      key: "6",
      label: "Add Custom Code",
      icon: <TeamOutlined />,
      link: "/lesson/add-custom-code",
    },

    {
      key: "7",
      label: "Add Upsell",
      icon: <TeamOutlined />,
      link: "/lesson/upsell",
    },
    {
      key: "8",
      label: "Embed Media",
      icon: <TeamOutlined />,
      link: "/lesson/embed-media",
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
                padding:
                  location.pathname !== "/lesson/add-video" && location.pathname !== "/lesson/add-text" && location.pathname !== "/lesson/add-files"
                  && location.pathname !== "/lesson/add-quiz"   && location.pathname !== "/lesson/embed-media" && location.pathname !== "/lesson/upsell"? "16px" : "0",
              }}
            >
              {" "}
              {location.pathname === "/lesson/add-video" && <AddVideo />}
              {location.pathname === "/lesson/add-text" && <AddText />}
              {/* {location.pathname === "/lesson/add-files" && <AddFiles />} */}
              {location.pathname === "/lesson/add-files" && <FileViewer />} 
              {location.pathname === "/lesson/add-quiz" && <AddQuiz />}
              {location.pathname === "/lesson/embed-media" && <MediaEmbedder />}
              {location.pathname === "/lesson/upsell" && <AddUpsell />}
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

export default LessonLayout;
