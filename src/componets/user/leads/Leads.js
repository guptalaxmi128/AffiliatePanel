import React from "react";
import {
  Breadcrumb,
  Row,
  Col,
//   Button,
//   Input,
//   message,
//   Form,
  Table,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
import rank from "../../../assets/img/affiliate.jpg";
import "./Leads.css";

const Leads = () => {
//   const [form] = Form.useForm();
//   const dispatch = useDispatch();

  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
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
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      sno: 1,
      date: "24/04/2022",
      tag: "utube190422",
      name: "Deepak",
      email: "deepak@gmail.com",
      mobileNumber: "1234567845",
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
            Leads
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Leads</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="leads-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="leads-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Leads</h2>
                <p>
                  It will show you all the leads captured from your affiliate
                  links.
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
              <div style={{overflowX:'auto'}}>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
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

export default Leads;
