import React from "react";
import { Breadcrumb, Collapse } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./FAQ.css";

const { Panel } = Collapse;

const FAQ = () => {
  return (
    <>
     <div className="faq-outer-container">
      <div className="faq-breadcrumb">
        <div style={{ display: "flex", justifyContent: "space-between",alignItems:'center' }}>
          <p style={{ fontSize: "22px", fontFamily: "Rajdhani",padding:0,margin:0 }}>
            Frequently Asked Questions
          </p>
          <Breadcrumb >
            <Breadcrumb.Item>
              <a href="/user">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>FAQs</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="faq">
      <div className="faq-container">
        <div className="faq-subcontainer">
          <h2>FAQs</h2>
          <Collapse accordion>
            <Panel header="Can I request a refund?" key="1">
              No, Affiliate Indians has a strict No Refund Policy. Members are
              not allowed under any circumstances to issue refunds as all
              Affiliate Indians members are given instant access to the members
              area and this access cannot be taken back.
            </Panel>
            <Panel header="Question 2" key="2">
              Answer 2
            </Panel>
          </Collapse>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default FAQ;
