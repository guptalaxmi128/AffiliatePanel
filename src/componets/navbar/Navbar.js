import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import { Layout,  Menu, Button,Row ,Col,Space } from "antd";
import {
    DashboardOutlined,
    MenuOutlined,
    UserOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    PercentageOutlined,
    TeamOutlined,
  
  } from "@ant-design/icons";
  import logo from "../../assets/img/logo_white.png";
 

  
const { Header } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    

    // Function to toggle the mobile menu
    const toggleMobileMenu = () => {
      setShowMobileMenu(!showMobileMenu);
    };

    const menuItems = [
        {
          key: "1",
          label: "Login",
          icon: <DashboardOutlined />,
          link:"/sign_in"
         
        },
        // {
        //   key: "2",
        //   label: "Products",
        //   icon: <UserOutlined />,
        //   subMenu: [
        //     {
        //       key: "2.1",
        //       label: "Sales & Marketing",
        //       link: "#",
        //       icon: <UserOutlined />,
        //     },
        //     {
        //       key: "2.2",
        //       label: "Support Service",
        //       link: "#",
        //       icon: <SettingOutlined />,
        //     },
        //   ],
        // },
        {
          key: "2",
          label: "Pricing",
          icon: <QuestionCircleOutlined />,
        
        },
        // {
        //   key: "4",
        //   label: "Creator Login",
        //   icon: <PercentageOutlined />,
        //   link: "/login",
        // },
        // {
        //   key: "5",
        //   label: "Start for Free",
        //   icon: <TeamOutlined />,
        //   link: "/signup",
        // },
      ];
    return (
        <>
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
                            // style={{ visibility: item.label !== 'Login' ? 'hidden' : 'visible' }} 
                             /* to hide the other menu */
                          >
                            <Link to={subItem.link}>{subItem.label}</Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    ) : (
                      <Menu.Item key={item.key} icon={item.icon}    style={{ visibility: item.label !== 'Login' ? 'hidden' : 'visible' }}> 
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
         {showMobileMenu && (
            <div className="mobile-menu show">
              <Menu theme="dark" mode="inline" inlineIndent={16}>
                {menuItems.map((item) =>
                  item.subMenu ? (
                    <SubMenu key={item.key} title={item.label} icon={item.icon} >
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
          </>
     
  );
};
    


export default Navbar;