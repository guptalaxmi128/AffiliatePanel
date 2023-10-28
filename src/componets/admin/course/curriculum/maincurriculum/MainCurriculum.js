import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Space, Menu, Dropdown, message } from "antd";
import {
  PlusCircleOutlined,
  MoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./MainCurriculum.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const DraggableSection = ({
  section,
  onRemove,

  sectionIndex,
  sections,
  setSections,
  sectionName,
  setSectionName,
  lessons,
  setLessons,
}) => {
  const [isQuickActionsActive, setIsQuickActionsActive] = useState(false);
  const [newLesson, setNewLesson] = useState("");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newLessonName, setNewLessonName] = useState("");

  const addLesson = () => {
    if (newLesson) {
      // Generate a unique ID for the new lesson
      const newLessonId = lessons.length + 1;

      // Create the new lesson object
      const newLessonItem = { id: newLessonId, name: newLesson };

      // Add the new lesson to the lessons array
      setLessons([...lessons, newLessonItem]);

      // Reset the input and the adding lesson state
      setNewLesson("");
    }
    setIsAddingLesson(false);
  };

  const handleSave = () => {
    setIsQuickActionsActive(true);
  };

  const handleRename = () => {
    setIsQuickActionsActive(false);
  };

  const handleCancel = () => {
    setIsQuickActionsActive(false);
  };

  const handlePublishAll = () => {};

  // const handleDuplicate = () => {
  //   const duplicatedSection = JSON.parse(JSON.stringify(section));
  //   duplicatedSection.name = `${section.name} Copy`;
  //   const duplicatedLessons = section.lessons.map((lesson) => `${lesson} Copy`);
  //   duplicatedSection.lessons = duplicatedLessons;
  //   setSections([...sections, duplicatedSection]);
  // };

  const handleDuplicate = () => {
    const duplicatedSection = JSON.parse(JSON.stringify(section));
    duplicatedSection.name = `${section.name} Copy`;

    // Create an array to hold the duplicated lessons with unique IDs
    const duplicatedLessons = section.lessons.map((lesson, index) => ({
      id: uuidv4(), // Assign unique IDs
      name: `${lesson.name} Copy`, // Duplicate lesson names
    }));

    duplicatedSection.lessons = duplicatedLessons;
    setSections([...sections, duplicatedSection]);
  };

  const handleDelete = () => {
    message.success("Section deleted");
    onRemove(section);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleRename}>
        Rename section
      </Menu.Item>
      <Menu.Item key="2" onClick={handleDuplicate}>
        Duplicate section
      </Menu.Item>
      <Menu.Item key="3" onClick={handleDelete}>
        Delete section
      </Menu.Item>
    </Menu>
  );

  const menu1 = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={handlePublishAll}
        disabled={lessons.length === 0}
      >
        Publish All
      </Menu.Item>
    </Menu>
  );

  // const handleDuplicateLessonClick = (lessonIndex) => {
  //   const lessonToDuplicate = lessons[lessonIndex].name;
  //   const duplicatedLesson = lessonToDuplicate + " Copy";
  //   setLessons([...lessons, duplicatedLesson]);
  // };
  const handleDuplicateLessonClick = (lessonIndex) => {
    const lessonToDuplicate = lessons[lessonIndex];
    const duplicatedLesson = {
      id: uuidv4(), // Generate a unique ID
      name: `${lessonToDuplicate.name} Copy`,
    };

    setLessons([...lessons, duplicatedLesson]);
  };

  const handleDeleteLessonClick = (lessonIndex) => {
    if (message.success("lesson deleted")) {
      const updatedLessons = [...lessons];
      updatedLessons.splice(lessonIndex, 1);
      setLessons(updatedLessons);
    }
  };

  const handleRenameClick = (index) => {
    setEditingIndex(index);
    setNewLessonName(lessons[index].name);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewLessonName("");
  };

  // const handleSaveEdit = (index) => {
  //   const updatedLessons = [...lessons];
  //   updatedLessons[index]= newLessonName;
  //   setLessons(updatedLessons);
  //   setEditingIndex(null);
  //   setNewLessonName("");
  // };

  const handleSaveEdit = (index) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = { id: uuidv4(), name: newLessonName };
    setLessons(updatedLessons);
    setEditingIndex(null);
    setNewLessonName("");
  };

  const menu2 = (index) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleRenameClick(index)}>
        Rename lesson
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDuplicateLessonClick(index)}>
        Duplicate lesson
      </Menu.Item>

      <Menu.Item key="3" onClick={() => handleDeleteLessonClick(index)}>
        Delete lesson
      </Menu.Item>
    </Menu>
  );

  console.log(sections);
  return (
    <Droppable droppableId={`section-${section.id}`} type="group">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div
            className="container"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <div className="right-container">
              {isQuickActionsActive ? (
                <div className="quick-actions-container">
                  <Col lg={12} xs={10} sm={12}>
                    <h3>{sectionName}</h3>
                  </Col>
                  &nbsp;&nbsp;
                  <Dropdown overlay={menu1} trigger={["click"]}>
                    <Button className="quick-action-btn">
                      Quick Action <DownOutlined />
                    </Button>
                  </Dropdown>{" "}
                  &nbsp;&nbsp;
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
              ) : (
                <div className="input-container">
                  <Col lg={18} xs={24} sm={12}>
                    <Input
                      placeholder="New Section"
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                    />
                  </Col>
                  <Space className="btn-container">
                    <Button
                      type="default"
                      style={{ fontFamily: "Rajdhani", fontSize: "16px" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button className="save-btn" onClick={handleSave}>
                      Save
                    </Button>
                  </Space>
                </div>
              )}
              <div className="divider"></div>

              <div>
                {lessons.map((lesson, index) => (
                  <Draggable
                    draggableId={`lesson-${lesson.id}`}
                    index={index}
                    key={lesson.id}
                  >
                    {(provided) => (
                      <div
                        className="container1"
                        style={{ paddingLeft: "0px", paddingRight: "0px" }}
                        key={index}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        {editingIndex === index ? (
                          <div>
                            <div className="right-container">
                              <div className="input-container">
                                <Col lg={12} xs={24} sm={12}>
                                  <Input
                                    value={newLessonName}
                                    onChange={(e) =>
                                      setNewLessonName(e.target.value)
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
                                    onClick={handleCancelEdit}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="save-btn"
                                    onClick={() => handleSaveEdit(index)}
                                  >
                                    Save
                                  </Button>
                                </Space>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="right-container">
                            <div className="input-container">
                              <Col lg={8} xs={10} sm={12}>
                                <Link
                                  to="/lesson"
                                  style={{ textDecoration: "underline" }}
                                >
                                  <h3>{lesson.name}</h3>
                                </Link>
                              </Col>
                              <Space className="btn-container">
                                <Dropdown
                                  overlay={menu2(index)}
                                  trigger={["click"]}
                                >
                                  <Button icon={<MoreOutlined />} />
                                </Dropdown>
                              </Space>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>

              {isAddingLesson && (
                <div
                  className="container1"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <div className="right-container">
                    <div className="input-container">
                      <Col lg={12} xs={24} sm={12}>
                        <Input
                          placeholder="New Lesson"
                          value={newLesson}
                          onChange={(e) => setNewLesson(e.target.value)}
                        />
                      </Col>
                      <Space className="btn-container">
                        <Button
                          type="default"
                          style={{
                            fontFamily: "Rajdhani",
                            fontSize: "16px",
                          }}
                          onClick={() => {
                            setIsAddingLesson(false);
                            setNewLesson("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="save-btn"
                          onClick={() => {
                            addLesson();
                            setIsAddingLesson(false);
                          }}
                        >
                          Save
                        </Button>
                      </Space>
                    </div>
                  </div>
                </div>
              )}
              <div className="divider"></div>
              <div className="horizontal-container">
                <Row gutter={16} style={{ marginTop: "20px" }}>
                  <Col span={12}>
                    <Space>
                      <Button
                        type="default"
                        style={{ fontFamily: "Rajdhani" }}
                        onClick={() => {
                          setIsAddingLesson(true);
                        }}
                      >
                        New Lesson
                      </Button>
                      <Button type="default" style={{ fontFamily: "Rajdhani" }}>
                        Bulk Upload
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

const MainCurriculum = () => {
  const initialLessons = JSON.parse(localStorage.getItem("lessons")) || []; // Instead of JSON.parse(localStorage.getItem("sections"))
  const [lessons, setLessons] = useState(initialLessons);

  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  {
    /* const [lessons, setLessons] = useState([]); */
  }

  useEffect(() => {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }, [lessons]);

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: sectionName,
      lessons: lessons.map((lesson, index) => ({
        id: uuidv4(),
        lesson: lesson,
      })),
    };
    setSections([...sections, newSection]);
    setSectionName("");
    setLessons([]);
  };

  const removeSection = (sectionToRemove) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionToRemove.id
    );
    setSections(updatedSections);
  };

  const removeLesson = (lessonIndex, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.splice(lessonIndex, 1);
    setSections(updatedSections);
  };

  // const addLessonToSection = (sectionIndex, lesson) => {
  //   const updatedSections = [...sections];
  //   updatedSections[sectionIndex].lessons.push(lesson);
  //   setSections(updatedSections);
  // };

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
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedSections] = reorderedSections.splice(sourceIndex, 1);
      reorderedSections.splice(destinationIndex, 0, removedSections);
      return setSections(reorderedSections);
    }

    console.log("destionation", destination);
    console.log("source", source);
    console.log(sections);
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
    <>
      <div className="main-curriculum">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Curriculum</h2>
          <Link to={"/admin/preview"} style={{ textDecoration: "none" }}>
            <Button className="preview-btn">Preview</Button>
          </Link>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Space>
            <Button style={{ fontFamily: "Rajdhani" }}>Bulk edit</Button>
            <Button style={{ fontFamily: "Rajdhani" }}>Import content</Button>
          </Space>
        </div>
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sections.map((section, sectionIndex) => (
                  <Draggable
                    draggableId={`section-${section.id}`}
                    key={section.id}
                    index={sectionIndex}
                  >
                    {(provided) => (
                      <div
                        className="draggable-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <DraggableSection
                          key={section.id}
                          section={section}
                          onRemove={() => removeSection(section)}
                          // onAddLesson={(lesson) =>
                          //   addLessonToSection(sectionIndex, lesson)
                          // }
                          // onRemoveLesson={(lessonIndex) =>
                          //   removeLesson(lessonIndex, sectionIndex)
                          // }
                          sectionIndex={sectionIndex}
                          sections={sections}
                          setSections={setSections}
                          sectionName={section.name}
                          setSectionName={(newName) => {
                            const updatedSections = [...sections];
                            updatedSections[sectionIndex].name = newName;
                            setSections(updatedSections);
                          }}
                          lessons={section.lessons}
                          setLessons={(newLessons) => {
                            const updatedSections = [...sections];
                            updatedSections[sectionIndex].lessons = newLessons;
                            setSections(updatedSections);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="new-section">
          <Row gutter={16}>
          <Col lg={12} xs={24} sm={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PlusCircleOutlined
                  style={{ fontSize: "24px", marginRight: "8px" }}
                  onClick={addSection}
                />
                <span>Add New Section</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default MainCurriculum;
