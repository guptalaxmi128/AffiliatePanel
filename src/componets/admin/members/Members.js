import React from 'react';
import { Breadcrumb, Table } from "antd";
import { HomeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./Members.css";

const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
  };

const dataSource = [
  {
    key: '1',
    SNo: 1,
    Date: '2023-10-16',
    Funnel: 'Funnel A',
    Tag: 'Tag 1',
    Name: 'John Doe',
    Email: 'john@example.com',
    MobileNumber: '123-456-7890',
    LastTrainingDayCompleted: '2023-10-12',
  },
  {
    key: '2',
    SNo: 2,
    Date: '2023-10-16',
    Funnel: 'Funnel B',
    Tag: 'Tag 2',
    Name: 'Jane Smith',
    Email: 'jane@example.com',
    MobileNumber: '555-555-5555',
    LastTrainingDayCompleted: '2023-10-14',
  },
];

const columns = [
  {
    title: 'SNo',
    dataIndex: 'SNo',
    key: 'SNo',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Funnel',
    dataIndex: 'Funnel',
    key: 'Funnel',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Tag',
    dataIndex: 'Tag',
    key: 'Tag',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Mobile Number',
    dataIndex: 'MobileNumber',
    key: 'MobileNumber',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: 'Last Training Day Completed',
    dataIndex: 'LastTrainingDayCompleted',
    key: 'LastTrainingDayCompleted',
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
];

const Members = () => {
  return (

           <>
      <div className="members-breadcrumb">
        <div
          className="members-breadcrumb-subcontainer"
        >
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
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Members</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="members-container">
        <p className="mobile-warning">
          <ExclamationCircleOutlined
            style={{ fontSize: "20px", color: "red" }}
          />
         &nbsp; Tables can be scrolled horizontally
        </p>
        <div className="members-subcontainer">
        <div style={{ overflowX: 'auto' }}>
          <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  )
};

export default Members;
