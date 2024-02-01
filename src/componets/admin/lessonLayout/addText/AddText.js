import React, { useState } from "react";
import { Space, Button, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReactQuill, { quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddText.css";
import { useDispatch } from "react-redux";
import { addText } from "../../../../actions/addText/addText";

const AddText = ({ lessonId }) => {
  const dispatch = useDispatch();
  const [richTextEditor, setRichTextEditor] = useState("");

  const handleSave = async () => {
    try {
      if (!richTextEditor.trim()) {
        message.error("Rich text editor content cannot be blank.");
        return;
      }

      const data = {
        text: richTextEditor,
        lessonId: lessonId,
        textType: "RICHTEXT",
      };
      console.log(data);
      const res = await dispatch(addText(data));
      console.log(res);
      if (res.success) {
        message.success(res.message);
        setRichTextEditor("");
      } else {
        message.error("Failed to update lesson. Please try again.");
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      message.error(error.response.data.message);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image","custom-link"],
      // [{ color: ["blue"] }],
      // [{ color: ["red", "#785412"] }],
      // [{ background: ["red", "#785412"] }],
      [{ color: [] }, { background: [] }],
      // [{ color: [textColor] }, { background: [backgroundColor] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const handleChange = (content, delta, source, editor) => {
    setRichTextEditor(content);
  };

  return (
    <>
      <div className="add-text-breadcrumb">
        <div className="add-text-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            <Link to={`/lesson/${lessonId}`}>
              <LeftOutlined style={{ fontSize: "14px" }} /> &nbsp; Back to
              lesson layout
            </Link>
          </p>

          <Space>
            <Button style={{ fontFamily: "Rajdhani" }}> Preview</Button>
            <Button style={{ fontFamily: "Rajdhani" }}>Publish</Button>
          </Space>
        </div>
      </div>
      <div className="add-text-container">
        <h2>Text & Image block</h2>
        <div className="add-text-subcontainer">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={richTextEditor}
            onChange={handleChange}
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Space>
              <Button style={{ fontFamily: "Rajdhani" }}>Cancel</Button>
              <Button
                className="text-save-btn"
                onClick={handleSave}
                htmlType="submit"
              >
                Save
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddText;
