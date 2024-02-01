import React from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Table,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import "../leads/Leads.css";


const Reports = () => {

  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const columns = [
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
      title: "Customers",
      dataIndex: "customers",
      key: "customers",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Commisions",
      dataIndex: "commisions",
      key: "commisions",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Refunds",
      dataIndex: "refunds",
      key: "refunds",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Net Income",
      dataIndex: "netIncome",
      key: "netIncome",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];

 

  return (
    <div className="leads-outer-container">
      <div className="leads-breadcrumb">
        <div className="leads-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Reports
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Reports</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="leads-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="leads-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Reports</h2>
                <p>
                Check your Reports at Affiliate Indians below.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="leads-subcontainer1">
              <img src={rank} alt="rank" className="rank-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 leads-custom-container">
            <div className="leads-nested-container">
              <div className="inner-sub-container">
              <div style={{ overflowX: 'auto', scrollbarWidth: 'thin' }}>
                <Table
                //   dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  scroll={{ x: true }} 
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
