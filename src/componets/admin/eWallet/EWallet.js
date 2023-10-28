import React from "react";
import { Breadcrumb ,Table,Button,Space} from "antd";
import { HomeOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";
import "./EWallet.css";

const tableContentStyle = {
  fontFamily: 'Rajdhani',
  textAlign:'center'
};

const dataSource = [
    {
      key: '1',
      SNo: 1,
      Name: 'John Doe',
      Amount: 100,
      RedeemDate: '2023-10-16',
    },
    {
      key: '2',
      SNo: 2,
      Name: 'Jane Smith',
      Amount: 50,
      RedeemDate: '2023-10-17',
    },
  
  ];
  


const EWallet = () => {
    const handleEdit = (key) => {
        
        console.log(`Edit action for row with key ${key}`);
      };
    
      const handleDelete = (key) => {
        
        console.log(`Delete action for row with key ${key}`);
      };

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
          title: 'Amount',
          dataIndex: 'Amount',
          key: 'Amount',
          onCell: () => {
            return {
              style: tableContentStyle,
            };
          },
        },
        {
          title: 'Redeem Date',
          dataIndex: 'RedeemDate',
          key: 'RedeemDate',
          onCell: () => {
            return {
              style: tableContentStyle,
            };
          },
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space>
              <Button htmlType="default" className="edit-button" onClick={() => handleEdit(record.key)}>
             <EditOutlined style={{fontSize:'16px',color:'green'}} />   Edit
              </Button>
              <Button htmlType="default"  className="delete-button" onClick={() => handleDelete(record.key)}>
              <DeleteOutlined style={{fontSize:'16px',color:'red'}} />  Delete
              </Button>
              </Space>
          ),
          onCell: () => {
            return {
              style: tableContentStyle,
            };
          },
        },
      ];
    
  return (
    <>
      <div className="ewallet-breadcrumb">
        <div className="ewallet-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            eWallet
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>eWallet</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="ewallet-container">
        <div className="ewallet-subcontainer">
        <div style={{ overflowX: 'auto' }}>
        <Table dataSource={dataSource} columns={columns} />
        </div>
        </div>
      </div>
    </>
  );
};

export default EWallet;
