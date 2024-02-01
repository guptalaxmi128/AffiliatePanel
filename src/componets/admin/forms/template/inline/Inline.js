import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import template from "../../../../../assets/inline/template.jpg";
import "./Inline.css";
import { getTemplate } from "../../../../../actions/addTemplate/addTemplate";
import { useDispatch, useSelector } from "react-redux";

const Inline = () => {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.template.template);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [data, setData] = useState([]);

  // const localHost = "http://localhost:5000";
  const localHost="https://affiliate-indian.onrender.com";
  // const localHost="http://3.224.85.30";

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  useEffect(() => {
    dispatch(getTemplate());
  }, [dispatch]);

  useEffect(() => {
    if (template) {
      setData(template.data);
    }
  }, [template]);
  console.log(data);

  return (
    <div className="template-selector">
      <h2 style={{ fontSize: "32px", fontWeight: "400" }}>
        Choose Your Template
      </h2>
      <hr className="horizontal-line" />
      <div className="template-cards">
        {data?.map((template) => (
          <div
            key={template.id}
            className={`template-card ${
              selectedTemplate === template ? "selected" : ""
            }`}
            onClick={() => handleTemplateClick(template)}
          >
            <img
              // src={`${localHost}/masterFile/${template?.templateImage_FileName}`}
              src={`${template?.templateImage_Path}`}
              alt={`${template?.template}`}
              // style={{  width:"300px" }}
            />
            <div
              style={{ display: "grid", padding: "1rem" }}
              className="grid-cols-2"
            >
              <p>{template?.template}</p>
              <Link to={`/inline/edit/${template.id}`}>
                <Button className="template-card-btn" >Choose</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inline;
