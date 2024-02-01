import React, { useState, useEffect } from "react";
import { Space, Button, Row, Col, message, Upload, Dropdown, Menu } from "antd";
import {
  InboxOutlined,
  LeftOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../addFiles/AddFiles.css";
import { useDispatch, useSelector } from "react-redux";
import { addPdf } from "../../../../actions/addPdf/addPdf";
import { getLessonById } from "../../../../actions/lesson/lesson";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AddFiles = ({ lessonId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lesson.lessonById);
  const [lesson, setLesson] = useState("");
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  // console.log("Files",lessonId);
  const [fileList, setFileList] = useState([]);

  // const [fileUrl, setFileUrl] = useState(null);

  // console.log(fileUrl);

  const handleFileListChange = (newFileList) => {
    setFileList(newFileList);
    const names = newFileList.map((file) => file.name);
    setSelectedFileNames(names);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("lessonId", lessonId);
      if (fileList.length === 0) {
        message.error("Please select a PDF file.");
        return;
      }
      for (const file of fileList) {
        if (file.type === "application/pdf") {
          formData.append("lessonPDF", file.originFileObj);
        }
      }
      const res = await dispatch(addPdf(formData));
      if (res.success) {
        message.success(res.message);
        setFileList([]);
      } else {
        message.error("Failed to upload PDF. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      message.error("An error occurred while uploading the PDF.");
    }
  };

  const handleRename = () => {
    const newName = prompt("Enter a new name for the section:");
    if (newName) {
      // Handle renaming here
    }
  };

  const handleDuplicate = () => {
    // Handle duplication here
  };

  const handleDelete = () => {
    // Handle deletion here
  };

  const fileStatus = (file) => {
    if (file.status === "done") {
      return `${(file.size / 1024).toFixed(2)} KB`;
    } else if (file.status === "error") {
      return "Upload Failed";
    }
    return "Uploading...";
  };

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

  useEffect(() => {
    dispatch(getLessonById(lessonId));
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (lessons.data) {
      setLesson(lessons.data.lessonName);
    }
  }, [lessons.data]);

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
        <h2>PDF Viewer</h2>
        <p>Upload PDF documents that can be viewed in your lesson.</p>

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
                <div>
                  <Upload
                    multiple
                    customRequest={() => {}}
                    fileList={fileList}
                    onChange={({ fileList }) => handleFileListChange(fileList)}
                    beforeUpload={(file) => {
                      if (file.type === "application/pdf") {
                        return true;
                      }
                      message.error("Only PDF files are allowed!");
                      return false;
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <InboxOutlined
                        style={{ color: "#ddb42c", fontSize: "32px" }}
                      />
                      <p>Select One or More PDF files to upload</p>
                    </div>
                  </Upload>
                  <div style={{ width: "100%" }}>
                    {fileList.map((file) => (
                      <p key={file.uid}>
                        {file.name} - {fileStatus(file)}
                      </p>
                    ))}
                  </div>

                  {fileList.length > 0 && (
                    <Button
                      className="upload-files-btn"
                      onClick={handleFileUpload}
                    >
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24} sm={24}>
            <div className="files-setting">
              <h2>PDF Viewer Settings</h2>
              {selectedFileNames.length > 0 && (
                <div className="pdf-view-container">
                  <h2>File Names</h2>
                  {selectedFileNames.map((name, index) => (
                    <p key={index}>{name}</p>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddFiles;
