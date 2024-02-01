import React from "react";
import { Tabs,Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import RegisterUser from "./RegisterUser";
import BlockUser from "./BlockUser";
import EnrollCourse from "./enrollCourse/EnrollCourse";



const { TabPane } = Tabs;





const AdminUser = () => {
  return (
    <>
       <div className="user-breadcrumb">
        <div className="user-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Register User
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    <div className="registration-form-container">
    <div className="registration-form-subcontainer">
      <Tabs defaultActiveKey="1" tabPosition="top">
        <TabPane tab="All Users" key="1">
         <RegisterUser />
        </TabPane>
        <TabPane tab="Blocked Users" key="2">
       <BlockUser />
        </TabPane>
        <TabPane tab="Enroll Course" key="3">
       <EnrollCourse />
        </TabPane>
      </Tabs>
      </div>
    </div>
    </>
  );
};

export default AdminUser;
