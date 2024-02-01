import React from "react";
import { Layout, Col, Menu } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  BookOutlined,
  PercentageOutlined,
  TeamOutlined,
  BarsOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";
import backgroundImage from "../../assets/img/cube_dark.jpg";
import logo from "../../assets/img/logo_white.png";
import CurriculumPreview from "../admin/curriculumPreview/CurriculumPreview";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const LessonPreview = () => {
  const { lessonId } = useParams();
  const location = useLocation();

  console.log(lessonId);
  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const menuItems = [
    {
      key: "1",
      label: "Add Video",
      icon: <DashboardOutlined />,
      link: `/lesson/${lessonId}/add-video`,
    },
    {
      key: "2",
      label: "Add Files (PDF)",
      icon: <BookOutlined />,
      link: `/lesson/${lessonId}/add-pdf-files`,
    },

    {
      key: "3",
      label: "Add Text",
      icon: <PercentageOutlined />,
      link: `/lesson/${lessonId}/add-text`,
    },
    {
      key: "4",
      label: "Add Quiz",
      icon: <TeamOutlined />,
      link: `/lesson/${lessonId}/add-quiz`,
    },
    {
      key: "5",
      label: "Add Code Example",
      icon: <TeamOutlined />,
      link: `/lesson/${lessonId}/add-code-example`,
    },

    {
      key: "6",
      label: "Add Files(doc,ppt,docx & pptx)",
      icon: <TeamOutlined />,
      link: `lesson/${lessonId}/add-file`,
    },

    {
      key: "7",
      label: "Add Upsell",
      icon: <TeamOutlined />,
      link: `/lesson/${lessonId}/add-upsell`,
    },
    {
      key: "8",
      label: "Embed Media",
      icon: <TeamOutlined />,
      link: "/lesson/embed-media",
    },
    {
      key: "9",
      label: "Add Assignment",
      icon: <TeamOutlined />,
      link: `lesson/${lessonId}/add-assignment`,
    },
    {
      key: "10",
      label: "Add Custom Code",
      icon: <TeamOutlined />,
      link: `/lesson/${lessonId}/add-custom-code`,
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
              defaultSelectedKeys={["1"]}
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
                        <Link to={item.link} style={{ textDecoration: "none" }}>
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
                padding: !location.pathname.includes(
                  "/get-course/courses/:courseId/curriculum/lesson"
                )
                  ? "16px"
                  : "0",
              }}
            >
              <CurriculumPreview lessonId={lessonId} />
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

export default LessonPreview;
