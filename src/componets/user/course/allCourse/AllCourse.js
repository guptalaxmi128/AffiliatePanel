import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import image1 from "../../../../assets/course/image1.png";
import image2 from "../../../../assets/course/image2.png";
import image3 from "../../../../assets/course/image3.png";
import image4 from "../../../../assets/course/image4.png";
import "./AllCourse.css";

const { Meta } = Card;

const cardData = [
  {
    title: "AFFILIATE INDIANS BUSINESS BUILDER ",
    cardText:
      "Everything you need to know to start affiliate marketing business in India",
    image: image1,
    instructor: "Prakhar Kulshrestha",
    price: "₹149.99",
    linkTo: "/basic",
  },
  {
    title: "AFFILIATE INDIANS MODAL",
    cardText: "BEGINNER MEMBERSHIP",
    image: image2,
    instructor: "Prakhar Kulshrestha",
    price: "₹99.99",
    linkTo: "/beginner",
  },
  {
    title: "AFFILIATE INDIANS BLUEPRINT",
    cardText: "PRO MEMBERSHIP → 17 BONUSES INSIDE",
    image: image3,
    instructor: "Prakhar Kulshrestha",
    price: "₹149.99",
    linkTo: "/pro",
  },
  {
    title: "AFFILIATE INDIANS COUNCIL",
    cardText:
      " EXPERT MEMBERSHIP: Get involved in Hot-seat sessions with CEO & Founder to launch your online business → 17 BONUSES INSIDE.",
    image: image4,
    instructor: "Prakhar Kulshrestha",
    price: "₹149.99",
    linkTo: "/expert",
  },
];

const AllCourse = () => {
  return (
    <div className="all-course-container">
      {cardData.map((card, index) => (
        <Card
          key={index}
          hoverable
          className="custom-cards card-hovers"
          cover={<img alt="card" src={card.image} />}
        >
          <Meta title={card.title} description={card.cardText} />
          <hr className="custom-hrs" />
          <div className="info-containers">
            <Avatar icon={<UserOutlined />} />
            <span className="info-texts">{card.instructor}</span>
            <span className="price-texts">{card.price}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AllCourse;
