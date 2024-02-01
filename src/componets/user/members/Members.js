import React from "react";
import { Breadcrumb, Row, Col, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import rank from "../../../assets/img/affiliate.jpg";
import "../eWallet/EWallet.css";

const Members = () => {
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
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "CourseId",
      dataIndex: "courseId",
      key: "courseId",
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
      userId: "1232",
      courseId: "2",
      name: "Deepak",
      email: "deepak@gmail.com",
      mobileNumber: "1234567845",
    },
  ];

  return (
    <div className="ewallet-outer-container">
      <div className="ewallet-breadcrumb">
        <div className="ewallet-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Members
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Members</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="ewallet-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="ewallet-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Members Section</h2>
                <p>
                  It will show you the members entered to your affiliate links.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="ewallet-subcontainer1">
              <img src={rank} alt="rank" className="rank-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 ewallet-custom-container">
            <div className="ewallet-nested-container">
              <div className="inner-sub-container">
                <div style={{ overflowX: "auto" }}>
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

export default Members;
