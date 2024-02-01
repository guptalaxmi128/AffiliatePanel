import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown, Menu, Button, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./AllCourse.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourse,
  publishCourse,
  unPublishCourse,
  deleteCourse,
  disAllowAffiliate,
  allowAffiliateCourse,
} from "../../../actions/course/course";

const tableContentStyle = {
  fontFamily: "Rajdhani",
  textAlign: "center",
};

// const localHost = "http://localhost:5000";
const localHost = "https://affiliate-indian.onrender.com";
// const localHost="http://3.224.85.30";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;
};

const AllCourse = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const data = course?.data;
  // console.log(course);
  console.log(data);

  const ActionMenu = ({ record }) => {
    // const handlePublish = () => {};
    const { id: courseId, allowAffiliate } = record || {};
    console.log(courseId);
    console.log(allowAffiliate);
    const handleDelete = async () => {
      try {
        const res = await dispatch(deleteCourse(courseId));
        if (res.success) {
          message.success(res.message);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        message.error("An error occurred while deleting the course");
      }
    };

    const handleDuplicate = () => {};

    const handlePreview = () => {};

    const handleAllowAffiliate = async () => {
      try {
        const res = await dispatch(allowAffiliateCourse(courseId));
        if (res.success) {
          message.success(res.message);
        }
      } catch (error) {
        console.error("Error allowing affiliate:", error);
        message.error(error.response.data.message);
      }
    };

    const handleDisallowAffiliate = async () => {
      try {
        const res = await dispatch(disAllowAffiliate(courseId));
        if (res.success) {
          message.success(res.message);
        }
      } catch (error) {
        console.error("Error disallowing affiliate:", error);
        message.error(error.response.data.message);
      }
    };

    return (
      <Menu>
        {/* <Menu.Item key="publish" onClick={handlePublish}>
          Publish Course
        </Menu.Item> */}
        {allowAffiliate === null || allowAffiliate === false ? (
          <Menu.Item key="allowAffiliate" onClick={handleAllowAffiliate}>
            Allow Affiliate
          </Menu.Item>
        ) : (
          <Menu.Item key="disallowAffiliate" onClick={handleDisallowAffiliate}>
            Disallow Affiliate
          </Menu.Item>
        )}
        <Link to={`/admin/author-details/${courseId}`}>
          <Menu.Item>Add Author Details</Menu.Item>
        </Link>
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

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail, record) => (
        <img
          // src={`${localHost}/courseFile/${record?.courseImageFileName}`}
          src={`${record?.courseImagePath}`}
          alt="course-image"
          style={{ width: 50, height: 50 }}
        />
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Course Name",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={`/admin/course/setup/${record.id}`}
          style={{ color: "#000", textDecoration: "none" }}
        >
          {text}
        </Link>
      ),
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
      render: (text, record) => {
        return record.isPaid ? (text !== null ? `₹${text}` : "") : "FREE";
      },
    },
    {
      title: "Author",
      dataIndex: "authorName",
      key: "authorName",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "creationDate",
      render: (text) => <span>{formatDate(text)}</span>,
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
      render: (status, record) => (
        <span>
          {record.isPublic ? (
            <Button
              className="published-button"
              onClick={() => handleUnpublishedClick(record.id)}
            >
              Published
            </Button>
          ) : (
            <Button
              className="unpublished-button"
              onClick={() => handlePublishedClick(record.id)}
            >
              Publish Now
            </Button>
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
      render: (record) => (
        <Dropdown overlay={<ActionMenu record={record} />}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const handlePublishedClick = (courseId) => {
    console.log(`Course ${courseId} is clicked as Published`);
    dispatch(publishCourse(courseId)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleUnpublishedClick = (courseId) => {
    console.log(`Course ${courseId} is clicked as Unpublished`);
    dispatch(unPublishCourse(courseId)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <>
      <div className="all-course">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Courses</h2>
          <Link to={"/admin/courses/new"} style={{ textDecoration: "none" }}>
            <Button className="new-course-btn">New Course</Button>
          </Link>
        </div>
        <div className="all-course-text">
          Create and manage courses in your school.
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={data} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default AllCourse;
