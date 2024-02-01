import React from "react";
import { Breadcrumb, Row, Col, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import "./Commission.css";

const Commission = () => {
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
      title: "Yesterday",
      dataIndex: "yesterday",
      key: "yesterday",
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
      title: "Last 365 Days",
      dataIndex: "last365Days",
      key: "last365Days",
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
      today: "₹ 0",
      yesterday: "₹ 0",
      last7Days: "₹ 0",
      last30Days: "₹ 0",
      last365Days: "₹ 0",
      allTime: "₹ 999.6",
    },
  ];

  const columns = [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Sale Amount",
      dataIndex: "saleAmount",
      key: "saleAmount",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Commission Amount",
      dataIndex: "commissionAmount",
      key: "commissionAmount",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      date: "18/12/2023",
      name: "Tanu Priya",
      product: "Affiiate Indians Blueprint",
      saleAmount: "₹2499",
      commissionAmount: "₹999.6",
      status: "Added To The Wallet",
    },
  ];

  return (
    <div className="commission-outer-container">
      <div className="commission-breadcrumb">
        <div className="commission-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Commisions
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Commisions</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="commission-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="commission-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Commisions</h2>
                <p>
                  Check the Commisions below and start earning with Affiliate
                  Indians
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="commission-subcontainer1">
              <img src={rank} alt="rank" className="commission-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 commission-custom-container">
            <div className="commission-nested-container">
              <h2>MY TOTAL COMMISSIONS</h2>
              <div style={{ marginTop: "4px",overflowX: 'auto' }}>
                <Table columns={column} pagination={false} dataSource={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 commission-custom-container" style={{marginTop:'20px'}}>
          <div className="commission-nested-container">
            <h2>MY COMMISSIONS LOG</h2>
            <div style={{ marginTop: "4px",overflowX: 'auto' }}>
          
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

export default Commission;
