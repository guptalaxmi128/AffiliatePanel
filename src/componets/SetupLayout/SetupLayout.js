import React from "react";
import { Layout, Col, Menu,message } from "antd";
import { Link, useLocation,useParams,useNavigate } from "react-router-dom";
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
import Setup from "../admin/setup/Setup";
import { useDispatch } from "react-redux";
import { LOGOUT_ADMIN } from "../../constants/actionTypes";


const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const SetupLayout = () => {
  const dispatch=useDispatch();
  const location = useLocation();
  const { courseId}=useParams();
//   console.log("setup",courseId)

const navigate = useNavigate();

const handleLogout = () => {
  dispatch({ type: LOGOUT_ADMIN });
  console.log("Admin");
  message.success("Admin logout successfully!");
  navigate("/login");
};



  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

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
          icon: <BarsOutlined />,
          subMenu: [
            {
              key: "2.2.1",
              label: "All Courses",
              link: "/admin/allcourse",
              icon: <BarsOutlined />,
            },
            {
              key: "2.2.2",
              label: "Registration Form",
              link: "/admin/form",
              icon: <BarsOutlined />,
            },
          ],
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
      link: "/forms/new",
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
      label: "Pricing",
      icon: <BarsOutlined />,
      link: "/admin/pricing",
    },
    {
      key: "14",
      label: "Add Coupon",
      icon: <BarsOutlined />,
      link: "/admin/add-coupon",
    },
    {
      key: "15",
      label: "Add Template",
      icon: <BarsOutlined />,
      link: "/admin/template",
    },
    {
      key: "16",
      label: "Affiliate Link Request",
      icon: <BarsOutlined />,
      link: "/admin/affiliate-link-request",
    },
    {
      key: "17",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick:handleLogout
    },
  ];

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Rajdhani",
    marginTop: "10px",
    fontSize:'16px'
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.subMenu) {
        return (
          <SubMenu
            key={item.key}
            icon={item.icon}
            title={item.label}
            style={customMenuItemStyle}
          >
            {renderMenuItems(item.subMenu)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={item.key === "17" ? item.onClick : null} 
            style={customMenuItemStyle}
          >
            {item.link ? (
              <Link to={item.link} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </Menu.Item>
        );
      }
    });
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
              {renderMenuItems(menuItems)}

              <div className="demo-logo-vertical" />
            </Menu>
          </Sider>

          <Layout>
            <Content
              style={{
                padding:
                
                  location.pathname !== "/admin/course/setup/:courseId" 
                
                    ? "16px"
                    : "0",
              }}
            >
            
           <Setup courseId={courseId} />
             
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

export default SetupLayout;
