import React from "react";
import { Breadcrumb, Table, Image } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./ViewAdvisor.css";

const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
  };


const dataSource = [
  {
    key: "1",
    SNo: 1,
    Name: "John Doe",
    Email: "john@example.com",
    MobileNumber: "123-456-7890",
    Image: "https://example.com/image1.jpg",
  },

  {
    key: "2",
    SNo: 2,
    Name: "Jane Smith",
    Email: "jane@example.com",
    MobileNumber: "555-555-5555",
    Image: "https://example.com/image2.jpg",
  },
];

const columns = [
  {
    title: "SNo",
    dataIndex: "SNo",
    key: "SNo",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Mobile Number",
    dataIndex: "MobileNumber",
    key: "MobileNumber",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Image",
    dataIndex: "Image",
    key: "Image",
    render: (text, record) => (
      <Image src={text} 
    //   alt={`Image for ${record.Name}`} 
    alt='view'
      width={100} />
    ),
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
];

const ViewAdvisor = () => {
  return (
    <>
      <div className="view-advisor-breadcrumb">
        <div className="view-advisor-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            View Advisor
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>View Advisor</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="view-advisor-container">
        <div className="view-advisor-subcontainer">
          <h2>View Advisor</h2>
          <div style={{ overflowX: "auto" }}>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAdvisor;
