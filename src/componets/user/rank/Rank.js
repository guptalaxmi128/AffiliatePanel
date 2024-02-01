import React, { useState } from "react";
import { Breadcrumb, Row, Col, Table } from "antd";
import { HomeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import head from "../../../assets/img/affilite-head.jpg";
import "./Rank.css";

const Rank = () => {
  const [showText, setShowText] = useState(false);

  const handleIconClick = () => {
    setShowText(!showText);
  };

  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const columns = [
    {
      title: "The Next Rank is",
      dataIndex: "nextRank",
      key: "nextRank",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "You are misssing",
      dataIndex: "missing",
      key: "missing",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Current Earned Commission",
      dataIndex: "earnCommission",
      key: "earnCommission",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];

  const dataSource = [
    {
      key: 1,
      nextRank: "SILVER (₹ 10000)",
      missing: "₹ 9000.4",
      earnCommission: "₹ 999.6",
    },
  ];

  const column = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Amount Reached",
      dataIndex: "amountReached",
      key: "amountReached",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Rank Name",
      dataIndex: "rankName",
      key: "rankName",
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
      date: "18/12/2023",
      amountReached: "₹ 996.6",
      rankName: "AFFILIATE",
    },
  ];

  return (
    <div className="rank-outer-container">
      <div className="rank-breadcrumb">
        <div className="rank-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Rank
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Rank</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="rank-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="rank-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Ranks</h2>
                <p>Check your rank below and enjoy with Affiliate Indians</p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="rank-subcontainer1">
              <img src={rank} alt="rank" className="rank-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 rank-custom-container">
            <div className="rank-nested-container">
              <div className="rank-subcontainer">
                <p
                  style={{ fontSize: "18px", fontFamily: "Rajdhani" }}
                  onClick={handleIconClick}
                >
                  <QuestionCircleOutlined
                    style={{ fontSize: "16px", color: "#1890ff" }}
                  />
                  &nbsp; Click For Rank Definitions
                </p>
              </div>
              {showText && (
                <div style={{ background: "#fff", padding: "10px" }}>
                  <p className="rank-text">
                    Affiliate: Someone who has created an affiliate account but
                    has not made any sales.
                  </p>
                  <p className="rank-text">SILVER: Earning= Rs.10,000 </p>
                  <p className="rank-text">GOLD: Earning= Rs.20,000 </p>
                  <p className="rank-text">PLATINUM: Earning= Rs.50,000</p>
                  <p className="rank-text"> DIAMOND: Earning= Rs.1-Lakh+</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-lg-12 col-md-12 rank-custom-container"
          style={{ marginTop: "20px" }}
        >
          <div className="rank-nested-subcontainer">
            <Table
              columns={columns}
              pagination={false}
              dataSource={dataSource}
            />
          </div>
        </div>
        <div
          className="col-lg-12 col-md-12 rank-custom-container"
          style={{ marginTop: "20px" }}
        >
          <div className="rank-nested-container">
            <h2>Rank History</h2>
          </div>
          <div
            className="rank-nested-subcontainer"
            style={{ marginTop: "4px" }}
          >
            <Table columns={column} pagination={false} dataSource={data} />
          </div>
        </div>
        <div
          className="col-lg-12 col-md-12 rank-custom-container"
          style={{ marginTop: "20px" }}
        >
          <div className="rank-nested-container">
            <h2>Meet Our Diamond Affiliate's</h2>
          </div>
          <div style={{ background: "#f5f4f7" }}>
            <div className="rank-diamond-container">
              <img
                src={head}
                alt="affiliate-icon"
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
              <p className="rank-text1">
                Prakhar Kulshrestha
                <p>(The CEO & FOUNDER Of Affiliate Indians)</p>
              </p>
            </div>
          </div>
        </div>

        <div
          className="col-lg-12 col-md-12 rank-custom-container"
          style={{ marginTop: "20px" }}
        >
          <div className="rank-nested-container">
            <h2>Meet Our Platinum Affiliate's</h2>
          </div>
          <div style={{ background: "#f5f4f7" }}>
            <p className="rank-text2">No Data Available</p>
          </div>
        </div>
        <div
          className="col-lg-12 col-md-12 rank-custom-container"
          style={{ marginTop: "20px" }}
        >
          <div className="rank-nested-container">
            <h2>Meet Our Platinum Affiliate's</h2>
          </div>
          <div style={{ background: "#f5f4f7" }}>
            <p className="rank-text2">No Data Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
