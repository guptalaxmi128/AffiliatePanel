import React, { useEffect, useState } from "react";
import { Card, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourse } from "../../../actions/userCourse/userCourse";
import "./MyCourse.css";

const { Meta } = Card;

const MyCourse = () => {
  const [course, setCourse] = useState([]);
  const dispatch = useDispatch();
  const userCourse = useSelector((state) => state.userCourse.usercourses);

  useEffect(() => {
    dispatch(getUserCourse());
  }, [dispatch]);

  useEffect(() => {
    if (userCourse.data) {
      setCourse(userCourse.data);
    }
  }, [userCourse.data]);
  // console.log(course);
  return (
    <>
      <div className="my-course-container">
        <Row gutter={16} 
        justify="start"
        >
          {course.map((course, index) => (
            // <Link to={`/enrolled/${course.id}`} key={course.id} style={{ textDecoration: 'none' }}>
            <Link
              to={`/lecture/${course.id}`}
              key={course.id}
              style={{ textDecoration: "none" }}
            >
              <Col
                key={index}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
              >
                <Card
                  hoverable
                  // style={{
                  //   width: 300,
                  // }}
                  cover={
                    <img
                      alt="card"
                      src={`${course?.courseImagePath}`}
                      style={{ height: "200px" }}
                    />
                  }
                  className="card-hover custom-card1 "
                >
                  <Meta title={course.title} description={course.subTitle} />
                  <hr className="custom-hr" />
                  <div className="info-container">
                    <Avatar
                      icon={<UserOutlined />}
                      src={`${course?.authorImagePath}`}
                    />
                    <span className="info-text">{course.authorName}</span>
                  </div>
                </Card>
              </Col>
            </Link>
          ))}
        </Row>
      </div>
    </>
  );
};

export default MyCourse;
