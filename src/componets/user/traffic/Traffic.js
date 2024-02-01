import React from "react";
import { Breadcrumb, Row, Col, Button, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import "../stream/Stream.css";

const Traffic = () => {
  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "trafficName",
      dataIndex: "trafficName",
      render: (text, record) => (
        <>
          <span>{record.trafficName}</span>
        </>
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Button
          style={{ background: "#ddb42c", fontWeight: 500 }}
          // onClick={() => onActionClick(record)}
        >
          Call To Action
        </Button>
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];

  const data = [
    {
      key: 1,
      trafficName: "UDIMI",
    },
  ];
  return (
    <div className="stream-outer-container">
      <div className="stream-breadcrumb">
        <div className="stream-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Get Traffic
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Get Traffic</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="stream-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="stream-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Get Traffic</h2>
                <p>
                  Check the Get Traffic Section and bring your traffic Affiliate
                  Indians
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="stream-subcontainer1">
              <img src={rank} alt="rank" className="stream-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 stream-custom-container">
            <div className="stream-nested-container">
              <h2>Get Traffic</h2>
              <Table
                dataSource={data}
                columns={columns}
                showHeader={false}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;
