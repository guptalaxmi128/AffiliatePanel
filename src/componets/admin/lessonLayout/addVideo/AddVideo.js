import React, { useState, useEffect } from "react";
import {
  Space,
  Button,
  Upload,
  Row,
  Col,
  Image,
  Menu,
  Dropdown,
  message,
  Progress,
  Tabs,
  Form,
  Input,
} from "antd";
import {
  EllipsisOutlined,
  InboxOutlined,
  LeftOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./AddVideo.css";
import { useNavigate } from "react-router-dom";
import {
  addEmbedVideo,
  addVideo,
  addVideoThumbnail,
} from "../../../../actions/addVideo/addVideo";
import { useDispatch, useSelector } from "react-redux";
import { getLessonById } from "../../../../actions/lesson/lesson";

const { TabPane } = Tabs;

const AddVideo = ({ lessonId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lessons = useSelector((state) => state.lesson.lessonById);
  const [imageURL, setImageURL] = useState(null);
  const [lesson, setLesson] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [showName, setShowName] = useState("");
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState("addVideo");
  const [embedVideoUrl, setEmbedVideoUrl] = useState("");
  const [embedVideoName, setEmbedVideoName] = useState("");

  const [form] = Form.useForm();

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleRename = () => {
    const newName = prompt("Enter a new name for the section:", lesson);
    if (newName) {
      setLesson(newName);
    }
  };

  const beforeUploadImage = (file) => {
    setImageURL(URL.createObjectURL(file));
    setImage(file);
    return false;
  };

  const handleDuplicate = () => {};

  const handleDelete = () => {};

  const beforeUpload = (file) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("You can only upload video files!");
    } else {
      setVideoUrl(URL.createObjectURL(file));
      setVideoName(file);
      setShowName(file.name);
      setIsVideoSelected(true);
    }
    return isVideo;
  };

  const handleVideoUpload = async () => {
    if (!isVideoSelected) {
      message.error("No video selected.");
      return;
    }

    const intervalId = setInterval(async () => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 5; // Increase progress by 5%
        if (newProgress >= 100) {
          clearInterval(intervalId);
          return 100; // Ensure progress doesn't exceed 100%
        }
        return newProgress;
      });
    }, 500); // Simulate progress update every 500 milliseconds

    // Simulate stopping the upload after some time (e.g., 10 seconds)
    await new Promise((resolve) => setTimeout(resolve, 10000));
    clearInterval(intervalId);

    const formData = new FormData();
    formData.append("lessonId", lessonId);
    formData.append("lessonVideo", videoName);

    try {
      const res = await dispatch(addVideo(formData));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Video upload error:", error);
      message.error("Video upload failed.");
    }
  };

  useEffect(() => {
    dispatch(getLessonById(lessonId));
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (lessons) {
      setLesson(lessons?.data?.lessonName);
    }
  }, [lessons]);

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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpload = () => {
    if (imageURL) {
      const formData = new FormData();
      formData.append("id", lessonId);
      formData.append("thumbnail", image);
      dispatch(addVideoThumbnail(formData));

      message.success("Image uploaded successfully.");
    } else {
      message.error("No image selected. Please select an image.");
    }
  };

  const handleEmbedVideoSubmit = async () => {
    try {
      if (!embedVideoUrl) {
        throw new Error("Please enter a embed code");
      }
      if (!embedVideoName) {
        throw new Error("Please enter a valid video Name");
      }

      const data = {
        lessonId: lessonId,
        videoName: embedVideoName,
        embeddedCode: embedVideoUrl,
      };
      console.log(data);
      const res = await dispatch(addEmbedVideo(data));
      console.log(res);
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setEmbedVideoUrl("");
        setEmbedVideoName("");
      }
    } catch (error) {
      // Handle errors here
      console.error("Embed Video Submission Error:", error);
      message.error("An error occurred while submitting the embed video.");
    }
  };

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
            onClick={handleGoBack}
          >
            <LeftOutlined style={{ fontSize: "14px" }} /> &nbsp; Back to lesson
            layout
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
        <div className="add-select-subcontainer">
          <Space>
            <Tabs activeKey={selectedTab} onChange={handleTabChange}>
              <TabPane tab="Add Video" key="addVideo"></TabPane>
              <TabPane tab="Embed Video" key="embedVideo"></TabPane>
            </Tabs>
          </Space>

          {selectedTab === "addVideo" && (
            <Row gutter={16}>
              <Col lg={14} sm={24} xs={24}>
                <div className="add-video">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2>{lesson}</h2>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button icon={<EllipsisOutlined />} />
                    </Dropdown>
                  </div>
                  <div className="add-video-subcontainer">
                    <div>
                      {!videoUrl ? (
                        <>
                          <Upload beforeUpload={beforeUpload} accept="">
                            <div style={{ textAlign: "center" }}>
                              <InboxOutlined
                                style={{ color: "#ddb42c", fontSize: "32px" }}
                              />
                              <p>Select files to upload</p>
                            </div>
                          </Upload>
                        </>
                      ) : (
                        <div>
                          <div style={{ textAlign: "center" }}>
                            <iframe
                              width="400"
                              height="240"
                              src={videoUrl}
                              title="Video"
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                            <p
                              style={{
                                fontFamily: "Rajdhani",
                                fontSize: "16px",
                              }}
                            >
                              {showName}
                              <Progress
                                percent={uploadProgress}
                                status="active"
                              />
                            </p>
                          </div>
                        </div>
                      )}

                      {isVideoSelected ? (
                        <div>
                          <Button
                            className="add-video-btn"
                            onClick={handleVideoUpload}
                            style={{ fontFamily: "Rajdhani" }}
                          >
                            Upload Video
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={10} xs={24} sm={24}>
                <div className="video-setting">
                  <h2>Video Settings</h2>
                  <div className="scrollable-container">
                    {showName && (
                      <>
                        {" "}
                        <h2>File Name</h2>
                        <p>{showName}</p>
                      </>
                    )}

                    <h2>Thumbnail</h2>
                    <Upload
                      beforeUpload={beforeUploadImage}
                      // customRequest={customRequest}
                      showUploadList={false}
                      accept="image/*"
                    >
                      {imageURL ? (
                        <div style={{ width: "90%", height: "100%" }}>
                          <Image
                            src={imageURL}
                            alt="Uploaded Thumbnail"
                            style={{
                              width: "50%",
                              height: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <Space>
                            <Button className="replace-thumbnail">
                              Replace Thumbnail
                            </Button>
                          </Space>
                        </div>
                      ) : (
                        <div className="upload-thumbnail">
                          <PlusCircleOutlined /> &nbsp; Upload Thumbnail
                        </div>
                      )}
                    </Upload>
                    <Button
                      key="upload"
                      // className="course-image-btn"
                      style={{ margin: "10px" }}
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          {selectedTab === "embedVideo" && (
          
              <Form
                form={form}
            name="myForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={handleEmbedVideoSubmit}
              >
                <Row gutter={16}>
                <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Video Name"
                  name="videoName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the video name",
                    },
                  ]}
                >
                  <Input
                    value={embedVideoName}
                    onChange={(e) => setEmbedVideoName(e.target.value)}
                  />
                </Form.Item>
                </Col>
                <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Embed Code"
                  name="embedCode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the embed code",
                    },
                  ]}
                >
                  <Input
                    value={embedVideoUrl}
                    onChange={(e) => setEmbedVideoUrl(e.target.value)}
                  />
                </Form.Item>
                </Col>
                </Row>
                <Form.Item>
                  <Button
                    className="add-video-btn"
                    htmlType="submit"
                    style={{ fontFamily: "Rajdhani" }}
                  >
                    Embed Video
                  </Button>
                </Form.Item>
              </Form>
          
          )}
        </div>
      </div>
    </>
  );
};

export default AddVideo;
