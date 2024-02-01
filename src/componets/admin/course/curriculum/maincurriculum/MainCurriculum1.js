import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Space, message, Menu, Dropdown } from "antd";
import {
  PlusCircleOutlined,
  MoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./MainCurriculum.css";
import {
  addSection,
  deleteSection,
  getSectionById,
  publishSection,
  unPublishSection,
  updateSection,
} from "../../../../../actions/section/section";
import {
  addLessons,
  deleteLesson,
  publishLesson,
  unPublishLesson,
  updateLesson,
} from "../../../../../actions/lesson/lesson";

const MainCurriculum1 = ({ courseId }) => {
  const dispatch = useDispatch();
  const section = useSelector((state) => state.section.sectionById);

  const [sections, setSections] = useState([]);
  const [newLesson, setNewLesson] = useState("");
  const [newSections, setNewSections] = useState([]);
  const [addingLessonInSection, setAddingLessonInSection] = useState(-1);
  const [addingLessonInNewSection, setAddingLessonInNewSection] = useState(-1);
  const [publishedSections, setPublishedSections] = useState([]);
  const [editingLessonIndex, setEditingLessonIndex] = useState(-1);
  const [editingSectionIndex, setEditingSectionIndex] = useState(-1);
  // const [publishedLessons, setPublishedLessons] = useState([]);

  useEffect(() => {
    setPublishedSections(new Array(sections.length).fill(false));
  }, [sections]);

  useEffect(() => {
    dispatch(getSectionById(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (section.data) {
      setSections(section.data);
    }
  }, [section.data]);

  const addLesson = (sectionIndex) => {
    setAddingLessonInSection(sectionIndex);
  };

  //   const addNewLesson = (newSectionIndex) => {
  //     setAddingLessonInNewSection(newSectionIndex);
  //   };

  const addNewLesson = (newSectionIndex) => {
    if (newSectionIndex !== -1) {
      const newLessonId = uuidv4();
      const newLessonItem = { id: newLessonId, name: newLesson };
      const updatedNewSections = [...newSections];
      updatedNewSections[newSectionIndex].lessons.push(newLessonItem);
      setNewSections(updatedNewSections);
      setNewLesson("");
    }
  };

  const cancelAddLesson = () => {
    setAddingLessonInSection(-1);
    setNewLesson("");
  };

  const cancelAddNewLesson = () => {
    setAddingLessonInNewSection(-1);
    setNewLesson("");
  };

  const removeSection = (sectionToRemove) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionToRemove.id
    );
    setSections(updatedSections);
  };

  const removeNewSection = (index) => {
    const updatedNewSections = [...newSections];
    updatedNewSections.splice(index, 1);
    setNewSections(updatedNewSections);
  };

  const menu = (id, handleSectionClick) => (
    <Menu onClick={handleSectionClick(id)}>
      <Menu.Item key="1" onClick={() => handleRenameSectionClick(id)}>
        Rename section
      </Menu.Item>
      <Menu.Item key="2">Duplicate section</Menu.Item>
      <Menu.Item key="3">Delete section</Menu.Item>
    </Menu>
  );

  const handleRenameSectionClick = (sectionId) => {
    setEditingSectionIndex(sectionId);
  };

  const handleSectionNameChange = (e, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionName = e.target.value;
    setSections(updatedSections);
  };

  const cancelRenameSection = () => {
    setEditingSectionIndex(-1);
  };

  const saveRenamedSection = async (sectionId, sectionIndex) => {
    try {
      const updatedSections = [...sections];
      const newSectionName = updatedSections[sectionIndex].sectionName.trim();

      if (!newSectionName) {
        message.error("Section name is required.");
        return;
      }

      const sectionInfo = {
        sectionName: newSectionName,
        id: sectionId,
      };

      const res = await dispatch(updateSection(sectionInfo));

      if (res.success) {
        updatedSections[sectionIndex].sectionName = newSectionName;
        setSections(updatedSections);
        setEditingSectionIndex(-1);
        message.success(res.message);
      } else {
        message.error("Failed to update section name. Please try again.");
      }
    } catch (error) {
      console.error("Error updating section name:", error);
      message.error(
        "An error occurred while updating the section name. Please try again."
      );
    }
  };

  const handleSectionClick = (id) => async (e) => {
    try {
      switch (e.key) {
        case "1":
          // Handle Rename Section
          break;
        case "2":
          duplicateSection(id);
          break;
        case "3":
          console.log("Section ID:", id);
          const res = await dispatch(deleteSection(id));
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

  const menu2 = (id, handleMenuClick) => (
    <Menu onClick={handleMenuClick(id)}>
      <Menu.Item key="1" onClick={() => handleRenameLessonClick(id)}>
        Rename Lesson
      </Menu.Item>
      <Menu.Item key="2">Duplicate Lesson</Menu.Item>
      <Menu.Item key="3">Delete Lesson</Menu.Item>
    </Menu>
  );

  const handleRenameLessonClick = (lessonId) => {
    setEditingLessonIndex(lessonId);
  };
  const handleMenuClick = (id) => async (e) => {
    try {
      switch (e.key) {
        case "1":
          // Handle Rename Lesson
          break;
        case "2":
          // Handle Duplicate Lesson
          break;
        case "3":
          // console.log("Lesson ID:", id);
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

  const menu1 = (index, isPublish) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => handleQuickActionClick(index, isPublish)}
      >
        <span
          style={{ color: isPublish ? "green" : "red", fontFamily: "Rajdhani" }}
        >
          {isPublish ? "Published" : "Publish Now"}
        </span>
      </Menu.Item>
    </Menu>
  );

  const handleQuickActionClick = (index, isPublished) => {
    console.log("isPublish:", isPublished);
    const updatedPublishedSections = [...publishedSections];
    updatedPublishedSections[index] = !isPublished;
    setPublishedSections(updatedPublishedSections);
    dispatch(
      isPublished ? unPublishSection(index) : publishSection(index)
    ).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const addNewSection = () => {
    const newSection = {
      id: uuidv4(),
      sectionName: "",
      lessons: [],
    };
    setNewSections([...newSections, newSection]);
  };

  const handleNewSectionNameChange = (e, index) => {
    const updatedNewSections = [...newSections];
    updatedNewSections[index].sectionName = e.target.value;
    setNewSections(updatedNewSections);
  };

  const saveLesson = (sectionIndex, courseId) => {
    if (newLesson && sectionIndex !== -1) {
      const newLessonId = uuidv4();
      const newLessonItem = { id: newLessonId, name: newLesson };
      const updatedSections = [...sections];
      const targetSection = updatedSections[sectionIndex];

      if (!newLessonItem.name) {
        message.error("Lesson name is required.");
        return;
      }

      const lessonInfo = {
        lessonName: newLessonItem.name,
        courseId: courseId,
        sectionId: targetSection.id,
      };

      dispatch(addLessons(lessonInfo));
      message.success("lesson added successfully!");
      targetSection.lessons.push(newLessonItem);
      setSections(updatedSections);
      setNewLesson("");
      setAddingLessonInSection(-1);
    }
  };

  const saveNewLesson = (newSectionIndex, courseId) => {
    if (newLesson && newSectionIndex !== -1) {
      const newLessonId = uuidv4();
      const newLessonItem = { id: newLessonId, name: newLesson };
      const updatedNewSections = [...newSections];
      updatedNewSections[newSectionIndex].lessons.push(newLessonItem);
      setNewSections(updatedNewSections);
      setNewLesson("");
      setAddingLessonInNewSection(-1);

      if (newLessonItem.name) {
        message.error("Lesson name is required.");
        return;
      }
      const sectionId = updatedNewSections[newSectionIndex].id;
      dispatch(addLesson(courseId, sectionId, newLessonItem.name));
      message.success("lesson added successfully!");
    }
  };

  const removeLesson = (lessonId, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons = updatedSections[
      sectionIndex
    ].lessons.filter((lesson) => lesson.id !== lessonId);
    setSections(updatedSections);
  };

  const handleSaveNewSection = () => {
    let newSectionData = {};
    newSections.forEach((newSection) => {
      const sectionName = newSection.sectionName.trim();
      if (sectionName !== "") {
        newSectionData = {
          sectionName: sectionName,
          courseId: courseId,
        };
      }
    });
    if (Object.keys(newSectionData).length === 0) {
      message.error("No new sections to save.");
      return;
    }
    dispatch(addSection(newSectionData));
    message.success("Section created successfully!");
    setNewSections([]);
  };

  // Define a function to remove a new lesson from a new section
  const removeNewLesson = (lessonId, sectionIndex) => {
    const updatedNewSections = [...newSections];
    updatedNewSections[sectionIndex].lessons = updatedNewSections[
      sectionIndex
    ].lessons.filter((lesson) => lesson.id !== lessonId);
    setNewSections(updatedNewSections);
  };

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
  // console.log(sections);

  const handleLessonNameChange = (e, sectionIndex, lessonIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons[lessonIndex].name = e.target.value;
    setSections(updatedSections);
  };

  const cancelRenameLesson = () => {
    setEditingLessonIndex(-1);
  };

  const saveRenamedLesson = async (lessonId, sectionIndex, lessonIndex) => {
    try {
      const updatedSections = [...sections];
      const newLessonName =
        updatedSections[sectionIndex].lessons[lessonIndex].name.trim();
      const lessonInfo = {
        lessonName: newLessonName,
        id: lessonId,
      };

      const res = await dispatch(updateLesson(lessonInfo));

      if (res.success) {
        updatedSections[sectionIndex].lessons[lessonIndex].name = newLessonName;
        setSections(updatedSections);
        setEditingLessonIndex(-1);
        message.success(res.message);
      } else {
        message.error("Failed to update lesson name. Please try again.");
      }
    } catch (error) {
      console.error("Error updating lesson name:", error);
      message.error(
        "An error occurred while updating the lesson name. Please try again."
      );
    }
  };

  const duplicateSection = (id) => {
    const duplicatedSection = sections.find((section) => section.id === id);
    console.log(duplicatedSection);

    if (duplicatedSection) {
      // Create a copy of the section with a new ID
      const newSection = {
        ...duplicatedSection,
        id: uuidv4(),
        sectionName: `${duplicatedSection.sectionName} Copy`, // Modify the section name as needed
      };

      // Update the state with the duplicated section
      const updatedSections = [...sections, newSection];
      console.log(updatedSections);
      setSections(updatedSections);
      setEditingSectionIndex(newSection.id);
      // dispatch(updateSection(updatedSections));

      message.success("Section duplicated successfully!");
    }
  };
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedSections = [...sections];
      const sectionIndex = source.index;
      const destinationIndex = destination.index;
      const [removedSection] = reorderedSections.splice(sectionIndex, 1);
      reorderedSections.splice(destinationIndex, 0, removedSection);
      return setSections(reorderedSections);
    }
    // console.log({destination,source})
    const sectionSourceIndex = sections.findIndex(
      (sections) => sections.id === source.droppableId
    );
    const sectionDestinationIndex = sections.findIndex(
      (sections) => sections.id === destination.droppableId
    );
    const newSourceItems = [...sections[sectionSourceIndex].lessons];
    const newDestinationItems =
      source.droppableId !== destination.droppableProps
        ? [...sections[sectionDestinationIndex].lessons]
        : newSourceItems;

    const [deletedSections] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedSections);
    const newSections = [...sections];
    newSections[sectionSourceIndex] = {
      ...sections[sectionSourceIndex],
      lessons: newSourceItems,
    };
    newSections[sectionDestinationIndex] = {
      ...sections[sectionDestinationIndex],
      lessons: newDestinationItems,
    };
    setSections(newSections);

  };

  return (
    <div className="main-curriculum">
      <h2>Curriculum</h2>
      <div style={{ marginTop: "20px" }}>
        <Space>
          <Button style={{ fontFamily: "Rajdhani" }}>Bulk Edit</Button>
          <Button style={{ fontFamily: "Rajdhani" }}>Import Content</Button>
        </Space>
      </div>

      <DragDropContext onDragEnd={handleDragDrop}>
        <div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {" "}
                {sections.map((section, sectionIndex) => (
                  <Draggable
                    draggableId={section.id}
                    key={section.id}
                    index={sectionIndex}
                  >
                    {(provided) => (
                      <div
                        key={section.id}
                        className="new-section-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Droppable droppableId={section.id}>
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {editingSectionIndex === section.id ? (
                                <div className="input-container">
                                  <Col lg={18} xs={24} sm={12}>
                                    <Input
                                      value={section.sectionName}
                                      onChange={(e) =>
                                        handleSectionNameChange(e, sectionIndex)
                                      }
                                    />
                                  </Col>
                                  <Space className="btn-container">
                                    <Button
                                      type="default"
                                      style={{
                                        fontFamily: "Rajdhani",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => cancelRenameSection()}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      className="save-btn"
                                      onClick={() =>
                                        saveRenamedSection(
                                          section.id,
                                          sectionIndex
                                        )
                                      }
                                    >
                                      Save
                                    </Button>
                                  </Space>
                                </div>
                              ) : (
                                <>
                                  <div className="quick-actions-container">
                                    <Col lg={12} xs={10} sm={12}>
                                      <h3>{section.sectionName}</h3>
                                    </Col>
                                    &nbsp;&nbsp;
                                    <Dropdown
                                      overlay={menu1(
                                        section.id,
                                        section.isPublic
                                      )}
                                      trigger={["click"]}
                                    >
                                      <Button className="quick-action-btn">
                                        Quick Action <DownOutlined />
                                      </Button>
                                    </Dropdown>
                                    &nbsp;&nbsp;
                                    <Dropdown
                                      overlay={menu(
                                        section.id,
                                        handleSectionClick
                                      )}
                                      trigger={["click"]}
                                    >
                                      <Button icon={<MoreOutlined />} />
                                    </Dropdown>
                                  </div>
                                </>
                              )}

                              <div className="divider"></div>

                              {section.lessons.map((lesson, lessonIndex) => (
                                <Draggable
                                  draggableId={lesson.id}
                                  index={lessonIndex}
                                  key={lesson.id}
                                >
                                  {(provided) => (
                                    <div
                                      className="container1"
                                      key={lesson.id}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                      ref={provided.innerRef}
                                    >
                                      {editingLessonIndex === lesson.id ? (
                                        <div className="right-container">
                                          <div className="input-container">
                                            <Col lg={18} xs={24} sm={12}>
                                              <Input
                                                value={lesson.name}
                                                onChange={(e) =>
                                                  handleLessonNameChange(
                                                    e,
                                                    sectionIndex,
                                                    lessonIndex
                                                  )
                                                }
                                              />
                                            </Col>
                                            <Space className="btn-container">
                                              <Button
                                                type="default"
                                                style={{
                                                  fontFamily: "Rajdhani",
                                                  fontSize: "16px",
                                                }}
                                                onClick={() =>
                                                  cancelRenameLesson()
                                                }
                                              >
                                                Cancel
                                              </Button>
                                              <Button
                                                className="save-btn"
                                                onClick={() =>
                                                  saveRenamedLesson(
                                                    lesson.id,
                                                    sectionIndex,
                                                    lessonIndex
                                                  )
                                                }
                                              >
                                                Save
                                              </Button>
                                            </Space>
                                          </div>
                                        </div>
                                      ) : (
                                        // Quick actions for the lesson
                                        <div className="right-container">
                                          <div className="input-container">
                                            <Row gutter={[16, 16]}>
                                              <Col lg={12} xs={22} sm={18}>
                                                <Link
                                                  to={`/lesson/${lesson.id}`}
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                >
                                                  <h3>{lesson.lessonName}</h3>
                                                </Link>
                                                <Link
                                                  to={`/lesson/${lesson.id}`}
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                >
                                                  <h3>{lesson.name}</h3>
                                                </Link>
                                              </Col>
                                              <Col lg={12} xs={20} sm={6}>
                                                <Space>
                                                  <Link
                                                    to={`/lesson/${lesson.id}`}
                                                  >
                                                    <Button type="default">
                                                      Add Content
                                                    </Button>
                                                  </Link>
                                                  {lesson.isPublic ? (
                                                    <Button
                                                      type="default"
                                                      style={{
                                                        borderColor: "green",
                                                        color: "green",
                                                      }}
                                                      onClick={() =>
                                                        handleUnpublishClick(
                                                          lesson.id
                                                        )
                                                      }
                                                    >
                                                      Published
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      type="default"
                                                      style={{
                                                        borderColor: "red",
                                                        color: "red",
                                                      }}
                                                      onClick={() =>
                                                        handlePublishClick(
                                                          lesson.id
                                                        )
                                                      }
                                                    >
                                                      Publish Now
                                                    </Button>
                                                  )}
                                                  <Dropdown
                                                    overlay={() =>
                                                      menu2(
                                                        lesson.id,
                                                        handleMenuClick
                                                      )
                                                    }
                                                    trigger={["click"]}
                                                  >
                                                    <Button
                                                      icon={<MoreOutlined />}
                                                    />
                                                  </Dropdown>
                                                </Space>
                                              </Col>
                                            </Row>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}

                              {provided.placeholder}
                              {addingLessonInSection === sectionIndex ? (
                                <div
                                  className="container1"
                                  style={{
                                    paddingLeft: "0px",
                                    paddingRight: "0px",
                                  }}
                                >
                                  <div className="right-container">
                                    <div className="input-container">
                                      <Col lg={18} xs={24} sm={12}>
                                        <Input
                                          placeholder="New Lesson"
                                          value={newLesson}
                                          onChange={(e) =>
                                            setNewLesson(e.target.value)
                                          }
                                        />
                                      </Col>
                                      <Space className="btn-container">
                                        <Button
                                          type="default"
                                          style={{
                                            fontFamily: "Rajdhani",
                                            fontSize: "16px",
                                          }}
                                          onClick={cancelAddLesson}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          className="save-btn"
                                          onClick={() =>
                                            saveLesson(sectionIndex, courseId)
                                          }
                                        >
                                          Save
                                        </Button>
                                      </Space>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Button
                                  type="default"
                                  style={{
                                    fontFamily: "Rajdhani",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => addLesson(sectionIndex)}
                                >
                                  New Lesson
                                </Button>
                              )}
                              <Space style={{ marginTop: "10px" }}>
                                <Button
                                  type="default"
                                  style={{ fontFamily: "Rajdhani" }}
                                >
                                  Bulk Upload
                                </Button>
                              </Space>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {newSections.map((newSection, index) => (
        <div key={newSection.id} className="new-section-container">
          <div className="input-container">
            <Col lg={18} xs={24} sm={12}>
              <Input
                placeholder="New Section"
                value={newSection.sectionName}
                onChange={(e) => handleNewSectionNameChange(e, index)}
              />
            </Col>
            <Space className="btn-container">
              <Button
                type="default"
                style={{ fontFamily: "Rajdhani", fontSize: "16px" }}
                onClick={() => removeNewSection(index)}
              >
                Cancel
              </Button>
              <Button className="save-btn" onClick={handleSaveNewSection}>
                Save
              </Button>
            </Space>
          </div>
          <div className="divider"></div>
          {newSection.lessons.map((lesson, lessonIndex) => (
            <div key={lesson.id} className="lesson-container">
              <span>{lesson.name}</span>
              <Space>
                <Button type="default">Add Content</Button>
                <Button type="default">Publish</Button>
                <Dropdown overlay={menu2} trigger={["click"]}>
                  <Button icon={<MoreOutlined />} />
                </Dropdown>
              </Space>
            </div>
          ))}
          {addingLessonInNewSection === index ? (
            <div className="input-container">
              <Col lg={18} xs={24} sm={12}>
                <Input
                  placeholder="New Lesson"
                  value={newLesson}
                  onChange={(e) => setNewLesson(e.target.value)}
                />
              </Col>
              <Space className="btn-container">
                <Button
                  type="default"
                  style={{ fontFamily: "Rajdhani", fontSize: "16px" }}
                  onClick={cancelAddNewLesson}
                >
                  Cancel
                </Button>
                <Button
                  className="save-btn"
                  onClick={() => saveNewLesson(index, courseId)}
                >
                  Save
                </Button>
              </Space>
            </div>
          ) : (
            <Button
              type="default"
              style={{ fontFamily: "Rajdhani", marginRight: "10px" }}
              onClick={() => addNewLesson(index)}
            >
              New Lesson
            </Button>
          )}
          <Space style={{ marginTop: "10px" }}>
            <Button type="default" style={{ fontFamily: "Rajdhani" }}>
              Bulk Upload
            </Button>
          </Space>
        </div>
      ))}

      <div className="new-section">
        <Row gutter={16}>
          <Col lg={12} xs={24} sm={12}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PlusCircleOutlined
                style={{ fontSize: "24px", marginRight: "8px" }}
                onClick={addNewSection}
              />
              <span>Add New Section</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainCurriculum1;
