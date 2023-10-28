import React, { useState } from "react";
import { Button, Row, Col, Upload, message, Modal, Image } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  EyeOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import previewImg from "../../../assets/img/no-image.png";
import "./Setup.css";
import { Link } from "react-router-dom";

const Setup = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const beforeUpload = (file) => {
    setSelectedImage(URL.createObjectURL(file));
    return false;
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
      setModalVisible(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  return (
    <div className="setup">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Course setup</h2>

        <Button className="setup-btn">Publish your course</Button>
      </div>
      <div className="setup-subcontainer">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <h3>Create your curriculum</h3>
            <div className="col-content1">
              <div style={{ display: "flex" }}>
                <Col xs={12} sm={8} md={6} lg={10}>
                  <p>Curriculum Preview</p>
                </Col>
                <Col>
                  {isMobile ? (
                    <EyeOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    <Button style={{ fontFamily: "Rajdhani" }}>
                      <EyeOutlined style={{ fontSize: "20px" }} /> Preview
                      Curriculum
                    </Button>
                  )}
                </Col>
                <Col>
                  {isMobile ? (
                    <Button style={{fontFamily:'Rajdhani'}}>
                      <EditOutlined style={{ fontSize: "20px" }} />Edit
                    </Button>
                  ) : (
                    <Button style={{ fontFamily: "Rajdhani" }}>
                      <EditOutlined style={{ fontSize: "20px" }} /> Edit
                      Curriculum
                    </Button>
                  )}
                </Col>
              </div>
              <div className="col-subcontent1">
                <h5>Section2</h5>
                <div className="setup-divider"></div>
                <Link to={"setup/courses/curriculum/lesson"}>
                <p>Lesson1</p>
                </Link>
                <div className="setup-divider"></div>
                <h5>Section1</h5>
                <div className="setup-divider"></div>
                <p>Lesson1</p>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <h3>Customize your course</h3>
            <div className="col-content2">
              <div className="col-subcontent2">
                <h5>Course Title</h5>
                <Button style={{ fontFamily: "Rajdhani" }}>
                  <EditOutlined style={{ fontSize: "20px" }} /> Edit Title
                </Button>
              </div>

              <p>React Builder</p>
            </div>
            <div className="col-content3">
              <div className="thumbnail">
                <h5>Thumbnail</h5>
                <Button
                  style={{ fontFamily: "Rajdhani" }}
                  onClick={() => setModalVisible(true)}
                >
                  <PlusCircleOutlined style={{ fontSize: "20px" }} />
                  Add an image
                </Button>
              </div>
              {selectedImage ?  (
                <div className="selected-image">
                  <Image
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      marginTop: "15px",
                    }}
                    src={selectedImage}
                  />
                </div>
              ):
              (
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    marginTop: "15px",
                  }}
                  src={previewImg}
                 
                />
              ) }
              <Modal
                title="Upload Image"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                  <Button key="reset" onClick={() => setSelectedImage(null)}>
                    Reset
                  </Button>,
                  <Button
                    key="upload"
                    type="primary"
                    onClick={() => setModalVisible(false)}
                  >
                    Upload
                  </Button>,
                ]}
              >
                <Upload
                  customRequest={() => {}}
                  beforeUpload={beforeUpload}
                  onChange={handleUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "80vh",
                      objectFit: "contain",
                      marginTop: "15px",
                    }}
                  />
                )}
              </Modal>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Setup;
