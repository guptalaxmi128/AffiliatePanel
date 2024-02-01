import React, { useEffect } from "react";
import { Card, Avatar,Row,Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./AllCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseUser } from "../../../../actions/allCourseUser/allCourseUser";

const { Meta } = Card;


const AllCourse = () => {
  const dispatch = useDispatch();
  const allCourse = useSelector((state) => state.allCourseUser.courses);
  const cardData = allCourse?.data;

  useEffect(() => {
    dispatch(getAllCourseUser());
  }, [dispatch]);

  // const shareUrl= window.location.href;

  // const extractCouponCode = (card) => {
  //   const defaultCourse = card.course_coupons.find(
  //     (course) => course.type === "DEFAULT"
  //   );
  //   return defaultCourse ? defaultCourse.coupon.couponCode : null;
  // };

  // console.log(cardData);
  return (
    <div className="all-course-container">
      {cardData?.map((card, index) => (
        <>
          <Row gutter={16} justify="start">
            <Link
              to={{ pathname: `/user/enrolled/${card.id}` }}
              key={index}
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

      {/* <FacebookShareButton url={shareUrl} quote="Affiliate Marketing">
        Share on Facebook
      </FacebookShareButton> */}
    </div>
  );
};

export default AllCourse;
