import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../actions/course/course";
import "./Dashboard.css";

const cardStyle = {
  marginBottom: "10px",
  fontFamily: "Rajdhani",
  fontSize: "16px",
};
const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState([]);
  const course = useSelector((state) => state.course.course);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  useEffect(() => {
    if (course.data) {
      setCardData(course.data);
    }
  }, [course.data]);
  return (
    <div>
      <div className="dashboard-breadcrumb">
        <div className="dashboard-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Dashboard
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/admin/dashboard">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <Row gutter={16} justify="start">
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              title="Total Affiliate"
              bordered={false}
              style={{ background: "#fff2cd", ...cardStyle }}
            >
              4
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              title="Today's Affiliate"
              bordered={false}
              style={{ background: "#feede7", ...cardStyle }}
            >
              5
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              title="Total Users"
              bordered={false}
              style={{ background: "#f9d9f9", ...cardStyle }}
            >
              9
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              title="Today's Users"
              bordered={false}
              style={{ background: "#dbf9f0", ...cardStyle }}
            >
              2
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              title="Total Leads"
              bordered={false}
              style={{ background: "#f9d9f9", ...cardStyle }}
            >
              4
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              title="Today's Leads"
              bordered={false}
              style={{ background: "#fff2cd", ...cardStyle }}
            >
              8
            </Card>
          </Col>
        </Row>
        <div style={{ margin: "20px" }}>
          <Row gutter={16} justify="start">
            {cardData?.map((card, index) => (
              <Col
                key={index}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
              >
                <Card
                  bordered={false}
                  cover={<img alt="card" src={`${card?.courseImagePath}`} />}
                  style={{ ...cardStyle }}
                >
                  <Meta description={card.subTitle} title={card.title} />
                  <hr className="custom-hrs" />
                  <p style={{ fontFamily: "Rajdhani" }}>Enroll Students: 30</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
