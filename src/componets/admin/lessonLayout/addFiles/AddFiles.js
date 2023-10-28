import React, { useState } from "react";
import { Space, Button, Row, Col, message, Upload,Dropdown,Menu } from "antd";
import { InboxOutlined, LeftOutlined,EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./AddFiles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AddFiles = () => {
  const [fileList, setFileList] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [lesson, setLesson] = useState("");

  console.log(pdfFile);

  const handleFileListChange = (newFileList) => {
    setFileList(newFileList);
  };

  const handleFileUpload = () => {
    //this is added to show one file is uploaded
    //  because it is not connected to backend
    if (fileList.length > 0) {
      const updatedFileList = [...fileList];
      updatedFileList[0] = {
        ...updatedFileList[0],
        status: "done",
      };
      setFileList(updatedFileList);
      setFileUploaded(true);
      setPdfFile(updatedFileList[0]);
    }
  };

  const fileStatus = (file) => {
    if (file.status === "done") {
      return `${(file.size / 1024).toFixed(2)} KB`;
    } else if (file.status === "error") {
      return "Upload Failed";
    }
    return "Uploading...";
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
      <div className="add-files-breadcrumb">
        <div className="add-files-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            <Link to={"/admin/card1"}>
              <LeftOutlined  style={{ fontSize:'14px'}}/> &nbsp; Back to lesson layout
            </Link>
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
                <h2>Lesson 1</h2>
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
                    {!fileUploaded ? (
                      <div style={{ textAlign: "center" }}>
                      <InboxOutlined
                        style={{ color: "#ddb42c", fontSize: "32px" }}
                      />
                      <p>Select PDF files to upload</p>
                    </div>
                    ) : (
                      <p>Completed</p>
                    )}
                  </Upload>
                  <div style={{ width: '100%' }}>
                    {fileList.map((file) => (
                      <p key={file.uid}>
                        {file.name} - {fileStatus(file)}
                      </p>
                    ))}
                  </div>
                  {!fileUploaded && (
                    <Button className="upload-files-btn" onClick={handleFileUpload}>
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
              <div className="pdf-view-container">
              <h2>File Name</h2>
                <p>
                 Receipt.pdf
                </p>
                {pdfFile && (
                  <div className="pdf-viewer">
                    <Document file={pdfFile}>
                      <Page pageNumber={1} />
                    </Document>
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
