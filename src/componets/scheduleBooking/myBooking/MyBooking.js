import React, { useEffect, useState} from "react";
import { Breadcrumb, Table, Input } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import moment from "moment";
import "./MyBooking.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyBooking } from "../../../actions/scheduleCall/scheduleCall";

const tableContentStyle = {
  fontFamily: "Rajdhani",
  textAlign: "center",
  fontSize: "16px",
  color: "#000",
};

const { Search } = Input;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    key: "SNo",
    render: (index) => index,
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
    render: (text) => (text ? text : "MyBooking"),
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
    render: (text) => moment(text).format("DD-MM-YYYY"), 
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Timing",
    dataIndex: "timing",
    key: "timing",
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
  {
    title: "Advisor Name",
    dataIndex: "AdvisorName",
    key: "AdvisorName",
    render: (text) => (text ? text : "MyBooking"),
    onCell: () => {
      return {
        style: tableContentStyle,
      };
    },
  },
];
const MyBooking = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.scheduleCall.scheduleCall);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searchedDate, setSearchedDate] = useState(null);
  // console.log(booking)

  const handleSearch = (value) => {
    setSearchedDate(value);
    dispatch(getMyBooking(value));
  };

  useEffect(() => {
    filterData();
  }, [booking]);

  const filterData = () => {
    const filteredData = booking?.data?.filter(
      (record) => record.date === searchedDate && record.timing !== null
    );
    const filteredDataWithKey = filteredData?.map((record, index) => ({
      ...record,
      key: index + 1,
    }));
    setFilteredDataSource(filteredDataWithKey);
  };

  // console.log(filteredDataSource);
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
          <h2>My Booking</h2>
          <Search
            placeholder="Search by Date (2023-12-01)"
            onSearch={handleSearch}
            style={{ marginBottom: 16 }}
          />
          {filteredDataSource?.length > 0 && ( 
            <div style={{ overflowX: "auto" }}>
              <Table dataSource={filteredDataSource} columns={columns} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBooking;
