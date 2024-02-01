import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Tabs,
  Button,
  Modal,
  Select,
  Input,
  Form,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import {
  HomeOutlined,
  LockOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import backgroundImage from "../../../../assets/img/cube_dark.jpg";
import Assignment from "./assignment/Assignment";
import { useDispatch, useSelector } from "react-redux";
import { getUserSection } from "../../../../actions/userSection/userSection";
import { getUserLesson } from "../../../../actions/userLesson/userLesson";
import {
  addUserScheduleCall,
  getUserSchdeduleCall,
} from "../../../../actions/userScheduleCall/userScheduleCall";
import Quiz from "./quiz/Quiz";
import Resources from "./resources/Resources";
import "./Lectures.css";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

const Lectures = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const section = useSelector((state) => state.userSection.sections);
  const call = useSelector((state) => state.userScheduleCall.call);
  const lesson = useSelector((state) => state.userLesson.lessons);
  const [course, setCourse] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({
    iframeUrl: null,
    embeddedCode: null,
  });
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [callData, setCallData] = useState([]);
  const [scheduleId, setScheduleId] = useState("");
  const [id, setId] = useState("");
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [lessonQuizs, setLessonQuizs] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [lessonFilesData, setLessonFilesData] = useState([]);
  const [lessonText, setLessonText] = useState([]);
  const [openMenuKeys, setOpenMenuKeys] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDropdownEnter = () => {
    setIsDropdownHovered(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownHovered(false);
  };

  const handleChange = (value) => {
    // console.log(value);
    setScheduleId(value);
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
  // console.log(lesson);

  useEffect(() => {
    if (adminId) {
      dispatch(getUserSchdeduleCall(adminId));
    }
  }, [dispatch, adminId]);

  useEffect(() => {
    if (courseId) {
      dispatch(getUserSection(courseId));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (section.data) {
      setCourse(section.data);
    }
  }, [section.data]);

  useEffect(() => {
    if (call.data) {
      setCallData(call.data);
    }
  }, [call.data]);

  // console.log(course)

  useEffect(() => {
    if (callData && callData.length > 0) {
      const firstSchedule = callData[0];

      form.setFieldsValue({
        month: firstSchedule.month,
        date: firstSchedule.date,
      });
    }
  }, [callData, form]);
  // console.log(section);

  const carouselStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Rajdhani",
    fontSize: "16px",
    marginTop: "10px",
  };

  const handleVideoClick = (video) => {
    // console.log(video);
    setSelectedVideo({
      iframeUrl: video.Iframe_URL,
      embeddedCode: video.embeddedVideoCode,
    });
    setActiveVideoId(video.id);
  };

  const handleLessonClick = (lessonId, lessonName) => {
    const selectedLesson = course.find((sec) =>
      sec.lessons.some((lesson) => lesson.id === lessonId)
    );
    setAdminId(selectedLesson.adminId);
    // console.log(selectedLesson);
    if (selectedLesson) {
      const firstVideo = selectedLesson.lessons[0]?.lessonVideos[0];
      // console.log(firstVideo);
      if (firstVideo) {
        setSelectedVideo({
          iframeUrl: firstVideo.Iframe_URL,
          embeddedCode: firstVideo.embeddedVideoCode,
        });
        setId(lessonId);
        setSelectedLesson(lessonName);
        setActiveVideoId(firstVideo.id);
        setCurrentSectionId(selectedLesson.id);
        setCurrentLessonId(null);
        setOpenMenuKeys([
          `${selectedLesson.id}`,
          `${lessonId}-${selectedLesson.lessonName}`,
        ]);
    
        // console.log("Current Section ID:", selectedLesson.id);
        // console.log("Current Lesson ID:", lessonId);
      }
    }
  };
  // console.log(adminId);

  useEffect(() => {
    if (course.length > 0) {
      const firstLesson = course[0]?.lessons[0];
      const lesson = firstLesson?.lessonName;
      if (lesson) {
        setSelectedLesson(lesson);
      }
      const firstVideo = firstLesson?.lessonVideos[0];
      if (firstVideo) {
        // setSelectedVideoUrl(firstVideo.Iframe_URL);
        setSelectedVideo({
          iframeUrl: firstVideo.Iframe_URL,
          embeddedCode: firstVideo.embeddedVideoCode,
        });
        setId(firstLesson.id);
        setAdminId(firstVideo.adminId);
        setActiveVideoId(firstVideo.id);
      }
    }
  }, [course]);

  useEffect(() => {
    if (id) {
      dispatch(getUserLesson(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (lesson.data) {
      setLessonQuizs(lesson.data.lessonQuizs);
      setAssignmentData(lesson.data.assignment);
      setLessonFilesData(lesson.data.lessonFiles);
      setLessonText(lesson.data.lessonTexts);
    }
  }, [lesson.data]);
  // console.log("id",scheduleId)

  useEffect(() => {
    setCurrentLessonId(id);
  }, [id]);



  const isLastLessonInCurrentSection = (lesson, lessonsInCurrentSection) => {
    const lessonIndex = lessonsInCurrentSection.findIndex(
      (l) => l.id === lesson.id
    );
    return lessonIndex === lessonsInCurrentSection.length - 1;
  };

  const findNextSection = (currentSectionIndex, sections) => {
    if (currentSectionIndex < sections.length - 1) {
      return sections[currentSectionIndex + 1];
    }
    return null;
  };

  const handleLessonComplete = () => {
    const nextLesson = findNextLesson();

    if (nextLesson) {
      console.log(nextLesson);

      const nextVideo = nextLesson.lessonVideos[0];

      setSelectedLesson(nextLesson.lessonName);
      setId(nextLesson.id);

      if (nextVideo) {
        setSelectedVideo({
          iframeUrl: nextVideo.Iframe_URL,
          embeddedCode: nextVideo.embeddedVideoCode,
        });
      } else {
        console.log("No next video for the next lesson");

        const isLastLessonInSection = isLastLessonInCurrentSection(
          nextLesson,
          course[currentSectionIndex].lessons
        );

        if (isLastLessonInSection) {
          const nextSection = findNextSection(currentSectionIndex);

          if (nextSection) {
            const firstLessonOfNextSection = nextSection.lessons[0];

            setSelectedLesson(firstLessonOfNextSection.lessonName);
            setId(firstLessonOfNextSection.id);

            const firstVideoOfNextSection =
              firstLessonOfNextSection.lessonVideos[0];

            if (firstVideoOfNextSection) {
              setSelectedVideo({
                iframeUrl: firstVideoOfNextSection.Iframe_URL,
                embeddedCode: firstVideoOfNextSection.embeddedVideoCode,
              });
            } else {
              console.log("No video for the first lesson of the next section");
            }
          } else {
            console.log("No next section");
          }
        }
      }
    } else {
      console.log("No next lesson");
    }
  };

  const findNextLesson = () => {
    const currentSection = course[currentSectionIndex];
    const currentLesson = currentSection.lessons[currentLessonIndex];

    if (currentLessonIndex < currentSection.lessons.length - 1) {
      // If there's another lesson in the current section, return it
      setCurrentLessonIndex(currentLessonIndex + 1);
      return currentSection.lessons[currentLessonIndex + 1];
    } else if (currentSectionIndex < course.length - 1) {
      // If there's another section, reset lesson index and return the first lesson of the next section
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentLessonIndex(0);
      return course[currentSectionIndex + 1].lessons[0];
    }

    return null;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={260}
        //   style={{
        //   ...carouselStyle,
        //   overflowY: 'auto',
        // }}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
        style={carouselStyle}
      >
        <Menu
          mode="inline"
          //  defaultSelectedKeys={["1"]}
          openKeys={isDropdownHovered ? openMenuKeys : []}
          onOpenChange={(keys) => setOpenMenuKeys(keys)}
          style={customMenuStyle}
          
        >
          {course?.map((sec) => (
            <Menu.SubMenu
              key={sec.id}
              icon={<LockOutlined />}
              className={currentSectionId === sec.id ? "active-section" : ""}
              title={sec.sectionName}
              style={customMenuItemStyle}
            >
              {sec.lessons.map((lesson) => (
                <Menu.SubMenu
                  key={lesson.id}
                  title={lesson.lessonName}
                  style={customMenuItemStyle}
                  open={isDropdownHovered && currentSectionId === sec.id}
                >
                  {lesson.lessonVideos.map((video, index) => (
                    <Menu.Item
                      key={video.id}
                      className={`${index === 0 ? "first-video-hover" : ""} ${
                        currentLessonId === lesson.id ? "active-lesson" : ""
                      }`}
                      style={{
                        ...customMenuItemStyle,
                        backgroundColor:
                          activeVideoId === video.id ? "#ddb42c" : "",
                      }}
                      onClick={() => handleVideoClick(video)}
                    >
                      <span
                        onClick={() =>
                          handleLessonClick(lesson.id, lesson.lessonName)
                        }
                      >
                        {" "}
                        {video.videoName}
                      </span>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu.SubMenu>
          ))}

          <div className="demo-logo-vertical" />
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div style={{ padding: "10px", background: "#fff" }}>
            <div className="header-container">
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: "Rajdhani",
                  padding: 0,
                  margin: 0,
                }}
              >
                {selectedLesson}
              </p>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/user/my-courses">
                    <HomeOutlined />
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{selectedLesson}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          {/* <div className="day-container rows" style={{ margin: "0px" }}>
            <div className="col-lg-8 col-md-8">
              {selectedVideo?.iframeUrl && (
                <iframe
                  width="97%"
                  height="400"
                  src={selectedVideo.iframeUrl}
                  title="Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
              {selectedVideo?.embeddedCode && (
                <div className="embedded-code-container">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedVideo.embeddedCode,
                    }}
                  />
                </div>
              )}
            </div>

            {assignmentData?.length > 0 &&
            assignmentData[0].assignmentType === "SCHEDULE CALL" ? (
              <>
                <div className="col-lg-4 col-md-4 custom-background">
                  <div className="text-overlay">
                    <h2>Attention</h2>
                    <p>Claim Your Free Bonus Scripts and Templates!</p>
                    <p>
                      Click The Button and Schedule Your Business Plan Call with
                      an Advisor Right Now!
                    </p>
                    <Button
                      type="submit"
                      className="booking-btn"
                      onClick={showModal}
                    >
                      Schedule Now
                    </Button>
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
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Form.Item
                            label="Month"
                            name="month"
                            rules={[
                              {
                                required: true,
                                message: "Please select a month",
                              },
                            ]}
                          >
                            <Input placeholder="Month" disabled />
                          </Form.Item>
                          <Form.Item
                            label="Date"
                            name="date"
                            rules={[
                              {
                                required: true,
                                message: "Please select a date",
                              },
                            ]}
                          >
                            <Input placeholder="Date" disabled />
                          </Form.Item>
                          <Form.Item
                            label="Select Timing"
                            name="selectTiming"
                            rules={[
                              {
                                required: true,
                                message: "Please select a timing",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select time intervals"
                              value={scheduleId}
                              onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              {callData?.map((timeInterval) => (
                                <Option
                                  key={timeInterval.id}
                                  value={timeInterval.id}
                                >
                                  {timeInterval.timing}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Form>
                      )}
                    </Modal>
                  </div>
                </div>
              </>
            ) : null}
          </div> */}

          <div className="day-container rows" style={{ margin: "0px" }}>
            <div
              className={
                assignmentData?.length > 0 &&
                assignmentData[0].assignmentType === "SCHEDULE CALL"
                  ? "col-lg-8 col-md-8"
                  : "col-lg-12 col-md-12"
              }
            >
              {selectedVideo?.iframeUrl && (
                <iframe
                  width="100%"
                  height="400"
                  src={selectedVideo.iframeUrl}
                  title="Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
              {selectedVideo?.embeddedCode && (
                <div className="embedded-code-container">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedVideo.embeddedCode,
                    }}
                  />
                </div>
              )}
            </div>

            {assignmentData?.length > 0 &&
            assignmentData[0].assignmentType === "SCHEDULE CALL" ? (
              <>
                <div className="col-lg-4 col-md-4 custom-background">
                  <div className="text-overlay">
                    <h2>Attention</h2>
                    <p>Claim Your Free Bonus Scripts and Templates!</p>
                    <p>
                      Click The Button and Schedule Your Business Plan Call with
                      an Advisor Right Now!
                    </p>
                    <Button
                      type="submit"
                      className="booking-btn"
                      onClick={showModal}
                    >
                      Schedule Now
                    </Button>
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
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Form.Item
                            label="Month"
                            name="month"
                            rules={[
                              {
                                required: true,
                                message: "Please select a month",
                              },
                            ]}
                          >
                            <Input placeholder="Month" disabled />
                          </Form.Item>
                          <Form.Item
                            label="Date"
                            name="date"
                            rules={[
                              {
                                required: true,
                                message: "Please select a date",
                              },
                            ]}
                          >
                            <Input placeholder="Date" disabled />
                          </Form.Item>
                          <Form.Item
                            label="Select Timing"
                            name="selectTiming"
                            rules={[
                              {
                                required: true,
                                message: "Please select a timing",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select time intervals"
                              value={scheduleId}
                              onChange={handleChange}
                              style={{ width: "100%" }}
                            >
                              {callData?.map((timeInterval) => (
                                <Option
                                  key={timeInterval.id}
                                  value={timeInterval.id}
                                >
                                  {timeInterval.timing}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Form>
                      )}
                    </Modal>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div style={{ padding: "20px" }}>
            <Tabs
              defaultActiveKey="1"
              renderTabBar={(props, DefaultTabBar) => {
                return <DefaultTabBar {...props} />;
              }}
            >
              {lessonQuizs.length > 0 && (
                <TabPane
                  tab={
                    <span>
                      <AppleOutlined />
                      Quiz
                    </span>
                  }
                  key="1"
                >
                  {id && <Quiz lessonId={id} />}
                </TabPane>
              )}
              {lessonFilesData.length > 0 && (
                <TabPane
                  tab={
                    <span>
                      <AndroidOutlined />
                      Resources
                    </span>
                  }
                  key="2"
                >
                  {id && <Resources lessonId={id} />}
                </TabPane>
              )}
              {(assignmentData.length > 0 || lessonText.length > 0) && (
                <TabPane
                  tab={
                    <span>
                      <WindowsOutlined />
                      Assignment
                    </span>
                  }
                  key="3"
                >
                  {id && courseId && (
                    <Assignment
                      lessonId={id}
                      courseId={courseId}
                      adminId={adminId}
                      onLessonComplete={handleLessonComplete}
                    />
                  )}
                </TabPane>
              )}
            </Tabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lectures;
