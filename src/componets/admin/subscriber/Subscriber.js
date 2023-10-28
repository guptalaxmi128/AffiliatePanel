import React from "react";
import { Breadcrumb, Tabs } from "antd";
import {
  HomeOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import "./Subscriber.css";
import NewSubscriber from "./newSubscriber/NewSubscriber";

const { TabPane } = Tabs;

const Subscriber = () => {
  return (
    <>
      <div className="subscriber-breadcrumb">
        <div className="subscriber-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Subscriber
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Subscriber</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="subscriber-container">
        <div className="subscriber-subcontainer">
          <h2>Subscriber</h2>
          <div style={{ padding: "20px" }}>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <AppleOutlined />
                    Net new subscribers
                  </span>
                }
                key="1"
              >
                <NewSubscriber />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <AndroidOutlined />
                    Total subscribers
                  </span>
                }
                key="2"
              >
                {/* <MyComponent2 /> */}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <WindowsOutlined />
                    Purchases
                  </span>
                }
                key="3"
              >
                {/* <Assignment /> */}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <WindowsOutlined />
                    Unsubscribes
                  </span>
                }
                key="4"
              >
                {/* <Assignment /> */}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriber;
