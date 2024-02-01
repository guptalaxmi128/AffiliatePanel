import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  message,
  Modal,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAssignment,
  getUserAssignment,
} from "../../../../../actions/userAssignment/userAssignment";
import {
  addUserAffiliateLink,
  getAffiliateUserId,
} from "../../../../../actions/userAffiliateLink/userAffiliateLink";
import {
  addUserScheduleCall,
  getUserSchdeduleCall,
} from "../../../../../actions/userScheduleCall/userScheduleCall";

const { Option } = Select;

const Assignment = ({ lessonId, courseId, adminId, onLessonComplete }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const lesson = useSelector((state) => state.userLesson.lessons);
  //   const assignment = useSelector((state) => state.userAssignment.assignment);
  // console.log(assignment)
  const affiliate = useSelector((state) => state.userAffiliateLink.userLink);
  const call = useSelector((state) => state.userScheduleCall.call);
  const [isChecked, setIsChecked] = useState(false);
  const [affiliateId, setAffiliateId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [callData, setCallData] = useState([]);
  const [scheduleId, setScheduleId] = useState("");
  const [lessonComplete, setLessonComplete] = useState(false);

  // console.log(adminId)

  useEffect(() => {
    if (lesson.data) {
      setData([lesson.data]);
    }
  }, [lesson.data]);
  console.log(data);

  useEffect(() => {
    if (affiliate.data) {
      setAffiliateId(affiliate.data.aid);
    }
  }, [affiliate.data]);

  useEffect(() => {
    if (courseId) {
      dispatch(getAffiliateUserId(courseId));
    }
  }, [dispatch, courseId]);
  // console.log(courseId);

  useEffect(() => {
    setLessonComplete(false);
    if (lessonId) {
      dispatch(getUserAssignment(lessonId));
    }
  }, [dispatch, lessonId]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const filteredAssignment = data?.find((lesson) => lesson.id === lessonId);

  let assignmentData = filteredAssignment?.assignment || [];
  const assignmentTypeOrder = [
    "SCHEDULE CALL",
    "ANSWER",
    "INFORMATION",
    "AFFILIATE LINK",
  ];

  let textData = filteredAssignment?.lessonTexts || [];
  console.log("text", textData);
  assignmentData = assignmentData.sort((a, b) => {
    const orderA = assignmentTypeOrder.indexOf(a.assignmentType);
    const orderB = assignmentTypeOrder.indexOf(b.assignmentType);
    return orderA - orderB;
  });

  const handleChange = async (assignmentId) => {
    try {
      console.log(assignmentId);
      const res = await dispatch(addUserAffiliateLink(assignmentId));
      console.log(res);
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error while handling change:", error);
      message.error("An error occurred while handling change.");
    }
  };

  async function handleAnswerSubmit(assignmentId, values, form) {
    try {
      const data = {
        id: assignmentId,
        answer: values.answer,
      };
      // console.log(data);
      const res = await dispatch(addUserAssignment(data));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error(
        "Error submitting assignment:",
        error.response.data.message
      );

      message.error(error.response.data.message);
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const res = await dispatch(addUserScheduleCall(scheduleId));
      if (res.success) {
        message.success(res.message);
        setIsModalVisible(false);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error adding user schedule:", error);
      console.error("Error", error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (adminId) {
      dispatch(getUserSchdeduleCall(adminId));
    }
  }, [dispatch, adminId]);

  useEffect(() => {
    if (call.data) {
      setCallData(call.data);
    }
  }, [call.data]);

  useEffect(() => {
    if (callData && callData.length > 0) {
      const firstSchedule = callData[0];

      form.setFieldsValue({
        month: firstSchedule.month,
        date: firstSchedule.date,
      });
    }
  }, [callData, form]);

  function renderAssignmentType(assign) {
    switch (assign.assignmentType) {
      case "SCHEDULE CALL":
        return (
          <>
            <p className="item-box1">{assign.question}</p>
            <button className="schedule-btn" onClick={showModal}>
              SCHEDULE CALL
            </button>
            <Modal
              title="Schedule Now"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {callData && (
                <Form
                  form={form}
                  name="myForm"
                  // onFinish={onFinish}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Form.Item
                    label="Month"
                    name="month"
                    rules={[
                      { required: true, message: "Please select a month" },
                    ]}
                  >
                    <Input placeholder="Month" disabled />
                  </Form.Item>

                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      { required: true, message: "Please select a date" },
                    ]}
                  >
                    <Input placeholder="Date" disabled />
                  </Form.Item>

                  <Form.Item
                    label="Select Timing"
                    name="selectTiming"
                    rules={[
                      { required: true, message: "Please select a timing" },
                    ]}
                  >
                    <Select
                      placeholder="Select time intervals"
                      value={scheduleId}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                      // dropdownStyle={{ maxWidth: "300px", overflow: "hidden" }}
                    >
                      {callData?.map((timeInterval) => (
                        <Option key={timeInterval.id} value={timeInterval.id}>
                          {timeInterval.timing}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              )}
            </Modal>
          </>
        );
      case "ANSWER":
        return (
          <p className="item-box2">
            {assign.question}
            <Form
              name={`myForm${assign.id}`}
              onFinish={(values) => handleAnswerSubmit(assign.id, values, form)}
              style={{ width: "250px" }}
              form={form}
            >
              <Form.Item
                name="answer"
                rules={[
                  {
                    required: true,
                    message: "Please enter your answer.",
                  },
                ]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Answer"
                  className="assign-area"
                  style={{ fontFamily: "Rajdhani" }}
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" className="call-btn">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </p>
        );
      case "INFORMATION":
        return <p className="item-box1">{assign.question}</p>;
      case "AFFILIATE LINK":
        return (
          <>
            <p className="item-box2">
              {assign.question}

              {affiliateId && (
                <>
                  <p className="item-box2">Your Affiliate Id :{affiliateId}</p>
                </>
              )}
            </p>

            <Button
              type="default"
              style={{ marginTop: "20px" }}
              // className="booking-btn"
              onClick={() => handleChange(assign.id)}
            >
              Send Request For Affiliate Id
            </Button>
          </>
        );
      default:
        return null;
    }
  }

  const renderHtmlContent = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const images = doc.querySelectorAll("img");

    images.forEach((image, index) => {
      image.classList.add("extracted-image");
      image.dataset.src = image.src;

      image.style.maxWidth = "100%";
      image.style.height = "auto";

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

  const handleMarkComplete = () => {
    setLessonComplete(true);
    setIsChecked(false);
    const nextLessonId = data?.find((lesson) => lesson.id === lessonId);
    onLessonComplete(nextLessonId);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 custom-container">
            <div className="nested-container">
              <h2>Your Assignments</h2>
              {assignmentData.map((assign, index) => (
                <div className="inner-sub-container2" key={index}>
                  <div className="item-container">
                    <div className="item-box">
                      <p className="content1">Assignment</p>
                      <p className="content2">{index + 1}</p>
                    </div>
                  </div>

                  {renderAssignmentType(assign)}
                </div>
              ))}

              <p
                style={{
                  fontFamily: "Rajdhani",
                  padding: "20px",
                  textAlign: "justify",
                }}
              >
                <>
                  {textData?.map((lesson, lessonIndex) => (
                    <div key={lessonIndex}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderHtmlContent(lesson.text),
                        }}
                      />
                    </div>
                  ))}
                </>
              </p>
            </div>
          </div>
        </div>
      </div>
      {lessonComplete ? (
        <div className="container-fluid" style={{ padding: "25px" }}>
          <div className="col-lg-12 col-md-12 custom-container1">
            <p style={{fontFamily:'Rajdhani',fontSize:'20px'}}>Lesson marked as complete!</p>
          </div>
        </div>
      ) : (
        <div className="container-fluid" style={{ padding: "25px" }}>
          <div className="col-lg-12 col-md-12 custom-container1">
            <Row gutter={16}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <div>
                  <label className="lesson">
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp; Mark This Lesson Complete
                  </label>
                </div>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <div>
                  <Button className="continue-btn" onClick={handleMarkComplete}>
                    Continue To Next Step
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment;
