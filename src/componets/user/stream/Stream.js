import React from "react";
import { Breadcrumb, Row, Col, Button, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import marketingImage from "../../../assets/img/email-marketing.png";
import "./Stream.css";

const Stream = () => {
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
      title: "Product Name",
      dataIndex: "productName",
      render: (text, record) => (
        <>
          {record.imageUrl && (
            <img src={record.imageUrl} alt={record.productName} />
          )}

          <span>{record.productName}</span>
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
      render: (text, record) =>
        record.imageUrl ? null : (
          <Button
            style={{ background: "#ddb42c", fontWeight: 500 }}
            // onClick={() => onActionClick(record)}
          >
            Call To Action
          </Button>
        ),
    },
  ];

  const data = [
    {
      key: 1,
      productName: "25 DOLLAR 1UP",
    },
    {
      key: 2,
      imageUrl: `${marketingImage}`,
    },
    {
      key: 3,
      productName: "BUILDERALL",
    },
    {
      key: 4,
      productName: "LEGENDARY MARKETER",
    },
    {
      key: 5,
      productName: "Netmoney",
    },
    {
      key: 6,
      productName: "Digital Income",
    },
    {
      key: 7,
      productName: "Mobincome",
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
            Streams of Income
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Streams of Income</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="stream-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="stream-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Streams of Income</h2>
                <p>
                  Choose the links from below and start promoting our products
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
              <h2>Streams of Income</h2>
              <div style={{overflowX: 'auto' }}>
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
    </div>
  );
};

export default Stream;
