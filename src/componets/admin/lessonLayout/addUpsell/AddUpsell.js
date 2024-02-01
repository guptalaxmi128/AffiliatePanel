import React, { useState } from "react";
import { Button, Input, Space, Row, Col, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./AddUpsell.css";
import { useDispatch } from "react-redux";
import { addUpsell } from "../../../../actions/addUpsell/addUpsell";

function AddUpsell({ lessonId }) {
  const dispatch = useDispatch();

  // const [buttons, setButtons] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorLink, setErrorLink] = useState("");

  const addNewButton = async () => {
    setErrorText("");
    setErrorLink("");

    if (validateInputs()) {
      const newButton = {
        buttonText,
        buttonLink,
        lessonId,
      };

      try {
        const response = await dispatch(addUpsell(newButton));

        if (response.success) {
          message.success(response.message);
          // setButtons([...buttons, newButton]);
          setButtonText("");
          setButtonLink("");
        } else {
          message.error("API Error:", response.data.message);
        }
      } catch (error) {
        message.error("Error:", error.message);
      }
    }
  };

  const validateInputs = () => {
    let valid = true;

    if (!buttonText) {
      setErrorText("Please enter Button Text");
      valid = false;
    }

    if (!buttonLink) {
      setErrorLink("Please enter Button Link");
      valid = false;
    }

    return valid;
  };

  // const duplicateButton = (index) => {
  //   if (index >= 0 && index < buttons.length) {
  //     const duplicatedButton = buttons[index];
  //     setButtons([...buttons, duplicatedButton]);
  //   }
  // };

  // const removeButton = (index) => {
  //   if (index >= 0 && index < buttons.length) {
  //     const updatedButtons = [...buttons];
  //     updatedButtons.splice(index, 1);
  //     setButtons(updatedButtons);
  //   }
  // };

  return (
    <>
      <div className="add-upsell-breadcrumb">
        <div className="add-upsell-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            <Link to="/admin/card1">
              <LeftOutlined style={{ fontSize: "14px" }} /> &nbsp; Back to
              lesson layout
            </Link>
          </p>

          <Space>
            <Button style={{ fontFamily: "Rajdhani" }}>Preview</Button>
            <Button style={{ fontFamily: "Rajdhani" }}>Publish</Button>
          </Space>
        </div>
      </div>
      <div className="add-upsell-container">
        <div className="add-upsell-subcontainer">
          <h2>Upsell</h2>

          <div>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Input
                  placeholder="Button Text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                />
                <span style={{ color: "red" }}>{errorText}</span>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  placeholder="Button Link"
                  value={buttonLink}
                  onChange={(e) => setButtonLink(e.target.value)}
                />
                <span style={{ color: "red" }}>{errorLink}</span>
              </Col>
            </Row>

            <Button className="add-upsell-btn" onClick={addNewButton}>
              Add Button
            </Button>
          </div>

          {/* <div style={{ margin: "20px" }}>
            {buttons.map((button, index) => (
              <div
                key={index}
                style={{
                  alignItems: "center",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <Space>
                  <Button type="default" href={button.link} target="_blank">
                    {button.text}
                  </Button>
                  <Button type="default" onClick={() => duplicateButton(index)}>
                    Duplicate
                  </Button>
                  <Button type="default" onClick={() => removeButton(index)}>
                    Remove
                  </Button>
                </Space>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default AddUpsell;
