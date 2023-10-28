import React, { useState } from "react";
import { Button, Col, Row, Dropdown, Menu } from "antd";
import {
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import template from "../../../assets/img/email_template.jpg";
import "./CurriculumPreview.css";

const CurriculumPreview = () => {
  const [status, setStatus] = useState("published");
  const [isDeleteMenuVisible, setDeleteMenuVisible] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "published" || e.key === "unpublished") {
      setStatus(e.key);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="published">
        <p style={{ fontFamily: "Rajdhani", margin: 0 }}> Published </p>
      </Menu.Item>
      <Menu.Item key="unpublished">
        <p style={{ fontFamily: "Rajdhani", margin: 0 }}> Unpublished</p>
      </Menu.Item>
    </Menu>
  );

  const handleMenuIconClick = (e) => {
    switch (e.key) {
      case "rename":
        break;
      case "publicPreview":
        break;
      case "turnOnComments":
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  const menu1 = (
    <Menu onClick={handleMenuIconClick}>
      <Menu.Item key="rename">Rename Lesson</Menu.Item>
      <Menu.Item key="publicPreview">Set as Public Preview</Menu.Item>
      <Menu.Item key="turnOnComments">Turn On Comments</Menu.Item>
      <Menu.Item key="delete">Delete Lesson</Menu.Item>
    </Menu>
  );

  const handleDeleteMenuClick = () => {
    setDeleteMenuVisible(!isDeleteMenuVisible);
  };

  const menu2 = (
    <Menu>
      <Menu.Item key="delete">
        <span style={{ color: "red", fontFamily: "Rajdhani" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenuVideoClick = (e) => {
    setMenuVisible(false);
    if (e.key === "download") {
    } else if (e.key === "delete") {
    }
  };

  const menu3 = (
    <Menu onClick={handleMenuVideoClick}>
      <Menu.Item key="download">Download</Menu.Item>
      <Menu.Item key="delete">
        <span style={{ color: "red" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleMenuPdfClick = (e) => {
    setShowPdf(false);
    if (e.key === "download") {
    } else if (e.key === "delete") {
    }
  };

  const menu4 = (
    <Menu onClick={handleMenuPdfClick}>
      <Menu.Item key="download">Download</Menu.Item>
      <Menu.Item key="delete">
        <span style={{ color: "red" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleDeleteQuiz = () => {
    setShowQuiz(!showQuiz);
  };

  const menu5 = (
    <Menu onClick={handleDeleteQuiz}>
      <Menu.Item key="delete">
        <span style={{ color: "red", fontFamily: "Rajdhani" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="curriculum-preview-container">
        <div className="c-preview-subcontainer">
          <h2>Curriculum</h2>
          <Button className="c-preview-btn">Preview</Button>
        </div>
        <div>
          <Row gutter={16}>
            <Col lg={16} sm={24} xs={24}>
              <div className="c-preview-subcontainer0">
                <div className="preview-lesson-container">
                  <h2>Lesson 1 Section 1</h2>
                  <div className="publish-container">
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button
                        type="default"
                        style={{
                          borderColor: status === "published" ? "green" : "red",
                          color: status === "published" ? "green" : "red",
                        }}
                      >
                        {status === "published" ? "Published" : "Unpublished"}{" "}
                        <DownOutlined />
                      </Button>
                    </Dropdown>

                    <Dropdown overlay={menu1} trigger={["click"]}>
                      <EllipsisOutlined
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    </Dropdown>
                  </div>
                </div>
                <hr style={{ margin: 0 }} />
                <div className="show-text-super-container">
                  <div className="show-text-container">
                    <h4>TEXT & IMAGES</h4>
                    <div className="show-edit">
                      <Button icon={<EditOutlined />}>Edit</Button>
                      <Dropdown
                        overlay={menu2}
                        visible={isDeleteMenuVisible}
                        onVisibleChange={(visible) =>
                          setDeleteMenuVisible(visible)
                        }
                        trigger={["click"]}
                      >
                        <EllipsisOutlined
                          onClick={handleDeleteMenuClick}
                          style={{ cursor: "pointer", fontSize: "20px" }}
                        />
                      </Dropdown>
                    </div>
                  </div>
                  <p style={{ margin: 0 }}>Add Lesson one</p>
                </div>
                <hr style={{ margin: 0 }} />
                <div>
                  <div className="show-video-container">
                    <h2>Video</h2>
                    <Dropdown
                      overlay={menu3}
                      visible={isMenuVisible}
                      onVisibleChange={(visible) => setMenuVisible(visible)}
                      trigger={["click"]}
                    >
                      <EllipsisOutlined
                        style={{ cursor: "pointer", fontSize: "20px" }}
                      />
                    </Dropdown>
                  </div>
                  <div className="show-video-subcontainer">
                    <iframe
                      width="100%"
                      height="300"
                      src="https://www.youtube.com/embed/LAOzjjy-NNQ"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    ></iframe>
                    <p>
                      Flonnect_2023-06-24_58e34f15-19da-4f6a-9a6f-79c505f94c41.mp4
                    </p>
                  </div>
                </div>
                <hr style={{ margin: 0 }} />
                <div>
                  <div className="show-pdf-container">
                    <h2>PDF Viewer</h2>
                    <Dropdown
                      overlay={menu4}
                      visible={showPdf}
                      onVisibleChange={(visible) => setShowPdf(visible)}
                      trigger={["click"]}
                    >
                      <EllipsisOutlined
                        style={{ cursor: "pointer", fontSize: "20px" }}
                      />
                    </Dropdown>
                  </div>
                  <div className="show-pdf-subcontainer">
                    <img
                      alt="Image"
                      src={template}
                      style={{
                        border: "1px solid #dcdcdc",
                        width: "290px",
                        height: "300px",
                      }}
                    />
                    <p>Receipt.pdf</p>
                  </div>
                </div>
                <hr style={{ margin: 0 }} />
                <div>
                  <div className="show-quiz-container">
                    <h2>Quiz</h2>
                    <div className="show-edit">
                    <Button icon={<EditOutlined />}>Edit</Button>
                    <Dropdown
                      overlay={menu5}
                      visible={showQuiz}
                      onVisibleChange={(visible) => setShowQuiz(visible)}
                      trigger={["click"]}
                    >
                      <EllipsisOutlined
                        style={{ cursor: "pointer", fontSize: "20px" }}
                      />
                    </Dropdown>
                    </div>
                  </div>
                  <div className="show-quiz-subcontainer">
                    <h5>1. How do affiliate marketing programs work?</h5>
                    <p>Correct Answer abc,bcd</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={8} xs={24} sm={24}>
              <div className="c-preview-subcontainer1">
                <div className="outline-container">
                    <h2>Outline</h2>
                    <Button icon={<EditOutlined />}>Edit</Button>
                </div>
                <div className="outline-subcontainer">
                    <h5>Section 1</h5>
                    <p>Lesson 1</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CurriculumPreview;
