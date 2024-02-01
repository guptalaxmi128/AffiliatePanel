import React, { useState, useEffect } from "react";
import { Button, Row, Col, Upload, message, Modal, Image, Input } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  EyeOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import previewImg from "../../../assets/img/no-image.png";
import "./Setup.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSectionById } from "../../../actions/section/section";
import {
  addCourseImage,
  publishCourse,
  getCourse,
  unPublishCourse,
  getCourseById,
  updateCourse,
} from "../../../actions/course/course";

const Setup = ({ courseId }) => {
  const dispatch = useDispatch();
  const section = useSelector((state) => state.section.sectionById);
  // console.log("SetUpComponent",courseId)
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sections, setSections] = useState([]);
  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [url, setUrl] = useState('');

  const course = useSelector((state) => state.course.course);
  const courseById = useSelector((state) => state.course.courseById);
  // console.log(courseById);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [dispatch]);

  useEffect(() => {
    if (courseById.data) {
      setEditedTitle(courseById.data.title);
    }
  }, [courseById.data]);

  useEffect(() => {
    if (course.data) {
      setCourses(course.data);
    }
  }, [course.data]);

  const beforeUpload = (file) => {
    setSelectedImage(URL.createObjectURL(file));
    setImage(file);
    return false;
  };
  
  const handleUpload = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("courseId", courseId);
        formData.append("courseImage", image);
  
        const res = await dispatch(addCourseImage(formData));
      // console.log(res)
        if (res.success) {
          message.success(res.message);
          setModalVisible(false);
        } else {
          message.error(res.message);
        }
      } else {
        message.error("No image selected");
      }
    } catch (error) {
      console.error("An error occurred during image upload:", error);
      message.error(error.response.data.message);
    }
  };
  // const handleUpload = async () => {
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "myCloud");
  //   data.append("cloud_name", "dbrdiwzr5");

  //   try {
  //     if(image === null){
  //       return message.error("Please Upload image")
  //     }

  //     const res = await fetch('https://api.cloudinary.com/v1_1/dbrdiwzr5/image/upload',{
  //       method : "POST",
  //       body : data
  //     })

  //     const cloudData = await res.json();
  //     setUrl(cloudData.url);
  //     console.log(cloudData.url);
  //     message.success("Image Upload Successfully")
  //     setModalVisible(false);
  //   } catch (error) {
      
  //   }
  // }

  // const handleUpload = async () => {
  //   try {
  //     // Step 1: Upload to Cloudinary
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "myCloud");
  //     data.append("cloud_name", "dbrdiwzr5");
  
  //     if (image === null) {
  //       return message.error("Please Upload image");
  //     }
  
  //     const cloudRes = await fetch(
  //       "https://api.cloudinary.com/v1_1/dbrdiwzr5/image/upload",
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     );
  
  //     const cloudData = await cloudRes.json();
  //     const imageUrl = cloudData.url;
  //     console.log("Cloudinary URL:", imageUrl);
  
  //     setUrl(imageUrl); // Assuming you want to set the URL in your component state
  
  //     // Step 2: Save to Database
  //     if (selectedImage) {
  //       const formData = new FormData();
  //       formData.append("courseId", courseId);
  //       formData.append("courseImage", image); // Use the Cloudinary URL here
  
  //       // Dispatch your Redux action
  //       const res = await dispatch(addCourseImage(formData));
  //       console.log(res);
  
  //       // Example: Handle success or failure based on the Redux response
  //       if (res.success) {
  //         message.success(res.message);
  //         setModalVisible(false);
  //       } else {
  //         message.error(res.message);
  //       }
  //     } else {
  //       message.error("No image selected");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during image upload:", error);
  //     // Handle errors here
  //     message.error(error.response.data.message);
  //   }
  // };
  

  useEffect(() => {
    dispatch(getSectionById(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (section.data) {
      setSections(section.data);
    }
  }, [section.data]);

  const handlePublishClick = (course) => {
    if (course.isPublic) {
      dispatch(unPublishCourse(course.id)).then((res) => {
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    } else {
      dispatch(publishCourse(course.id)).then((res) => {
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const data = {
        id: courseId,
        title: editedTitle,
      };

      const res = await dispatch(updateCourse(data));

      if (res.success) {
        message.success(res.message);
        setIsEditing(false);
      } else {
        message.error(
          res.message || "An error occurred while updating the course."
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setEditedTitle(e.target.value);
  };

  return (
    <div className="setup">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Course setup</h2>
        {courses.map((course) => {
          if (course.id === courseId) {
            return (
              <Button
                className={`setup-btn ${course.isPublic ? "published" : ""}`}
                onClick={() => handlePublishClick(course)}
                key={course.id}
              >
                {course.isPublic ? "Published" : "Publish your course"}
              </Button>
            );
          }
          return null;
        })}
      </div>
      <div className="setup-subcontainer">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <h3>Create your curriculum</h3>
            <div className="col-content1">
              <div style={{ display: "flex" }}>
                <Col xs={12} sm={8} md={6} lg={10}>
                  <p>Curriculum Preview</p>
                </Col>
                <Col>
                  {isMobile ? (
                    <EyeOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    <Button style={{ fontFamily: "Rajdhani" }}>
                      <EyeOutlined style={{ fontSize: "20px" }} /> Preview
                      Curriculum
                    </Button>
                  )}
                </Col>
                <Col>
                  {isMobile ? (
                    <Link to={`/get-course/courses/${courseId}`}>
                      <Button style={{ fontFamily: "Rajdhani" }}>
                        <EditOutlined style={{ fontSize: "20px" }} />
                        Edit
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/get-course/courses/${courseId}`}>
                      <Button style={{ fontFamily: "Rajdhani" }}>
                        <EditOutlined style={{ fontSize: "20px" }} /> Edit
                        Curriculum
                      </Button>
                    </Link>
                  )}
                </Col>
              </div>
              <div className="col-subcontent1">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h5>{section.sectionName}</h5>
                    <div className="setup-divider"></div>
                    {section.lessons.map((lesson, lessonIndex) => (
                      <Link to={`/lesson/${lesson.id}`} key={lessonIndex}>
                        <p>{lesson.lessonName}</p>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <h3>Customize your course</h3>
            <div className="col-content2">
              <div className="col-subcontent2">
                <h5>Course Title</h5>
                {isEditing ? (
                  <>
                    <Button onClick={handleCancelClick}>Cancel </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEditClick}
                    style={{ fontFamily: "Rajdhani" }}
                  >
                    <EditOutlined style={{ fontSize: "20px" }} /> Edit Title
                  </Button>
                )}
              </div>
              {isEditing ? (
                <div style={{ padding: "10px" }}>
                  <Input
                    value={editedTitle}
                    onChange={handleInputChange}
                    style={{ fontFamily: "Rajdhani" }}
                  />
                  <Button
                    onClick={handleSaveClick}
                    style={{ marginTop: "8px" }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <p>{editedTitle}</p>
              )}
            </div>
            <div className="col-content3">
              <div className="thumbnail">
                <h5>Thumbnail</h5>
                <Button
                  style={{ fontFamily: "Rajdhani" }}
                  onClick={() => setModalVisible(true)}
                >
                  <PlusCircleOutlined style={{ fontSize: "20px" }} />
                  Add an image
                </Button>
              </div>
              {selectedImage ? (
                <div className="selected-image">
                  <Image
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      marginTop: "15px",
                    }}
                    src={selectedImage}
                  />
                </div>
              ) : (
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    marginTop: "15px",
                  }}
                  src={previewImg}
                />
              )}
              <Modal
                title="Upload Image"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                  <Button key="reset" onClick={() => setSelectedImage(null)}>
                    Reset
                  </Button>,
                  <Button
                    key="upload"
                    className="course-image-btn"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>,
                ]}
              >
                <Upload
                  customRequest={() => {}}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "80vh",
                      objectFit: "contain",
                      marginTop: "15px",
                    }}
                  />
                )}
              </Modal>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Setup;
