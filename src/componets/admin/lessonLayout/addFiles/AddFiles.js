import React, { useState, useEffect } from "react";
import { Space, Button, Upload, Row, Col, Menu, Dropdown, message } from "antd";
import {
  EllipsisOutlined,
  InboxOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./AddFiles.css";
import { useDispatch, useSelector } from "react-redux";
import { getLessonById } from "../../../../actions/lesson/lesson";
import { addPpt } from "../../../../actions/addPPT/addPPT";

const AddFiles = ({ lessonId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lessons = useSelector((state) => state.lesson.lessonById);
  const [lesson, setLesson] = useState("");
  const [showNames, setShowNames] = useState([]);

  const [fileList, setFileList] = useState([]);

  const handleDuplicate = () => {};

  const handleDelete = () => {};

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
      <Menu.Item
        key="1"
        //  onClick={handleRename}
      >
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

  // const checkFileType = (file) => {
  //   const allowedTypes = [
  //     "application/vnd.ms-powerpoint",
  //     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  //     "application/msword",
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //      "application/zip",
  //   ];

  //   const isFileTypeValid = allowedTypes.includes(file.type);

  //   if (!isFileTypeValid) {
  //     message.error("You can only upload PPT, PPTX, DOC,ZIP or DOCX files!");
  //   }

  //   return isFileTypeValid;
  // };

  const checkFileType = (file) => {
    const allowedExtensions = [".ppt", ".pptx", ".doc", ".docx", ".zip"];

    const fileName = file.name.toLowerCase();
    const isValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isValidExtension) {
      message.error("You can only upload PPT, PPTX, DOC, ZIP, or DOCX files!");
    }

    return isValidExtension;
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
    const fileNames = fileList.map((file) => file.name);
    setShowNames(fileNames);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("lessonId", lessonId);

      if (fileList.length === 0) {
        message.error("Please select file.");
        return;
      }

      for (const file of fileList) {
        formData.append("lessonResource", file.originFileObj);
      }

      const res = await dispatch(addPpt(formData));

      if (res.success) {
        message.success(res.message);
        setFileList([]);
      } else {
        message.error("Failed to upload files. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      console.log(error.response.data.message);
      message.error("An error occurred while uploading the files.");
    }
  };

  return (
    <>
      <div className="add-files-breadcrumb">
        <div className="add-files-breadcrumb-subcontainer">
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
      <div className="add-files-container">
        <h2>Add Files(ppt,docx,doc & pptx)</h2>
        <p> Upload files into your lesson.</p>

        <Row gutter={16}>
          <Col lg={14} sm={24} xs={24}>
            <div className="add-files">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>{lesson}</h2>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button icon={<EllipsisOutlined />} />
                </Dropdown>
              </div>
              <div className="add-files-subcontainer">
                <>
                  <Upload
                    customRequest={customRequest}
                    beforeUpload={checkFileType}
                    fileList={fileList}
                    onChange={handleFileListChange}
                    multiple
                  >
                    <div style={{ textAlign: "center" }}>
                      <InboxOutlined
                        style={{ color: "#ddb42c", fontSize: "32px" }}
                      />
                      <p>Select files to upload</p>
                    </div>
                  </Upload>
                  {fileList.length > 0 && (
                    <Button
                      className="upload-files-btn"
                      onClick={handleUpload}
                      style={{ marginTop: "20px" }}
                    >
                      Upload
                    </Button>
                  )}
                </>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24} sm={24}>
            <div className="files-setting">
              <h2>File Settings</h2>
              <div className="scrollable-container">
                {showNames.length > 0 && (
                  <div>
                    <h2>File Name</h2>
                    {showNames.map((name, index) => (
                      <p key={index}>{name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddFiles;
