import React, { useState } from "react";
import {
  Button,
  Space,
  Row,
  Col,
  Input,
  Checkbox,
  Upload,
  Image,
  Switch,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./AddQuiz.css";

const AddQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      image: null,
      alt: "",
      questionText: "",
      answers: ["", "", "", ""],
      correctAnswers: [false, false, false, false],
    },
  ]);

  const [activeQuestion, setActiveQuestion] = useState(0);


  const toggleQuestionEdit = (questionIndex) => {
    if (activeQuestion === questionIndex) {
      setActiveQuestion(null);
    } 
    else {
      setActiveQuestion(questionIndex);
    }
  };



  const addQuestion = () => {
    const lastQuestion = questions[questions.length - 1];

    if (lastQuestion.questionText.trim() === "") {
      alert("Please complete the previous question before adding a new one.");
      return;
    }
    const newQuestion = {
      image: null,
      alt: "",
      questionText: "",
      answers: ["", "", "", ""],
      correctAnswers: [false, false, false, false],
    };
    setQuestions([...questions, newQuestion]);
    setActiveQuestion(questions.length)
  };

  const removeQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push(
      `Answer ${updatedQuestions[questionIndex].answers.length + 1}`
    );
    setQuestions(updatedQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      console.log("You can only upload image files!");
    }
    return isImage;
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      // setImage(imageUrl);
      onSuccess("ok");
    }, 0);
  };

  const handleImageChange = (info, questionIndex) => {
    if (info.file.status === "done") {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].image = imageUrl;
      updatedQuestions[questionIndex].alt = info.file.name;
      setQuestions(updatedQuestions);
    }
  };

  const handleReplaceImage = () => {};

  const handleDeleteImage = () => {};

  const saveQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];

    if (question.questionText.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    const validAnswers = question.answers.filter(
      (answer) => answer.trim() !== ""
    );
    const validCorrectAnswers = question.correctAnswers.filter(Boolean);

    if (validAnswers.length === 0) {
      alert("Please enter at least one answer.");
      return;
    }

    if (validCorrectAnswers.length === 0) {
      alert("Please select at least one correct answer.");
      return;
    }

    updatedQuestions[questionIndex].answers = validAnswers;
    updatedQuestions[questionIndex].correctAnswers = validCorrectAnswers;

    setQuestions(updatedQuestions);
    setActiveQuestion(null);
  };

  return (
    <div>
      <div className="add-quiz-breadcrumb">
        <div className="add-quiz-breadcrumb-subcontainer">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            <Link to={"/admin/card1"}>
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
      <div className="add-quiz-container">
        <Row gutter={16}>
          <Col lg={16} sm={24} xs={24}>
            <div className="add-subcontainer">
              <h2>Quiz Block</h2>
              {questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  style={{
                    border: "1px solid #dcdcdc",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {/* Question header */}
                  <div className="add-subcontainer1">
                    <h3 style={{ width: "200px" }}>{`Question ${
                      questionIndex + 1
                    }`}</h3>
                    <div
                      style={{ width: "150px" }}
                      className="add-subcontainer1"
                    >
                      {activeQuestion === questionIndex ? (
                        <Button onClick={() => saveQuestion(questionIndex)}>
                          Done
                        </Button>
                      ) : (
                        <Button
                          onClick={() => toggleQuestionEdit(questionIndex)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button onClick={() => removeQuestion(questionIndex)}>
                        <DeleteOutlined style={{ fontSize: "20px" }} />
                      </Button>
                    </div>
                  </div>

                  {/* Question input */}
                  <div className="quiz-input">
                    {activeQuestion === questionIndex ? (
                      <Input
                        placeholder="Write your question here"
                        value={question.questionText}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[questionIndex].questionText =
                            e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ) : (
                      <p className="question-text">{question.questionText}</p>
                    )}

                    {/* Image upload */}
                    {question.image ? (
                      <div
                        className="image-container"
                        style={{
                          border: question.image ? "1px solid #dcdcdc" : "none",
                        }}
                      >
                        <>
                          <div
                            style={{
                              width: "200px",
                              height: "100px",
                            }}
                          >
                            <Image
                              src={question.image}
                              alt={question.alt}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          <div className="image-alt">
                            <p>Image alt text</p>
                            <Input
                              placeholder="Alt Text"
                              value={question}
                              onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[questionIndex].alt =
                                  e.target.value;
                                setQuestions(updatedQuestions);
                              }}
                              className="image-alt-text"
                            />
                          </div>
                          <Button
                            icon={<EditOutlined />}
                            onClick={handleReplaceImage}
                          >
                            Replace
                          </Button>
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteImage}
                          >
                            Delete
                          </Button>
                        </>
                      </div>
                    ) : (
                      <Upload
                        beforeUpload={beforeUpload}
                        customRequest={customRequest}
                        showUploadList={false}
                        accept="image/*"
                        onChange={(info) =>
                          handleImageChange(info, questionIndex)
                        }
                      >
                        <Button
                          className="add-answer-btn"
                          style={{ marginTop: "10px" }}
                        >
                          <PlusOutlined style={{ fontSize: "12px" }} /> Add
                          Image
                        </Button>
                      </Upload>
                    )}
                  </div>
                  <hr />
                  {/* Answers */}
                  <div className="answer-input">
                    <p>ANSWERS Choose single or multiple correct answers</p>
                    <div>
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                          {activeQuestion === questionIndex ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <div className="answer-display">
                                <Input
                                  placeholder="Write your answer here"
                                  value={question.answers[answerIndex]}
                                  onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[questionIndex].answers[
                                      answerIndex
                                    ] = e.target.value;
                                    setQuestions(updatedQuestions);
                                  }}
                                />
                              </div>
                              <Checkbox
                                style={{ fontSize: "20px" }}
                                checked={question.correctAnswers[answerIndex]}
                                onChange={(e) => {
                                  const updatedQuestions = [...questions];
                                  updatedQuestions[
                                    questionIndex
                                  ].correctAnswers[answerIndex] =
                                    e.target.checked;
                                  setQuestions(updatedQuestions);
                                }}
                              />
                              <DeleteOutlined
                                style={{ fontSize: "20px" }}
                                onClick={() =>
                                  removeAnswer(questionIndex, answerIndex)
                                }
                              />
                            </div>
                          ) : answer.trim() ? (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Checkbox
                                style={{ fontSize: "20px" }}
                                checked={question.correctAnswers[answerIndex]}
                                readOnly
                              />{" "}
                              &nbsp; &nbsp;
                              <p className="answer-text">{answer}</p>
                            </div>
                          ) : null}
                        </div>
                      ))}

                      {activeQuestion === questionIndex ? (
                        <Button
                          className="add-answer-btn"
                          onClick={() => addAnswer(questionIndex)}
                        >
                          <PlusOutlined style={{ fontSize: "12px" }} /> Add
                          Answer
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}

              <Button className="add-question" onClick={addQuestion}>
                <PlusOutlined style={{ fontSize: "20px" }} /> &nbsp;
                <p>New Question</p>
              </Button>
            </div>
          </Col>
          <Col lg={8} xs={24} sm={24}>
            <div className="add-subcontainer0">
              <h2>Quiz settings</h2>
              <hr />
              <div className="grade">
                <h4>Grading</h4>
                <div className="grade-subcontainer">
                  <Switch defaultChecked />
                  <p>Record grades for this quiz</p>
                </div>
              </div>
              <div className="feedback">
                <h4>Instant answer feedback</h4>
                <div className="feedback-subcontainer">
                  <Switch defaultChecked />
                  <p>
                    Display whether responses are correct and provide correct
                    answer when not selected
                  </p>
                </div>
              </div>
              <div className="compliance">
                <h4> Compliance</h4>

                <p>
                  Quiz compliance settings are located in Course Information{" "}
                  <RightOutlined style={{ fontSize: "12px" }} /> Course
                  Settings.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddQuiz;
