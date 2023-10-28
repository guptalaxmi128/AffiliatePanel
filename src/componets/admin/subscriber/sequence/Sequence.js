import React from "react";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import "./Sequence.css";
import { Link } from "react-router-dom";

const Sequence = () => {
  return (
    <>
      <div className="sequence-breadcrumb">
        <div className="sequence-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Sequence
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sequence</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="sequence-container">
        <div className="sequence-subcontainer">
          <div className="sequence-subcontainer0">
            <h2>Sequences</h2>
            <Link to="/admin/sequences/new">
            <Button className="sequence-btn">
              <PlusOutlined style={{ fontSize: "14px" }} /> &nbsp; New Sequence
            </Button>
            </Link>
          </div>
          <div className="sequence-subcontainer1">
            <h2>Get started with Sequences</h2>

            <div className="video-container">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/LAOzjjy-NNQ"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
            </div>
            <div className="sequence-subcontainer2">
            <h2>Build trust and consistency using automated emails</h2>
            <p>Sequences are automatic emails that are sent to subscribers after being triggered by a form, tag, or custom field.</p>
           <p>Send a welcome sequence, thank new buyers, or follow up with interested readers with just a few clicks.</p> 
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Sequence;
