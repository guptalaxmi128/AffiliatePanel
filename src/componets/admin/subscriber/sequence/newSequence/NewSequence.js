import React from "react";
import { Card } from "antd";
import template from "../../../../../assets/img/email_template.jpg";
import "./NewSequence.css";
import { Link } from "react-router-dom";

const NewSequence = () => {
  return (
    <>
      <div className="new-sequence-container">
        <h2>Choose a template for your sequence</h2>
        <div className="new-sequence-subcontainer">
        <Link to={"/admin/sequences/content"}>
          <div className="new-sequence-subcontainer0">
          <p>Text only</p>
            <Card cover={<img alt="Image" src={template} className="template" />}></Card>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewSequence;
