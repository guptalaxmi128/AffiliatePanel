import React, { useEffect, useState } from "react";
import { Card, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../componets/user/course/allCourse/AllCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { getPublicCourse } from "../../actions/publicCourse/publicCourse";

const { Meta } = Card;
// const localHost = "http://localhost:5000";
const localHost = "https://affiliate-indian.onrender.com";
// const localHost ="http://3.224.85.30";

const HomePage = () => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState([]);
  const course = useSelector((state) => state.publicCourse.course);

  useEffect(() => {
    dispatch(getPublicCourse());
  }, [dispatch]);

  useEffect(() => {
    if (course.data) {
      setCardData(course.data);
    }
  }, [course.data]);

  return (
    <div className="all-course-container">
      {cardData?.map((card, index) => (

        <>
        <Row gutter={16} justify="start">
          <Link
            //     key={index}
            style={{ textDecoration: "none", flex: "1 1 24%" }}
          >
          <Col
                key={index}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
              >
            <Card
              key={index}
              hoverable
              className="custom-cards card-hovers"
              cover={
                <img
                  alt="card"
                  src={`${card?.courseImagePath}`}
                  style={{ height: "200px" }}
                />
              }
            >
              <Meta title={card.title} description={card.subTitle} />
              <hr className="custom-hrs" />
              <div className="info-containers">
                <Avatar
                  icon={<UserOutlined />}
                  src={`${card?.authorImagePath}`}
                />
                <span className="info-texts">{card.authorName}</span>
                <span className="price-texts">
                  {" "}
                  {card.isPaid
                    ? card.price !== null
                      ? `₹${card.price}`
                      : ""
                    : "FREE"}
                </span>
              </div>
            </Card>
            </Col>
          </Link>
          </Row>
        </>
      ))}
    </div>
  );
};

export default HomePage;
