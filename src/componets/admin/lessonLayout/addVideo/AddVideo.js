import React, { useState } from "react";
import { Space, Button, Upload, Row, Col, Image, Menu, Dropdown } from "antd";
import {
  EllipsisOutlined,
  InboxOutlined,
  LeftOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./AddVideo.css";
import { Link } from "react-router-dom";

const AddVideo = () => {
  const [imageURL, setImageURL] = useState(null);
  const [lesson, setLesson] = useState("");
  const [fileList, setFileList] = useState([]);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
  );

  const onFileChange = (info) => {
    setFileList(info.fileList);
    if (info.file.status === "done") {
      if (info.file.response && info.file.response.url) {
        // setVideoUrl(info.file.response.url);
      } else {
        console.error("No URL found in the response.");
      }
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      console.log("You can only upload image files!");
    }
    return isImage;
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
      onSuccess("ok");
    }, 0);
  };

  const handleRename = () => {
    const newName = prompt("Enter a new name for the section:", lesson);
    if (newName) {
      setLesson(newName);
    }
  };

  const handleDuplicate = () => {};

  const handleDelete = () => {};

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleRename}>
        <p style={{ fontFamily: "Rajdhani", margin: 0 }}> Rename Lesson</p>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleDuplicate}>
        <p style={{ fontFamily: "Rajdhani", margin: 0 }}> Duplicate Lesson</p>
      </Menu.Item>
      <Menu.Item key="3" onClick={handleDelete}>
        <p style={{ color: "red", fontFamily: "Rajdhani", margin: 0 }}>
          Delete Lesson
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="add-video-breadcrumb">
        <div className="add-video-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            <Link to={"/admin/card1"}>
              <LeftOutlined style={{fontSize:'14px'}} /> &nbsp; Back to lesson layout
            </Link>
          </p>

          <Space>
            <Button style={{ fontFamily: "Rajdhani" }}> Preview</Button>
            <Button style={{ fontFamily: "Rajdhani" }}>Publish</Button>
          </Space>
        </div>
      </div>
      <div className="add-video-container">
        <h2>Video Uploader</h2>
        <p> Use the video uploader to upload videos into your lesson.</p>

        <Row gutter={16}>
          <Col lg={14} sm={24} xs={24}>
            <div className="add-video">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Lesson 1</h2>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button icon={<EllipsisOutlined />} />
                </Dropdown>
              </div>
              <div className="add-video-subcontainer">
                {!videoUrl ? (
                  <Upload
                    fileList={fileList}
                    onChange={onFileChange}
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess("ok");
                      }, 0);
                    }}
                    accept=".mp4"
                  >
                    <div style={{ textAlign: "center" }}>
                      <InboxOutlined
                        style={{ color: "#ddb42c", fontSize: "32px" }}
                      />
                      <p>Select files to upload</p>
                    </div>
                  </Upload>
                ) : (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <iframe
                        width="400"
                        height="240"
                        src={videoUrl}
                        title="Video"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                      {/* <p style={{ fontFamily: "Rajdhani" }}>
                    {fileList.length > 0 ? fileList[0].name : ""}
                  </p> */}
                      <p style={{ fontFamily: "Rajdhani", fontSize: "16px" }}>
                        Flonnect_2023-06-24_58e34f15-19da-4f6a-9a6f-79c505f94c41.mp4
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24} sm={24}>
            <div className="video-setting">
              <h2>Video Settings</h2>
              <div className="scrollable-container">
                <h2>File Name</h2>
                <p>
                  Flonnect_2023-06-24_58e34f15-19da-4f6a-9a6f-79c505f94c41.mp4
                </p>
                <h2>Thumbnail</h2>
                <Upload
                  beforeUpload={beforeUpload}
                  customRequest={customRequest}
                  showUploadList={false}
                  accept="image/*"
                >
                  {imageURL ? (
                    <div style={{ width: "90%", height: "100%" }}>
                      <Image
                        src={imageURL}
                        alt="Uploaded Thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Button className="replace-thumbnail">
                        Replace Thumbnail
                      </Button>
                    </div>
                  ) : (
                    <div className="upload-thumbnail">
                      <PlusCircleOutlined /> &nbsp; Upload Thumbnail
                    </div>
                  )}
                </Upload>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddVideo;
