import React, { useState } from "react";
import { Input } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./EditForm.css";

const EditForm = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState("Know about Affiliate Indian");
  const [editingTitle, setEditingTitle] = useState(false);
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [isEditing, setIsEditing] = useState(false);
  const [subTitle, setSubTitle] = useState("We respect your privacy.");
  const [disclaimerTitle, setDisclaimerTitle] = useState(false);

  const [fields, setFields] = useState([
    { label: "Email Address", type: "email" },
  ]);

  const handleButtonClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleButtonBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setButtonText(event.target.value);
  };

  function addField() {
    setFields((prevFields) => [...prevFields, { label: "", type: "text" }]);
  }

  function removeField(index) {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields.splice(index, 1);
      return newFields;
    });
  }

  function handleTitleClick() {
    setEditingTitle(true);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleTitleBlur() {
    setEditingTitle(false);
  }

  function handleSubTitleClick() {
    setDisclaimerTitle(true);
  }

  function handleSubTitleChange(event) {
    setSubTitle(event.target.value);
  }

  function handleSubTitleBlur() {
    setDisclaimerTitle(false);
  }

  function generateFormCode() {
    const formHtml = fields
      .map((field, index) => {
        return `
              <div style="display: flex; margin-bottom: 10px;">
              <form id="myForm">
                <input type="${field.type}" name="field-${index}" placeholder="${field.label}" value=""
         style="margin-right: 10px;    box-sizing: border-box; margin: 0; padding: 4px 11px; color: rgba(0, 0, 0, 0.88);
                font-size: 14px;line-height: 1.5714285714285714;list-style: none; position: relative;display: inline-block;width: 100%; min-width: 0;background-color: #ffffff;  background-image: none;border-width: 1px;border-style: solid;border-color: #d9d9d9;border-radius: 6px; transition: all 0.2s;" />
                </form>
              </div>
            `;
      })
      .join("\n");

    const imageHtml = `
      <img
        src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        alt="Image"
        style="max-width: 50%; height: 100%; margin-right: 20px;  border-radius:5px;${
          previewMode ? "pointer-events: none;" : "height: 100%;"
        }"
      />
    `;

    const buttonHtml = `
    <button
      style="width: 100%;  font-size: 16px; font-weight: 500; border: none; margin-top: 10px;border-radius:6px"
    >
      <div  style="width: 100%;   font-size: 14px;line-height: 1.5714285714285714;list-style: none; position: relative;display: inline-block; background-color: #f2d872; color: black; padding: 5px 10px; cursor: pointer;transition: background-color 0.2s;  border: none;border-radius: 6px;">
      ${buttonText}
      </div>
    </button>
  `;

    return `
    <div style="display: flex; height:73vh;">
        ${imageHtml}
        <form>
        <div style=margin:30px;>
        <div style=font-size:36px;font-weight:bold>${title}</div>
          ${formHtml}
          <div style=margin-top:10px;>
          ${buttonHtml}
          </div>
          </div>
        </form>
       
        </div>
      `;
  }

  function handleFieldChange(index, event) {
    const newFields = [...fields];
    newFields[index].label = event.target.value;
    setFields(newFields);
  }

  function generateJavaScriptCode() {
    return `
    <script>
    document.getElementById('myForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
  
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
  
      fetch('https://affiliate-indian.onrender.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Handle success, e.g., show a success message to the user
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error, e.g., show an error message to the user
        });
    });
  </script>
    `;
  }
  const javascriptCode = generateJavaScriptCode();
  return (
    <>
      <div className="header1">
        <div>
          <span className="template-name">Template Name</span>
          <span className="edit-icon">&#9998;</span>
        </div>
        <div className="action-buttons">
          <button
            className="action-button"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Exit Preview" : "Preview"}
          </button>

          <button className="action-button" onClick={() => generateFormCode()}>
            Save
          </button>
          {/* {previewMode && ( */}
            <button
              className="action-button"
              onClick={() => {
                setShowGeneratedCode(!showGeneratedCode);
              }}
            >
              Publish
            </button>
          {/* )} */}
        </div>
      </div>
      <div className="template-container">
        <div className="left-side">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "85%",
              backgroundColor: "#fff",
              //   padding: "50px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              marginTop: "30px",
              marginBottom: "30px",
              marginLeft: "60px",
              marginRight: "60px",
              borderRadius: "5px",
            }}
          >
            {previewMode ? (
              <div
                dangerouslySetInnerHTML={{ __html: generateFormCode() }}
              ></div>
            ) : (
              <div
                style={{
                  display: "flex",
                    alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="form-img"
                  style={{
                    maxWidth: "50%",
                    marginRight: "20px",
                    height: "100%",
                    borderRadius: "5px",
                  }}
                />
                <form id="dynamic-form">
                  <div style={{ padding: "20px" }}>
                    {editingTitle ? (
                      <Input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          border: "none",
                          fontSize: "36px",
                          fontWeight: "bold",
                        }}
                      />
                    ) : (
                      <span
                        onClick={handleTitleClick}
                        style={{
                          fontSize: "36px",
                          fontWeight: "bold",
                        }}
                      >
                        {title}
                      </span>
                    )}
                    {/* {fields.map((field, index) => (
                    <>
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                         marginTop:'10px'
                      }}
                    >
                      <Input
                        type={field.type}
                        name={`field-${index}`}
                        placeholder={field.label}
                        style={{ marginRight: "10px" }}
                        required
                      />
                        <div
                        style={{ cursor: "pointer" }}
                        onClick={() => removeField(index)}
                        hidden={previewMode}
                      >
                        <DeleteOutlined  style={{fontSize:'24px'}} />
                      </div>
                     
                    
                    </div>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => addField()}
                        hidden={previewMode}
                      >
                           <PlusCircleOutlined style={{fontSize:'24px'}} />
                      </div>
                      </>
                 
                  ))} */}
                    {fields.map((field, index) => (
                      <>
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <Input
                            type={field.type}
                            name={`field-${index}`}
                            placeholder={field.label}
                            style={{ marginRight: "10px" }}
                            onChange={(event) =>
                              handleFieldChange(index, event)
                            }
                            required
                          />
                          {index > 0 && ( // Check if it's not the first field
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => removeField(index)}
                              hidden={previewMode}
                            >
                              <DeleteOutlined style={{ fontSize: "24px" }} />
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          borderBottom: "1px solid #000",
                          flex: "1",
                          marginRight: "5px",
                        }}
                      ></div>
                      <div
                        style={{
                          cursor: "pointer",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                        onClick={() => addField()}
                        hidden={previewMode}
                      >
                        <PlusCircleOutlined style={{ fontSize: "24px" }} />
                      </div>
                      <div
                        style={{
                          borderBottom: "1px solid #000",
                          flex: "1",
                          marginLeft: "5px",
                        }}
                      ></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleButtonClick}
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        fontSize: "16px",
                        fontWeight: "500",
                        border: "none",
                        marginTop: "10px",
                      }}
                    >
                      <div
                        className={`editable-button ${
                          isEditing ? "editing" : ""
                        }`}
                        onBlur={handleButtonBlur}
                        style={{ width: "100%" }}
                      >
                        {isEditing ? (
                          <Input
                            type="text"
                            value={buttonText}
                            onChange={handleInputChange}
                            autoFocus
                            onBlur={handleButtonBlur}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          buttonText
                        )}
                      </div>
                    </button>
                    <div style={{marginTop:'10px'}}>
                    {disclaimerTitle ? (
                      <Input
                        type="text"
                        value={subTitle}
                        onChange={handleSubTitleChange}
                        onBlur={handleSubTitleBlur}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          border: "none",
                          fontSize: "14px",
                          fontWeight: "400",
                          color:'#8e8e8e',
                       
                        }}
                      />
                    ) : (
                      <span
                        onClick={handleSubTitleClick}
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color:'#8e8e8e',
                        
                        }}
                      >
                        {subTitle}
                      </span>
                    )}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {showGeneratedCode && (
          <div
            className="right-side"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            <pre>
              <code>{generateFormCode()}</code>
            </pre>
            <h2>javascriptCode</h2>
             <pre>
              <code>{generateJavaScriptCode()}</code>
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

export default EditForm;
