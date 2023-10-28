import React from "react";
import { Breadcrumb, Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./Users.css";

const tableContentStyle = {
  fontFamily: "Rajdhani",
  textAlign: "center",
};

const dataSource = [
  {
    key: "1",
    SNo: 1,
    Name: "John Doe",
    Email: "john@example.com",
    MobileNumber: "1234567890",
    Address: "123 Main St",
    City: "Example City",
    State: "Example State",
    Country: "Example Country",
    Pincode: "12345",
    DateOfJoining: "2023-10-01",
    AID: "A12345",
    AIDName: "AIDName1",
    PaidStatus: "Paid",
    LoginToken: "Token1",
    LastLogin: "2023-10-15",
    isBlocked: false,
  },
  {
    key: "2",
    SNo: 2,
    Name: "Jane Smith",
    Email: "jane@example.com",
    MobileNumber: "5555555555",
    Address: "456 Elm St",
    City: "Another City",
    State: "Another State",
    Country: "Another Country",
    Pincode: "54321",
    DateOfJoining: "2023-09-15",
    AID: "B54321",
    AIDName: "AIDName2",
    PaidStatus: "Not Paid",
    LoginToken: "Token2",
    LastLogin: "2023-10-14",
    isBlocked: true,
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
    render: (text, record) => (
        <Link to={`/admin/${record.key}`} style={{textDecoration:'none'}}> 
          {text}
        </Link>
    ) 
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
    title: "Address",
    dataIndex: "Address",
    key: "Address",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "City",
    dataIndex: "City",
    key: "City",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "State",
    dataIndex: "State",
    key: "State",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Country",
    dataIndex: "Country",
    key: "Country",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Pincode",
    dataIndex: "Pincode",
    key: "Pincode",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Date of Joining",
    dataIndex: "DateOfJoining",
    key: "DateOfJoining",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "AID",
    dataIndex: "AID",
    key: "AID",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "AID Name",
    dataIndex: "AIDName",
    key: "AIDName",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Paid Status",
    dataIndex: "PaidStatus",
    key: "PaidStatus",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Login Token",
    dataIndex: "LoginToken",
    key: "LoginToken",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Last Login",
    dataIndex: "LastLogin",
    key: "LastLogin",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Block / Unblock",
    dataIndex: "BlockUnblock",
    key: "BlockUnblock",
    render: (_, record) => (
      <div>
        {
          <Space>
            <Button className="block-btn">Block</Button>
            <Button className="unblock-btn">Unblock</Button>
          </Space>
        }
      </div>
    ),
  },
];

const Users = () => {
  return (
    <>
      <div className="users-breadcrumb">
        <div className="users-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
             Users
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/super-admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="users-container">
        <p style={{fontFamily:'Rajdhani'}}>
          <ExclamationCircleOutlined
            style={{ fontSize: "20px", color: "red" }}
          />
          &nbsp; Tables can be scrolled horizontally
        </p>
        <div className="users-subcontainer">
          <div style={{ overflowX: "auto" }}>
            <Table dataSource={dataSource} columns={columns} />;
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
