import React from "react";
import { Breadcrumb, Row, Col, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const column = [
    {
      title: "Today",
      dataIndex: "today",
      key: "today",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },

    {
      title: "Last 7 Days",
      dataIndex: "last7Days",
      key: "last7Days",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Last 30 Days",
      dataIndex: "last30Days",
      key: "last30Days",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },

    {
      title: "All Time",
      dataIndex: "allTime",
      key: "allTime",
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
      today: "",
      last7Days: "",
      last30Days: "",
      allTime: "Prakhar Kulshrestha",
    },
  ];

  const columns = [
    {
      title: "Today",
      dataIndex: "today",
      key: "today",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },

    {
      title: "Last 7 Days",
      dataIndex: "last7Days",
      key: "last7Days",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Last 30 Days",
      dataIndex: "last30Days",
      key: "last30Days",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },

    {
      title: "All Time",
      dataIndex: "allTime",
      key: "allTime",
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
        today: "",
        last7Days: "",
        last30Days: "",
        allTime: "Prakhar Kulshrestha",
      },
  ];

  return (
    <div className="leaderboard-outer-container">
      <div className="leaderboard-breadcrumb">
        <div className="leaderboard-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Leaderboard
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Leaderboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="leaderboard-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="leaderboard-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Leaderboard</h2>
                <p>
                  This section will show you top leaders who are performing well
                  in our business.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="leaderboard-subcontainer1">
              <img src={rank} alt="rank" className="leaderboard-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 leaderboard-custom-container">
            <div className="leaderboard-nested-container">
              <h2>TOTAL COMMISSIONS</h2>
              <p>
                These affiliates have earned the most commissions with Affiliate
                Indians.
              </p>
              <div style={{ marginTop: "4px" }}>
                <Table columns={column} pagination={false} dataSource={data} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-12 col-md-12 leaderboard-custom-container"
          style={{ marginTop: "20px" }}
        >
          <div className="leaderboard-nested-container">
            <h2>TOTAL SIGN UPS (FREE ACCOUNTS AND PAID)</h2>
            <p>
                These affiliates have earned the most commissions with Affiliate
                Indians.
              </p>
            <div style={{ marginTop: "4px" }}>
              <Table
                columns={columns}
                pagination={false}
                dataSource={dataSource}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
