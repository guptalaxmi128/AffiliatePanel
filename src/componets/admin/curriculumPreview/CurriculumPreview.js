import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Row,
  Dropdown,
  Menu,
  message,
  Input,
  Progress,
  Space,
  Checkbox,
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CurriculumPreview.css";
import {
  getLessonById,
  publishLesson,
  unPublishLesson,
  deleteLesson,
  updateLesson,
} from "../../../actions/lesson/lesson";
import { deleteVideo } from "../../../actions/addVideo/addVideo";
import { deletePdf } from "../../../actions/addPdf/addPdf";
import { deleteQuiz, updateQuiz } from "../../../actions/addQuiz/addQuiz";
import { getSectionById } from "../../../actions/section/section";
import { deleteUpsell } from "../../../actions/addUpsell/addUpsell";
import { deleteText, updateText } from "../../../actions/addText/addText";
import { deleteAssignment } from "../../../actions/addAssignment/addAssignment";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CurriculumPreview = ({ lessonId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editedQuiz, setEditedQuiz] = useState({
    question: "",
    options: {},
    correctAnswers: [],
  });
  // const [pdfHeight, setPdfHeight] = useState(0);
  const lesson = useSelector((state) => state.lesson.lessonById);
  const section = useSelector((state) => state.section.sectionById);
  const [lessonData, setLessonData] = useState([]);
  const [isDeleteMenuVisible, setIsDeleteMenuVisible] = useState([]);
  const [showPdf, setShowPdf] = useState([]);
  const [showQuiz, setShowQuiz] = useState([]);
  const [isEditingLessonName, setIsEditingLessonName] = useState(false);
  const [newLessonName, setNewLessonName] = useState("");
  const [courseId, setCourseId] = useState(null);

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedTextId, setEditedTextId] = useState("");
  const [showAssign, setShowAssign] = useState([]);
  const [showDeleteQuiz, setShowDeleteQuiz] = useState([]);

  useEffect(() => {
    dispatch(getLessonById(lessonId));
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (lesson.data) {
      setLessonData([lesson.data]);
    }
  }, [lesson.data]);

  // console.log(lessonData);

  useEffect(() => {
    if (lessonData) {
      const targetLesson = lessonData.find(
        (lessonItem) => lessonItem.id === lessonId
      );

      if (targetLesson) {
        setCourseId(targetLesson.courseId);
      }
    }
  }, [lessonData, lessonId]);

  useEffect(() => {
    dispatch(getSectionById(courseId));
  }, [dispatch, courseId]);

  // console.log(section);

  const handlePublishClick = (lessonIndex) => {
    // console.log("published lessonId", lessonIndex);
    dispatch(publishLesson(lessonIndex)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleUnpublishClick = (lessonId) => {
    // console.log("unpublished lessonId", lessonId);

    dispatch(unPublishLesson(lessonId)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  const menu = (index, isPublish) => (
    <Menu>
      {!isPublish && (
        <Menu.Item key="published" onClick={() => handlePublishClick(index)}>
          <p style={{ fontFamily: "Rajdhani", margin: 0 }}> Publish Now </p>
        </Menu.Item>
      )}
      {isPublish && (
        <Menu.Item
          key="unpublished"
          onClick={() => handleUnpublishClick(index)}
        >
          <p style={{ fontFamily: "Rajdhani", margin: 0 }}>Unpublished</p>
        </Menu.Item>
      )}
    </Menu>
  );

  const handleMenuIconClick = (id) => async (e) => {
    try {
      switch (e.key) {
        case "rename":
          setIsEditingLessonName(true);
          break;
        case "publicPreview":
          // Handle Public Preview Logic
          break;
        case "turnOnComments":
          // Handle Turn On Comments Logic
          break;
        case "delete":
          const res = await dispatch(deleteLesson(id));
          if (res.success) {
            message.success(res.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      message.error("Error:", error);
    }
  };

  const menu1 = (id) => (
    <Menu onClick={handleMenuIconClick(id)}>
      <Menu.Item key="rename">Rename Lesson</Menu.Item>
      <Menu.Item key="publicPreview">Set as Public Preview</Menu.Item>
      <Menu.Item key="turnOnComments">Turn On Comments</Menu.Item>
      <Menu.Item key="delete">Delete Lesson</Menu.Item>
    </Menu>
  );

  const handleDeleteMenuClick = (index, visible) => {
    const newMenuVisibility = [...isDeleteMenuVisible];
    newMenuVisibility[index] = visible;
    setIsDeleteMenuVisible(newMenuVisibility);
  };

  const menu2 = (id, fileIndex) => (
    <Menu onClick={(e) => handleMenuTextClick(e, id, fileIndex)}>
      <Menu.Item key="delete">
        <span style={{ color: "red", fontFamily: "Rajdhani" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleMenuTextClick = async (e, id, index) => {
    console.log(`Clicked text ${id}, menu item: ${e.key}`);
    if (e.key === "delete") {
      try {
        const res = await dispatch(deleteText(id));
        if (res.success) {
          console.log(`Text ${id} deleted successfully.`);
          message.success(res.message);
        }
      } catch (error) {
        message.error(`Error deleting text ${id}:`, error);
      }
    }
    const newMenuVisibility = [...isMenuVisible];
    newMenuVisibility[index] = false;
    setIsDeleteMenuVisible(newMenuVisibility);
  };

  const menu6 = (id, fileIndex) => (
    <Menu onClick={(e) => handleAssignChange(e, id, fileIndex)}>
      <Menu.Item key="delete">
        <span style={{ color: "red", fontFamily: "Rajdhani" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleShowAssignChange = (index, visible) => {
    const newVisibility = [...showAssign];
    newVisibility[index] = visible;
    setShowAssign(newVisibility);
  };

  const handleAssignChange = async (e, id, index) => {
    // console.log(`Clicked assign ${id}, menu item: ${e.key}`);
    if (e.key === "delete") {
      try {
        const res = await dispatch(deleteAssignment(id));
        console.log(res);
        if (res.success) {
          // console.log(`Assign ${id} deleted successfully.`);
          message.success(res.message);
        }
      } catch (error) {
        console.log(error);
        message.error(`Error deleting assign ${id}:`, error);
      }
    }
    const newMenuVisibility = [...isMenuVisible];
    newMenuVisibility[index] = false;
    setShowAssign(newMenuVisibility);
  };

  const [isMenuVisible, setMenuVisible] = useState([]);

  const handleMenuVisibleChange = (index, visible) => {
    const newMenuVisibility = [...isMenuVisible];
    newMenuVisibility[index] = visible;
    setMenuVisible(newMenuVisibility);
  };

  const handleMenuVideoClick = async (e, id, index) => {
    console.log(`Clicked video ${id}, menu item: ${e.key}`);
    if (e.key === "delete") {
      try {
        const res = await dispatch(deleteVideo(id));
        if (res.success) {
          console.log(`Video ${id} deleted successfully.`);
          message.success(res.message);
        }
      } catch (error) {
        message.error(`Error deleting video ${id}:`, error);
      }
    }
    const newMenuVisibility = [...isMenuVisible];
    newMenuVisibility[index] = false;
    setMenuVisible(newMenuVisibility);
  };

  const menu3 = (id, index) => (
    <Menu onClick={(e) => handleMenuVideoClick(e, id, index)}>
      <Menu.Item key="download">Download</Menu.Item>
      <Menu.Item key="delete">
        <span style={{ color: "red" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleMenuPdfClick = async (e, id, index) => {
    console.log(`Clicked pdf ${id}, menu item: ${e.key}`);
    if (e.key === "delete") {
      try {
        const res = await dispatch(deletePdf(id));
        if (res.success) {
          console.log(`Pdf ${id} deleted successfully.`);
          message.success(res.message);
        }
      } catch (error) {
        message.error(`Error deleting pdf ${id}:`, error);
      }
      const newPdfVisibility = [...showPdf];
      newPdfVisibility[index] = false;
      setShowPdf(newPdfVisibility);
    }
  };

  const handleShowPdfChange = (index, visible) => {
    const newPdfVisibility = [...showPdf];
    newPdfVisibility[index] = visible;
    setShowPdf(newPdfVisibility);
  };

  const menu4 = (id, fileIndex) => (
    <Menu onClick={(e) => handleMenuPdfClick(e, id, fileIndex)}>
      <Menu.Item key="download">Download</Menu.Item>
      <Menu.Item key="delete">
        <span style={{ color: "red" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleShowQuizChange = (index, visible) => {
    const newQuizVisibility = [...showQuiz];
    newQuizVisibility[index] = visible;
    setShowQuiz(newQuizVisibility);
  };

  const handleDeleteQuiz = async (e, id, index) => {
    console.log(`Clicked quiz ${id}, menu item: ${e.key}`);
    if (e.key === "delete") {
      try {
        const res = await dispatch(deleteQuiz(id));
        if (res.success) {
          console.log(`Quiz ${id} deleted successfully.`);
          message.success(res.message);
        }
      } catch (error) {
        message.error(`Error deleting quiz ${id}:`, error);
      }
      const newQuizVisibility = [...showQuiz];
      newQuizVisibility[index] = false;
      setShowQuiz(newQuizVisibility);
    }
  };

  const menu5 = (id, fileIndex) => (
    <Menu onClick={(e) => handleDeleteQuiz(e, id, fileIndex)}>
      <Menu.Item key="delete">
        <span style={{ color: "red", fontFamily: "Rajdhani" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  // const handlePdfLoadSuccess = ({ numPages }) => {
  //   const containerHeight = numPages * 300;
  //   setPdfHeight(containerHeight);
  // };

  const handleCancelEditLessonName = () => {
    setIsEditingLessonName(false);
    setNewLessonName("");
  };

  const handleSaveEditLessonName = async (id) => {
    try {
      const data = {
        lessonName: newLessonName,
        id,
      };

      const res = await dispatch(updateLesson(data));
      if (res.success) {
        message.success(res.message);
        setIsEditingLessonName(false);
        setNewLessonName("");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(deleteUpsell(id));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  const renderHtmlContent = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const images = doc.querySelectorAll("img");

    images.forEach((image, index) => {
      image.classList.add("extracted-image");
      image.dataset.src = image.src;

      // Add styles to constrain the images
      image.style.maxWidth = "100%"; // Adjust this as needed
      image.style.height = "auto"; // Maintain aspect ratio

      image.onload = () => {
        console.log(`Image ${index + 1} loaded successfully:`, image.src);
      };

      image.onerror = () => {
        console.error(`Error loading image ${index + 1}:`, image.src);
      };

      image.src = image.dataset.src;
    });

    return doc.body.innerHTML;
  };

  const handleEditClick = (initialText, index, id) => {
    setEditedText(initialText);
    setIsEditVisible(true);
    setEditedIndex(index);
    setEditedTextId(id);
  };

  const handleSaveEdit = async () => {
    // console.log(editedTextId)
    try {
      // console.log(`Saving edited text: ${editedText} for index: ${editedIndex}`);

      const data = {
        text: editedText,
        textType: "RICHTEXT",
        id: editedTextId,
      };

      const res = await dispatch(updateText(data));

      if (res.success) {
        message.success(res.message);
        setIsEditVisible(false);
        setEditedIndex(null);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error(
        "An unexpected error occurred while saving the edited text:",
        error
      );
      message.error(error.response.data.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditVisible(false);
    setEditedIndex(null);
    setEditedText("");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      // [{ color: ["red", "#785412"] }],
      // [{ background: ["red", "#785412"] }],
      [{ color: [] }, { background: [] }],
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

  const handleEditQuiz = (quizId, fileIndex, quiz) => {
    // Fetch the quiz details or handle the edit logic
    const quizToEdit = quiz;

    if (quizToEdit) {
      setEditedQuiz({
        question: quizToEdit.quizQuestion,
        options: quizToEdit.option,
        correctAnswers: quizToEdit.answer,
      });
    }

    setShowQuiz((prevShowQuiz) => {
      const newShowQuiz = [...prevShowQuiz];
      newShowQuiz[fileIndex] = true; // Set to true to show the edited quiz details
      return newShowQuiz;
    });
  };

  const handleOptionChange = (optionKey, value) => {
    setEditedQuiz((prevQuiz) => ({
      ...prevQuiz,
      options: {
        ...prevQuiz.options,
        [optionKey]: value,
      },
    }));
  };

  const handleCheckboxChange = (optionKey, checked) => {
    setEditedQuiz((prevQuiz) => {
      const updatedCorrectAnswers = checked
        ? [...prevQuiz.correctAnswers, optionKey]
        : prevQuiz.correctAnswers.filter((key) => key !== optionKey);

      return {
        ...prevQuiz,
        correctAnswers: updatedCorrectAnswers,
      };
    });
  };

  const handleSaveQuiz = async (id) => {
    try {
      console.log(id);
      const data = {
        quizQuestion: editedQuiz.question,
        answer: editedQuiz.correctAnswers,
        option: editedQuiz.options,
        id,
      };

      console.log(data);
      const res = await dispatch(updateQuiz(data));

      if (res.success) {
        message.success(res.message);
        setEditedQuiz({ question: "", options: {}, correctAnswers: [] });
        setShowQuiz([]);
      } else {
        message.error("Quiz update failed");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      message.error(error.response.data.message);
    }
  };

  const handleCancelQuiz = () => {
    setEditedQuiz({ question: "", options: {}, correctAnswers: [] });
    setShowQuiz([]);
  };

  const handleShowDeleteQuizChange = (index, visible) => {
    const updatedShowDeleteQuiz = [...showDeleteQuiz];
    updatedShowDeleteQuiz[index] = visible;
    setShowDeleteQuiz(updatedShowDeleteQuiz);
  };

  return (
    <>
      <div className="curriculum-preview-container">
        <div className="c-preview-subcontainer">
          <h2>Curriculum</h2>
          <Button className="c-preview-btn">Preview</Button>
        </div>
        <div>
          <Row gutter={16}>
            <Col lg={16} sm={24} xs={24}>
              {lessonData.map((lesson, index) => (
                <div key={index} className="c-preview-subcontainer0">
                  <div className="preview-lesson-container">
                    {isEditingLessonName ? (
                      <div style={{ display: "flex" }}>
                        <Col lg={16} sm={24} xs={24}>
                          <Input
                            value={newLessonName}
                            onChange={(e) => setNewLessonName(e.target.value)}
                          />
                        </Col>
                        <Button
                          onClick={() => handleSaveEditLessonName(lesson.id)}
                          className="save-lesson-btn"
                        >
                          Save
                        </Button>
                        <Button onClick={handleCancelEditLessonName}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h2>{lesson.lessonName}</h2>
                        <div className="publish-container">
                          <Dropdown
                            overlay={menu(lesson.id, lesson.isPublic)}
                            trigger={["click"]}
                          >
                            <Button
                              type="default"
                              style={{
                                borderColor: lesson.isPublic ? "green" : "red",
                                color: lesson.isPublic ? "green" : "red",
                              }}
                            >
                              {lesson.isPublic ? "Published" : "UnPublished"}
                              <DownOutlined />
                            </Button>
                          </Dropdown>

                          <Dropdown
                            overlay={menu1(lesson.id)}
                            trigger={["click"]}
                          >
                            <EllipsisOutlined
                              style={{ fontSize: "20px", cursor: "pointer" }}
                            />
                          </Dropdown>
                        </div>
                      </>
                    )}
                  </div>

                  <hr style={{ margin: 0 }} />
                  {lesson?.lessonVideos.map((video, index) => (
                    <div key={index}>
                      <div className="show-video-container">
                        <h2>Video</h2>
                        <Dropdown
                          overlay={() => menu3(video.id, index)}
                          visible={isMenuVisible[index]}
                          onVisibleChange={(visible) =>
                            handleMenuVisibleChange(index, visible)
                          }
                          trigger={["click"]}
                        >
                          <EllipsisOutlined
                            style={{ cursor: "pointer", fontSize: "20px" }}
                          />
                        </Dropdown>
                      </div>
                      <div className="show-video-subcontainer">
                        {video.videoType === "EMBEDDEDCODE" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: video.embeddedVideoCode,
                            }}
                          />
                        ) : (
                          <div>
                            <iframe
                              width="100%"
                              height="300"
                              src={video.Iframe_URL}
                              frameBorder="0"
                              allow="autoplay; fullscreen"
                              allowFullScreen
                            ></iframe>
                            {video.encodeProgress !== 100 && (
                              <div className="progress-indicator">
                                <Progress
                                  percent={video.encodeProgress || 0}
                                  width={300}
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <p style={{ marginTop: "5px" }}>{video.videoName}</p>
                      </div>
                    </div>
                  ))}
                  <hr style={{ margin: 0 }} />
                  {lesson?.lessonTexts.map((lesson, index) => (
                    <React.Fragment key={index}>
                      <div className="show-text-super-container">
                        <div className="show-text-container">
                          <h2>TEXT & IMAGE BLOCK</h2>
                          <div className="show-edit">
                            <Button
                              icon={<EditOutlined />}
                              onClick={() =>
                                handleEditClick(lesson.text, index, lesson.id)
                              }
                            >
                              Edit{" "}
                            </Button>

                            <Dropdown
                              overlay={() => menu2(lesson.id, index)}
                              visible={isDeleteMenuVisible[index]}
                              onVisibleChange={(visible) =>
                                handleDeleteMenuClick(index, visible)
                              }
                              trigger={["click"]}
                            >
                              <EllipsisOutlined
                                style={{ cursor: "pointer", fontSize: "20px" }}
                              />
                            </Dropdown>
                          </div>
                        </div>
                        <div>
                          {isEditVisible && editedIndex === index ? (
                            <>
                              <ReactQuill
                                value={editedText}
                                onChange={(value) => setEditedText(value)}
                                modules={modules}
                                formats={formats}
                              />
                              <Space style={{ marginTop: "8px" }}>
                                <Button
                                  onClick={() => handleSaveEdit(lesson.id)}
                                >
                                  Save
                                </Button>
                                <Button onClick={handleCancelEdit}>
                                  Cancel
                                </Button>
                              </Space>
                            </>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: renderHtmlContent(lesson.text),
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <hr style={{ margin: 0 }} />
                    </React.Fragment>
                  ))}

                  {lesson?.lessonFiles?.map((file, fileIndex) => (
                    <div key={fileIndex}>
                      <div className="show-pdf-container">
                        <h2>Files</h2>
                        <Dropdown
                          overlay={() => menu4(file.id, fileIndex)}
                          visible={showPdf[fileIndex]}
                          onVisibleChange={(visible) =>
                            handleShowPdfChange(fileIndex, visible)
                          }
                          trigger={["click"]}
                        >
                          <EllipsisOutlined
                            style={{ cursor: "pointer", fontSize: "20px" }}
                          />
                        </Dropdown>
                      </div>
                      <div
                        className="show-pdf-subcontainer"
                        style={{
                          //  height: `${pdfHeight}px`,
                          overflow: "auto",
                        }}
                      >
                        {file.file_MimeType === "application/pdf" ? (
                          <>
                            <p>{file?.file_OriginalName}</p>
                            <Document
                              file={`${file?.file_Path}`}
                              options={{
                                workerSrc: pdfjs.GlobalWorkerOptions.workerSrc,
                              }}
                              // onLoadSuccess={handlePdfLoadSuccess}
                            >
                              <Page
                                pageNumber={1}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                              />
                            </Document>
                          </>
                        ) : (
                          <p>{file?.file_OriginalName}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <hr style={{ margin: 0 }} />
                  {lesson?.lessonQuizs.map((quiz, fileIndex) => (
                    <div key={fileIndex}>
                      <div className="show-quiz-container">
                        <h2>Quiz</h2>
                        <div className="show-edit">
                          <Button
                            icon={<EditOutlined />}
                            onClick={() =>
                              handleEditQuiz(quiz.id, fileIndex, quiz)
                            }
                          >
                            Edit
                          </Button>
                          <Dropdown
                            overlay={() => menu5(quiz.id, fileIndex)}
                            visible={showDeleteQuiz[fileIndex]}
                            onVisibleChange={(visible) =>
                              handleShowDeleteQuizChange(fileIndex, visible)
                            }
                            trigger={["click"]}
                          >
                            <EllipsisOutlined
                              style={{ cursor: "pointer", fontSize: "20px" }}
                            />
                          </Dropdown>
                        </div>
                      </div>
                      <div className="show-quiz-subcontainer">
                        <div>
                          {showQuiz[fileIndex] ? (
                            <div>
                              <Input
                                style={{ marginBottom: "10px" }}
                                value={editedQuiz.question}
                                onChange={(e) =>
                                  setEditedQuiz({
                                    ...editedQuiz,
                                    question: e.target.value,
                                  })
                                }
                              />
                              <div>
                                {Object.entries(editedQuiz.options).map(
                                  ([optionKey, optionValue]) => (
                                    <div key={optionKey}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <div className="answer-display">
                                          <Input
                                            value={optionValue}
                                            onChange={(e) =>
                                              handleOptionChange(
                                                optionKey,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <Checkbox
                                          checked={editedQuiz.correctAnswers.includes(
                                            optionKey
                                          )}
                                          onChange={(e) =>
                                            handleCheckboxChange(
                                              optionKey,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <Space>
                                <Button onClick={() => handleSaveQuiz(quiz.id)}>
                                  Save
                                </Button>
                                <Button onClick={handleCancelQuiz}>
                                  Cancel
                                </Button>
                              </Space>
                            </div>
                          ) : (
                            <div>
                              <h5>{quiz.quizQuestion}</h5>
                              <p>Correct Answer: {quiz.answer.join(", ")}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr style={{ margin: 0 }} />
                  {lesson?.upSell.map((upsell, fileIndex) => (
                    <div key={fileIndex}>
                      <div className="show-text-super-container">
                        <div className="show-text-container">
                          <h2>Upsell</h2>
                          <div className="show-edit">
                            <Button onClick={() => handleDelete(upsell.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                        {upsell.buttonLink && (
                          <Button
                            href={upsell.buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {upsell.buttonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <hr style={{ margin: 0 }} />
                  {lesson?.assignment.map((assign, fileIndex) => (
                    <div key={fileIndex}>
                      <div className="show-text-super-container">
                        <div className="show-text-container">
                          <h2>Assignment</h2>
                          <Dropdown
                            overlay={() => menu6(assign.id, fileIndex)}
                            visible={showAssign[fileIndex]}
                            onVisibleChange={(visible) =>
                              handleShowAssignChange(fileIndex, visible)
                            }
                            trigger={["click"]}
                          >
                            <EllipsisOutlined
                              style={{ cursor: "pointer", fontSize: "20px" }}
                            />
                          </Dropdown>
                        </div>
                        <p style={{ margin: 0 }}>{assign.question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Col>
            {/* by courseId to show sectionBYId section and lesson */}
            <Col lg={8} xs={24} sm={24}>
              <div className="c-preview-subcontainer1">
                <div className="outline-container">
                  <h2>Outline</h2>
                  {/* <Button icon={<EditOutlined />}>Edit</Button> */}
                </div>
                {section && (
                  <div className="outline-subcontainer">
                    {section?.data?.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h5>{section?.sectionName}</h5>
                        {section?.lessons.map((lesson, lessonIndex) => (
                          <p
                            key={lessonIndex}
                            style={{cursor:'pointer'}}
                            onClick={() => navigate(`/lesson/${lesson.id}`)}
                          >
                            {lesson?.lessonName}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CurriculumPreview;
