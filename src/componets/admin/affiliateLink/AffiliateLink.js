import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Dropdown, Menu, message } from "antd";
import { EllipsisOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLinkRequest,
  updateAcceptRequest,
  updateBlockRequest,
  updateUnblockRequest
} from "../../../actions/affiliateLink/affiliateLink";
import "./AffiliateLink.css";

const tableContentStyle = {
  fontFamily: "Rajdhani",
  textAlign: "center",
};

const AffiliateLink = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.linkRequest.linkRequest);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(getLinkRequest());
  }, [dispatch]);

  useEffect(() => {
    if (data.data) {
      setDataSource(data.data);
    }
  }, [data.data]);
  console.log(dataSource);

  const columns = [
    {
      title: "SNo",
      dataIndex: "SNo",
      key: "SNo",
      render: (text, record, index) => index + 1,
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Mobile Number",
      dataIndex: ["user", "mobileNumber"],
      key: "mobileNumber",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Address",
      dataIndex: ["user", "address"],
      key: "address",
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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Dropdown overlay={() => actionsMenu(record)}>
          <EllipsisOutlined style={{ cursor: "pointer", fontSize: "20px" }} />
        </Dropdown>
      ),
      onCell: () => ({
        style: tableContentStyle,
      }),
    },
  ];

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="accept" onClick={() => handleAction("accept", record)}>
        Accept Request
      </Menu.Item>
      <Menu.Item key="block" onClick={() => handleAction("block", record)}>
        Block Request
      </Menu.Item>
      <Menu.Item key="unblock" onClick={() => handleAction("unblock", record)}>
        Unblock Request
      </Menu.Item>
    </Menu>
  );

  const handleAction = async (action, record) => {
    try {
      switch (action) {
        case "accept":
          console.log(record.id);
          const res = await dispatch(updateAcceptRequest(record.id));
          if (res.success) {
            message.success(res.message);
          }

          break;
        case "block":
          const response = await dispatch(updateBlockRequest(record.id));
          if (response.success) {
            message.success(response.message);
          }
        
          break;
        case "unblock":
          const responseUnblock = await dispatch(updateUnblockRequest(record.id));
          if (responseUnblock.success) {
            message.success(responseUnblock.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("An error occurred:", error);
     console.log(error.response.data.message)
      message.error("An error occurred");
    }
  };

  return (
    <>
      <div className="affiliate-link-breadcrumb">
        <div className="affiliate-link-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Affiliate Link
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Affiliate Link</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="affiliate-link-container">
        <div className="affiliate-link-subcontainer">
          <h2>Affiliate Link</h2>
          <div style={{ overflowX: "auto" }}>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliateLink;
