import React from "react";
import { Space,Button} from 'antd';
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import "./AddText.css";

const AddText = () => {
  const config = {
    readonly: false, 
    height:'300px'
  };

  const handleChange = (content) => {
    console.log("Editor content:", content);
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
    <div className="add-text-container">
      <h2>Text and image block</h2>
      <div className="add-text-subcontainer">
      <JoditEditor
        config={config}
        onChange={handleChange}
      />
      <div style={{marginTop:'20px',display:'flex',justifyContent:'flex-end'}}>
      <Space >
        <Button style={{fontFamily:'Rajdhani'}} >Cancel</Button>
        <Button className="text-save-btn">Save</Button>
      </Space>
      </div>
      </div>
    </div>
    </>
  );
};

export default AddText;
