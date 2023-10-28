import React from "react";
import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import card1 from "../../../assets/course/image1.png";
import "./MyCourse.css"

const { Meta } = Card;

const MyCourse = () => {
  return (
    <>
    
    <div className="my-course-container">
    <Link to="enrolled/:id" style={{textDecoration:'none'}}> 
      <Card
        hoverable
        style={{
          width: 300,
        }}
        cover={<img alt="card" src={card1} />}
        className="card-hover custom-card1 "
      >
        <Meta
          title="AFFILIATE INDIANS BUSINESS BUILDER"
          description="Everything you need to know to start affiliate marketing business in India"
        />
        <hr className="custom-hr" /> 
        <div className="info-container">
          <Avatar icon={<UserOutlined />} />
          <span className="info-text">Prakhar Kulshrestha</span>
          <span className="price-text1">₹99.99</span>
        </div>
      </Card>
      </Link>
      </div>

    </>
  );
};

export default MyCourse;
