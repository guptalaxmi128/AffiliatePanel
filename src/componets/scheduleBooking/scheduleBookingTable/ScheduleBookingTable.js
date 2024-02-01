import React,{ useState,useEffect} from "react";
import { Breadcrumb ,Table,Input} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import moment from "moment";
import "./Booking.css";
import { getScheduleBooking } from "../../../actions/scheduleCall/scheduleCall";


const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
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
      render: (text) => (text ? text : "-"),
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
      render: (text) => (text ? text : "-"),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];
const ScheduleBookingTable = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.scheduleCall.scheduleCall);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searchedDate, setSearchedDate] = useState(null);
  console.log(booking)

  const handleSearch = (value) => {
    setSearchedDate(value);
    dispatch(getScheduleBooking(value));
  };

  useEffect(() => {
    filterData();
  }, [booking]);

  const filterData = () => {
    const filteredData = booking?.data?.filter(
      (record) => record.date === searchedDate && record.bookingStatus === "BOOKED"
    );
    const filteredDataWithKey = filteredData?.map((record, index) => ({
      ...record,
      key: index + 1,
    }));
    setFilteredDataSource(filteredDataWithKey);
  };
  return (
    <>
      <div className="booking-breadcrumb">
        <div className="booking-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Schedule Booking
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Schedule Booking</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="booking-container">
        <div className="booking-subcontainer">
          <h2>Schedule Booking</h2>
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

export default ScheduleBookingTable;
