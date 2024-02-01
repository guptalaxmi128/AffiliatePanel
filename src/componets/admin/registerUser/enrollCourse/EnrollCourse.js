import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Select,
  Form,
  Row,
  Col,
  message,
  Checkbox,
} from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../RegisterUser.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addBulkUserToCourse,
  getAdminUser,
  // updateBlockUser,
} from "../../../../actions/adminUser/adminUser";
import { getCourse } from "../../../../actions/course/course";

const tableContentStyle = {
  fontFamily: "Rajdhani",
  textAlign: "center",
};

const { Option } = Select;

const EnrollCourse = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminUser.users);
  const course = useSelector((state) => state.course.course);
  const [dataSource, setDataSourse] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedFilter, setSelectedFilter] = useState("Select Filter");
  const [loading, setLoading] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
 

  const handleUserSelection = (userId, selected) => {
    if (selected) {
      setSelectedUserIds((prevIds) => [...prevIds, userId]);
    } else {
      setSelectedUserIds((prevIds) => prevIds.filter((id) => id !== userId));
    }
  };

  useEffect(() => {
    // Select all checkboxes on the current page when pageSize changes
    setSelectedUserIds(
      dataSource
        .slice(0, pageSize)
        .map((user) => user.id)
    );
  }, [pageSize, dataSource]);

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
         checked={selectedUserIds.includes(record.id)}
          onChange={(e) => handleUserSelection(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: "SNo",
      dataIndex: "index",
      key: "SNo",
      render: (text, record, index) => <span>{index + 1}</span>,
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
      render: (text, record) => (
        <a
          href={`/user/${record.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
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
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Pincode",
      dataIndex: "pinCode",
      key: "pinCode",
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
    // {
    //   title: "Block",
    //   dataIndex: "Block",
    //   key: "Block",
    //   render: (_, record) => (
    //     <div>
    //       {
    //         <Space>
    //           <Button
    //             className="block-button"
    //             onClick={() => handleBlock(record.id)}
    //           >
    //             Block
    //           </Button>
    //         </Space>
    //       }
    //     </div>
    //   ),
    // },
  ];

  const handleEnrollSelected = async () => {
    try {
      if (selectedUserIds.length === 0 || !selectedCourse) {
        message.error("Please select users and a course before enrolling.");
        return;
      }

      const batchCount = Math.ceil(selectedUserIds.length / 250);

      for (let i = 0; i < batchCount; i++) {
        const startIdx = i * 250;
        const endIdx = (i + 1) * 250;
        const batchIds = selectedUserIds.slice(startIdx, endIdx);

        const usersToEnroll = batchIds.filter(userId => {
          const user = dataSource.find(u => u.id === userId);
          return user && user.courseId !== selectedCourse;
        });

        const data = {
          userId: usersToEnroll,
          courseId: selectedCourse,
        };

        // console.log(data)
        const res = await dispatch(addBulkUserToCourse(data));

        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      }
    } catch (error) {
      console.error("Error enrolling users:", error);
      message.error("An error occurred while enrolling users.");
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    // Clear selected users when page changes
    setSelectedUserIds([]);
  };

  const handlePageSizeChange = (current, size) => {
    // Select all checkboxes on the current page when page size changes
    setPageSize(size);
    
    const newSelectedUserIds = dataSource
      .slice((current - 1) * size, current * size)
      .map((user) => user.id);
  
    // Merge the newly selected user ids with the previously selected ones
    setSelectedUserIds((prevIds) => [...new Set([...prevIds, ...newSelectedUserIds])]);
 
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setSearchText("");
    setSelectedCourse(null);
  };

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdminUser());
  }, [dispatch]);

  useEffect(() => {
    if (users.data) {
      setDataSourse(users.data);
    }
  }, [users.data]);

  // console.log("adminuser", users);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const params = {
        page: currentPage,
        limit: pageSize,
        search: searchText,
        // courseId: selectedCourse,
      };

      // if (!selectedCourse) {
      //   delete params.courseId;
      // }

      if (!searchText) {
        delete params.search;
      }

      await dispatch(getAdminUser(params));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, 
    // selectedCourse,
     searchText, currentPage, pageSize]);

  useEffect(() => {
    if (course.data) {
      setAllCourse(course.data);
    }
  }, [course.data]);
  // console.log(users);

  const handleCourseSelection = (value) => {
    setSelectedCourse(value);
  };

  const getFilterInput = () => {
    switch (selectedFilter) {
      case "Name":
        return (
          <Select
            placeholder="Select Name"
            style={{ width: 200, marginBottom: 10 }}
            onChange={(value) => setSearchText(value)}
            value={searchText}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataSource.map((user) => (
              <Option key={user.id} value={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>
        );
      case "Email":
        // const uniqueEmails = new Set(dataSource.map((user) => user.email));
        return (
          <Select
            placeholder="Select Email"
            style={{ width: 200, marginBottom: 10 }}
            onChange={(value) => setSearchText(value)}
            value={searchText}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataSource.map((user) => (
              <Option key={user.id} value={user.email}>
                {user.email}
              </Option>
            ))}
          </Select>
        );

      case "Mobile Number":
        return (
          <Select
            placeholder="Select Mobile Number"
            style={{ width: 200, marginBottom: 10 }}
            onChange={(value) => setSearchText(value)}
            value={searchText}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataSource.map((user) => (
              <Option key={user.id} value={user.mobileNumber}>
                {user.mobileNumber}
              </Option>
            ))}
          </Select>
        );
      default:
        return (
          <Select
            placeholder="Select Course"
            style={{ width: 200, marginBottom: 10 }}
            onChange={handleCourseSelection}
            value={selectedCourse}
          >
            {allCourse.map((course) => (
              <Option key={course.id} value={course.id}>
                {course.title}
              </Option>
            ))}
          </Select>
        );
      // default:
      //   return null;
    }
  };

  const handleExportCSV = () => {
    const filteredData = dataSource.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.mobileNumber.toLowerCase().includes(searchText.toLowerCase())
    );

    const csvData = [
      [
        "Name",
        "Email",
        "Mobile Number",
        "Address",
        "City",
        "State",
        "Country",
        "Pin Code",
        //  "Course"
      ],
      ...filteredData.map((user) => [
        user.name,
        user.email,
        user.mobileNumber,
        user.address,
        user.city,
        user.state,
        user.country,
        user.pinCode,
        // user.course, // Assuming 'course' is a field in your data
      ]),
    ];

    const arrayToCSV = (arr) => {
      return arr
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");
    };

    const csvString = arrayToCSV(csvData);
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user_data_${searchText}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleExportPDF = () => {
    const filteredData = dataSource.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.mobileNumber.toLowerCase().includes(searchText.toLowerCase())
    );

    const pdfData = filteredData.map((user) => ({
      Name: user.name,
      Email: user.email,
      "Mobile Number": user.mobileNumber,
      // Address: user.address,
      // City: user.city,
      // State: user.state,
      // Country: user.country,
      // "Pin Code": user.pinCode,
      // Course: user.course, // Assuming 'course' is a field in your data
    }));

    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.autoTable({
      head: [Object.keys(pdfData[0])],
      body: pdfData.map((row) => Object.values(row)),
    });

    doc.save(`user_data_${searchText}.pdf`);
  };

  // const handleBlock = async (id) => {
  //   try {
  //     console.log(`Block clicked for id: ${id}`);
  //     const res = await dispatch(updateBlockUser(id));

  //     if (res.success) {
  //       message.success(res.message);
  //     } else {
  //       message.error(res.message);
  //     }
  //   } catch (error) {
  //     console.error("Error blocking user:", error);
  //     message.error(
  //       error.response.data.message ||
  //         "An error occurred while blocking the user."
  //     );
  //   }
  // };

  return (
    <>
      <div className="pricing-preview-subcontainer">
        <h2>Enroll Course</h2>

        <Button className="pricing-plan-btn" onClick={handleEnrollSelected}>
          Enroll Selected
        </Button>
      </div>

      <Row gutter={16} justify="space-between" align="middle">
        <Col span={12}>
          <Form.Item label="Filter By" style={{ marginBottom: 10 }}>
            <Space>
              <Select
                defaultValue="Select Filter"
                style={{ width: 150 }}
                onChange={handleFilterChange}
                value={selectedFilter}
              >
                <Option value="Select Filter" disabled>
                  Select Filter
                </Option>
                <Option value="Name">Name</Option>
                <Option value="Email">Email</Option>
                <Option value="Mobile Number">Mobile Number</Option>
                {/* <Option value="Course">Course</Option> */}
              </Select>

              {getFilterInput()}
            </Space>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Space style={{ float: "right" }}>
            <Button onClick={handleExportCSV}>Export CSV</Button>
            <Button onClick={handleExportPDF}>Export PDF</Button>
          </Space>
        </Col>
      </Row>

      {/* <p style={{ fontFamily: "Rajdhani" }}>
            <ExclamationCircleOutlined
              style={{ fontSize: "20px", color: "red" }}
            />
            &nbsp; Tables can be scrolled horizontally
          </p> */}
      <div style={{ overflowX: "auto" }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            onChange: handlePageChange,
            onShowSizeChange: handlePageSizeChange,
            total: users.totalPage,
            pageSizeOptions: ["25", "50","100","200","250","300","400","500", "5000", "10000"],
            showSizeChanger: true,
          }}
          loading={loading}
        />
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default EnrollCourse;
