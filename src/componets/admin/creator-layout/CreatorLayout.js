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
  MailOutlined
} from "@ant-design/icons";
import backgroundImage from "../../../assets/img/cube_dark.jpg";
import logo from "../../../assets/img/logo_white.png";
import ScheduleBookingTable from "../../scheduleBooking/scheduleBookingTable/ScheduleBookingTable";
import MainCurriculum from "../course/curriculum/maincurriculum/MainCurriculum";
import ScheduleCall from "../../scheduleBooking/scheduleCall/ScheduleCall";
import AdminCurriculum from "../course/curriculum/AdminCurriculum";
import MyBooking from "../../scheduleBooking/myBooking/MyBooking";
import RegisterUser from "../registerUser/RegisterUser";
import NewCourse from "../course/NewCourse";
import AllCourse from "../courseTable/AllCourse";
import Setup from "../setup/Setup";
import Lead from "../lead/Lead";
import Members from "../members/Members";
import AddAdvisor from "../addAdvisor/AddAdvisor";
import ViewAdvisor from "../viewAdvisor/ViewAdvisor";
import EWallet from "../eWallet/EWallet";
import SiteSetting from "../siteSetting/SiteSetting";
import CoursePreview from "../coursePreview/CoursePreview";
import Subscriber from "../subscriber/Subscriber";
import Sequence from "../subscriber/sequence/Sequence";
import NewSequence from "../subscriber/sequence/newSequence/NewSequence";
import EmailContent from "../subscriber/sequence/content/EmailContent";
import CurriculumPreview from "../curriculumPreview/CurriculumPreview";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const CreatorLayout = () => {
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
      link: "/admin/dashboard",
    },
    {
      key: "2",
      label: "Courses",
      icon: <BookOutlined />,
      subMenu: [
        {
          key: "2.1",
          label: "Create new course",
          link: "/admin/courses/new",
          icon: <BarsOutlined />,
        },
        {
          key: "2.2",
          label: "List of all course",
          link: "/admin/allcourse",
          icon: <BarsOutlined />,
        },
      ],
    },

    {
      key: "3",
      label: "Leads",
      icon: <PercentageOutlined />,
      link: "/admin/lead",
    },
    {
      key: "4",
      label: "Users",
      icon: <TeamOutlined />,
      link: "/admin/register-user",
    },
    {
      key: "5",
      label: "Members",
      icon: <TeamOutlined />,
      link: "/admin/members",
    },
    {
      key: "6",
      label: "Advisors",
      icon: <BookOutlined />,
      subMenu: [
        {
          key: "6.1",
          label: "Add advisors",
          link: "/admin/add-advisor",
          icon: <BarsOutlined />,
        },
        {
          key: "6.2",
          label: "View Advisors",
          link: "/admin/view-advisor",
          icon: <BarsOutlined />,
        },
      ],
    },

    {
      key: "7",
      label: "Schedule Booking",
      icon: <BookOutlined />,
      subMenu: [
        {
          key: "7.1",
          label: "Schedule Booking",
          link: "/admin/schedule-booking",
          icon: <BarsOutlined />,
        },
        {
          key: "7.2",
          label: "Schedule Call",
          link: "/admin/schedule-call",
          icon: <BarsOutlined />,
        },
        {
          key: "7.3",
          label: "My Booking",
          link: "/admin/my-booking",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "8",
      label: "eWallet",
      icon: <TeamOutlined />,
      link: "/admin/ewallet",
    },
    {
      key: "9",
      label: "Emails",
      icon: <MailOutlined />,

      subMenu: [
        {
          key: "9.1",
          label: "Subscriber",
          link: "/admin/subscriber",
          icon: <BarsOutlined />,
        },
        {
          key: "9.2",
          label: "Broadcast",
          link: "/admin/broadcast",
          icon: <BarsOutlined />,
        },
        {
          key: "9.3",
          label: "Email Templates",
          link: "/admin/email-templates",
          icon: <BarsOutlined />,
        },
        {
          key: "9.4",
          label: "Sequence",
          link: "/admin/sequences",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "10",
      label: "Automation",
      icon: <TeamOutlined />,

      subMenu: [
        {
          key: "10.1",
          label: "Visual Automation",
          link: "/admin/visual-automation",
          icon: <BarsOutlined />,
        },
        {
          key: "10.2",
          label: "Rules",
          link: "/admin/rules",
          icon: <BarsOutlined />,
        },
        {
          key: "10.3",
          label: "Integration",
          link: "/admin/integration",
          icon: <BarsOutlined />,
        },
        {
          key: "10.4",
          label: "RSS",
          link: "/admin/RSS",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "11",
      label: "Form",
      icon: <TeamOutlined />,
      link: "/admin/form",
    },
    {
      key: "12",
      label: "Site Setting",
      icon: <TeamOutlined />,

      subMenu: [
        {
          key: "12.1",
          label: "Theme",
          link: "/admin/site-setting",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "13",
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
                  location.pathname !== "/admin/courses/new" &&
                  location.pathname !== "/admin/curriculum" &&
                  location.pathname !== "/admin/card1" &&
                  location.pathname !== "/admin/setup" &&
                  location.pathname !== "/admin/lead" &&
                  location.pathname !== "/admin/members" &&
                  location.pathname !== "/admin/register-user" &&
                  location.pathname !== "/admin/add-advisor" &&
                  location.pathname !== "/admin/view-advisor" &&
                  location.pathname !== "/admin/schedule-call" &&
                  location.pathname !== "/admin/schedule-booking" &&
                  location.pathname !== "/admin/my-booking" &&
                  location.pathname !== "/admin/ewallet" &&
                  location.pathname !== "/admin/site-setting" &&
                  location.pathname !== "/admin/preview" &&
                  location.pathname !== "/admin/subscriber" &&
                  location.pathname !== "/admin/sequences" &&
                  location.pathname !== "/admin/sequences/new" &&
                  location.pathname !== "/admin/sequences/content" &&
                  location.pathname !== "/admin/setup/courses/curriculum/lesson"
                    ? "16px"
                    : "0",
              }}
            >
              {location.pathname === "/admin/courses/new" && <NewCourse />}
              {location.pathname === "/admin/curriculum" && <AdminCurriculum />}
              {location.pathname === "/admin/card1" && <MainCurriculum />}
              {location.pathname === "/admin/allcourse" && <AllCourse />}
              {location.pathname === "/admin/setup" && <Setup />}
              {location.pathname === "/admin/lead" && <Lead />}
              {location.pathname === "/admin/members" && <Members />}
              {location.pathname === "/admin/register-user" && <RegisterUser />}
              {location.pathname === "/admin/add-advisor" && <AddAdvisor />}
              {location.pathname === "/admin/view-advisor" && <ViewAdvisor />}
              {location.pathname === "/admin/schedule-call" && <ScheduleCall />}
              {location.pathname === "/admin/schedule-booking" && (
                <ScheduleBookingTable />
              )}
              {location.pathname === "/admin/my-booking" && <MyBooking />}
              {location.pathname === "/admin/ewallet" && <EWallet />}
              {location.pathname === "/admin/site-setting" && <SiteSetting />}
              {location.pathname === "/admin/preview" && <CoursePreview />}
              {location.pathname === "/admin/subscriber" && <Subscriber />}
              {location.pathname === "/admin/sequences" && <Sequence />}
              {location.pathname === "/admin/sequences/new" && <NewSequence />}
              {location.pathname === "/admin/sequences/content" && <EmailContent />}
              {location.pathname === "/admin/setup/courses/curriculum/lesson" && <CurriculumPreview />}
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

export default CreatorLayout;
