import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./AllCourse.css"
  

const tableContentStyle = {
    fontFamily: 'Rajdhani',
    textAlign:'center'
  };

const data = [
  {
    key: "1",
    thumbnail: "Thumbnail 1",
    courseName: "Course 1",
    price: "₹19.99",
    author: "Author 1",
    creationDate: "2023-01-15",
    enrollments: 100,
    status: "published",
  },
  {
    key: "2",
    thumbnail: "Thumbnail 2",
    courseName: "Course 2",
    price: "₹29.99",
    author: "Author 2",
    creationDate: "2023-02-20",
    enrollments: 75,
    status: "unpublished",
  },
];

const StatusBadge = ({ status }) => {
  const badgeStyle = {
    color: status === "published" ? "valcano" : "gray",
    borderColor: status === "published" ? "valcano" : "gray",
    border: "1px solid",
    padding: "4px",
    borderRadius: "4px",
    display: "inline-block",
  };

  return <span style={badgeStyle}>{status}</span>;
};

const ActionMenu = () => {
  const handlePublish = () => {};

  const handleDelete = () => {};

  const handleDuplicate = () => {};

  const handlePreview = () => {};

  return (
    <Menu>
      <Menu.Item key="publish" onClick={handlePublish}>
        Publish Course
      </Menu.Item>
      <Menu.Item key="delete" onClick={handleDelete}>
        Delete Course
      </Menu.Item>
      <Menu.Item key="duplicate" onClick={handleDuplicate}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="preview" onClick={handlePreview}>
        Preview Course as Student
      </Menu.Item>
    </Menu>
  );
};

const columns = [
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
    render: (courseName) => <a href="/admin/setup" style={{color:'#000'}}>{courseName}</a>,
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Creation Date",
    dataIndex: "creationDate",
    key: "creationDate",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
  },
  {
    title: "Enrollments",
    dataIndex: "enrollments",
    key: "enrollments",
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
    render: (status) => <StatusBadge status={status} />,
  },
  {
    title: "Actions",
    key: "actions",
    onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    render: () => (
      <Dropdown overlay={<ActionMenu />}>
        <Button>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    ),
  },
];

const AllCourse = () => {
  return (
    <>
      <div className="all-course">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Courses</h2>
          <Link to={"/admin/courses/new"} style={{textDecoration:'none'}}>
          <Button className="new-course-btn">New Course</Button>
          </Link>
        </div>
        <div className="all-course-text">
        Create and manage courses in your school.
        </div>
        <div style={{ overflowX: 'auto' }}>
          <Table dataSource={data} columns={columns}  />
        </div>
      </div>
    </>
  );
};

export default AllCourse;
