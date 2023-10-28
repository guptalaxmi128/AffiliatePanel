import React from "react";
import { Breadcrumb ,Table} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./MyBooking.css";


const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
  };

const dataSource = [
    {
      key: '1',
      SNo: 1,
      Name: 'John Doe',
      Date: '2023-10-16',
      Timing: '10:00 AM-11:00 AM',
      AdvisorName: 'Prakhar Kulshrestha',
    },
    {
      key: '2',
      SNo: 2,
      Name: 'Jane Smith',
      Date: '2023-10-17',
      Timing: '02:30 PM-4:00 PM',
      AdvisorName: 'Prakhar Kulshrestha',
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
      title: 'Timing',
      dataIndex: 'Timing',
      key: 'Timing',
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: 'Advisor Name',
      dataIndex: 'AdvisorName',
      key: 'AdvisorName',
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];
const MyBooking = () => {
  return (
    <>
      <div className="mybooking-breadcrumb">
        <div className="mybooking-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
        My Booking
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>My Booking</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="mybooking-container">
        <div className="mybooking-subcontainer">
          <h2>Schedule Booking</h2>
          <div style={{ overflowX: 'auto' }}>
          <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBooking;
