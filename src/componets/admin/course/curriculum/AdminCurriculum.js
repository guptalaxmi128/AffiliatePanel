import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import "./Curriculum.css";

const AdminCurriculum = () => {
  const cardData = [
    {
      title: "Card 1",
      image: "url_to_image_1",
      text1: "Build from scratch",
      text2: "Manually enter your course outline",
      link: "/admin/card1",
    },
    {
      title: "Card 2",
      image: "url_to_image_2",
      text1: "Generate with UI",
      text2: "Creating your outline by providing simple description",
      link: "/card2",
    },
    {
      title: "Card 3",
      image: "url_to_image_3",
      text1: "Copy from",
      text2: "Copy sections and lessons from an existing course",
      link: "/card3",
    },
  ];

  return (
    <>
      <div className="curriculum-container">
        <h2>Curriculum</h2>
        <div className="curriculum-subcontainer">
          <h3>Build your course outline</h3>
          <p>Choose the option that best suits your needs</p>
          <Row gutter={16}>
            {cardData.map((card, index) => (
            
              <Col xs={24} sm={12} md={8} lg={8} key={index} style={{marginBottom:'20px'}}>
              <Link to={card.link} style={{textDecoration:'none'}}> 
                <Card
                  cover={<img alt={card.title} src={card.image} />}
                  className="curriculum-card curriculum-hover "
                >
                  <h4>{card.text1}</h4>
                  <p>{card.text2}</p>
                </Card>
                </Link>
              </Col>
            
            ))}
          </Row>
          <div className="curriculum-subcontainer1">
          <h3>Buld Upload</h3>
          <p>Upload multiple files to generate your outline</p>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCurriculum;
