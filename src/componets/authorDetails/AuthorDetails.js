import { useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Upload,
  Button,
  Breadcrumb,
  Menu,
  Layout,
  message,
} from "antd";
import {
  HomeOutlined,
  UploadOutlined,
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AuthorDetails.css";
import { addAuthorDetails } from "../../actions/addAuthorDetails/addAuthorDetails";
import { LOGOUT_ADMIN } from "../../constants/actionTypes";

const { Sider } = Layout;
const { SubMenu } = Menu;

const AuthorDetails = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [authorDescription, setAuthorDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();
  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_ADMIN });
    // console.log("Admin");
    message.success("Admin logout successfully!");
    navigate("/login");
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

  // console.log(courseId);

  const onFinish = async () => {
    try {
      await form.validateFields();
      if (!image) {
        message.error("Please fill in all the required fields.");
        return;
      }

      // if (!authorDescription || /^\s*$/.test(authorDescription)) {
      //   message.error("Please enter author description.");
      //   return;
      // }
      const cleanedAuthorDescription = authorDescription.replace(
        /<p>|<\/p>|<br>/g,
        ""
      );
      const formData = new FormData();
      formData.append("id", courseId);
      formData.append("authorImage", image);
      formData.append("authorName", authorName);
      formData.append("authorDiscription", cleanedAuthorDescription);

      const res = await dispatch(addAuthorDetails(formData));
      console.log(res);

      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const beforeUpload = (file) => {
    setImage(file);
    return false;
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImage(info.file.originFileObj);
    } else if (info.file.status === "removed") {
      setImage(null);
    }
  };

  return (
    <>
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
              <div className="advisor-breadcrumb">
                <div className="advisor-breadcrumb-subcontainer">
                  <p
                    style={{
                      fontSize: "22px",
                      fontFamily: "Rajdhani",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    Add Author Details
                  </p>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="/admin/dashboard">
                        <HomeOutlined />
                      </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Add Author Details</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="advisor-container">
                <div className="advisor-subcontainer">
                  <h2>Author Details</h2>
                  <Form
                    name="myForm"
                    onFinish={onFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Row gutter={16}>
                      <Col lg={12} sm={24} xs={24} md={8}>
                        <Form.Item
                          label="Authror Name"
                          name="authorName"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Name",
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => setAuthorName(e.target.value)}
                          />
                        </Form.Item>
                      </Col>

                      <Col lg={12} sm={24} xs={24} md={8}>
                        <Form.Item
                          label="Upload Image"
                          name="image"
                          rules={[
                            {
                              required: true,
                              message: "Please upload an image",
                            },
                          ]}
                        >
                          <Upload
                            beforeUpload={beforeUpload}
                            showUploadList={false}
                            onChange={handleImageChange}
                          >
                            {!image ? (
                              <Button
                                icon={<UploadOutlined />}
                                className="author-details-btn"
                              >
                                Click to Upload
                              </Button>
                            ) : (
                              <Input
                                placeholder="Selected Image"
                                value={image ? image.name : ""}
                                style={{width:'100%'}}
                                readOnly
                              />
                            )}
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col lg={12} sm={24} xs={24} md={8}>
                        <Form.Item
                          label="Author Description"
                          name="authorDescription"
                          rules={[
                            {
                              required: true,
                              message: "Please enter author description",
                            },
                          ]}
                        >
                          <ReactQuill
                            onChange={(content) =>
                              setAuthorDescription(content)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Button className="author-btn" htmlType="submit">
                        Add Details
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default AuthorDetails;
