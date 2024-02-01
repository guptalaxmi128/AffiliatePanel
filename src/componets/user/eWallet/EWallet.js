import React, { useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Input,
  message,
  Form,
  Table,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import rank from "../../../assets/img/affiliate.jpg";
import "./EWallet.css";

const EWallet = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [redeemVisible, setRedeemVisible] = useState(false);

  const handleRedeemClick = () => {
    setRedeemVisible(!redeemVisible);
  };

  const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
  };

  const data = [
    {
      title: "Wallet Amount",
      content: redeemVisible && <Input placeholder="Enter Amount" />,
    },
    {
      title: "₹10.00",
      content: redeemVisible && (
        <Button type="primary" /* onClick={handleRedeemClick} */>Redeem</Button>
      ),
    },
    {
      title: (
        <Button type="primary" onClick={handleRedeemClick}>
          Redeem Amount
        </Button>
      ),
    },
  ];

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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Redeem Date",
      dataIndex: "redeemDate",
      key: "redeemDate",
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
      key: "1",
      sno: 1,
      amount: "₹10.00",
      redeemDate: "2023-01-01",
      status: "Pending",
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
            eWallet
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user/my-courses">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>eWallet</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="ewallet-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="ewallet-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to E-Wallet</h2>
                <p>Check your wallet transaction records here.</p>
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
              <h2>Access Your Wallet</h2>
              <div className="inner-sub-container">
                <Row gutter={[16, 16]}>
                  {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <div className="wallet-amount-container">
                      <p>Wallet Amount</p>
                      {redeemVisible && <Input placeholder="Enter Amount" />}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <div className="wallet-amount-container">
                      <p>₹10.00</p>
                      {redeemVisible && (
                        <Button
                          type="primary"
                          //   onClick={handleRedeemClick}
                        >
                          Redeem
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Button type="primary" onClick={handleRedeemClick}>
                      Redeem Amount
                    </Button>
                  </Col> */}

                  {data.map((item, index) => (
                    <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8}>
                      <div className="wallet-amount-container">
                        <p style={{fontFamily:'Rajdhani',textAlign:'center'}}>{item.title}</p>
                       <div style={{textAlign:'center'}}> {item.content}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{marginTop:'10px'}}>
        <div className="rows">
          <div className="col-lg-12 col-md-12 ewallet-custom-container">
            <div className="ewallet-nested-container">
              <h2>Redeem Requests</h2>
              <div className="inner-sub-container">
              <div style={{overflowX:'auto'}}>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EWallet;
