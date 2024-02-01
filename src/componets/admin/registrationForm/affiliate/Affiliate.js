import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Select,
  message,
  Input,
  Space,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../../actions/course/course";
import {
  addRatio,
  deleteRatio,
  getRatio,
  updateRatio,
} from "../../../../actions/addRatio/addRatio";

const Affiliate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const ratio = useSelector((state) => state.ratio.ratio);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [adminRatio, setAdminRatio] = useState("");
  const [referalRatio, setReferalRatio] = useState("");
  const [ratioName, setRatioName] = useState("");
  const [showAddForm,setShowAddForm]=useState(true);

  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  useEffect(() => {
    dispatch(getRatio());
  }, [dispatch]);

  useEffect(() => {
    if (ratio) {
      setTableData(ratio.data);
    }
  }, [ratio]);

  // console.log(tableData)

  const handleCourseChange = (value) => {
    setSelectedCourses(value);
  };
  // console.log(selectedCourses);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const columns = [
    {
      title: "Ratio Name",
      dataIndex: "ratioName",
      key: "ratioName",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Course",
      dataIndex: "courses",
      key: "title",
      render: (courses) =>
        courses && courses.length > 0
          ? courses.map((course) => course.title).join(", ")
          : "-",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Admin Commission",
      dataIndex: "adminRatio",
      key: "adminRatio",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "User Commission",
      dataIndex: "referalRatio",
      key: "referalRatio",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.id)} className="affiliate-edit-btn">Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];

  const onFinish = async (values) => {
    try {
      const data = {
        referalRatio: values.referalRatio,
        adminRatio: values.adminRatio,
        ratioName: values.ratioName,
        courseId: selectedCourses,
      };

      const res = await dispatch(addRatio(data));

      if (res.success) {
        message.success(res.message);
      } else {
        message.error("Failed to add ratio. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  const handleEdit = (id) => {
    // console.log(`Edit button clicked for record with id ${id}`);
    setEditMode(id);
    setShowAddForm(false);
    const recordToEdit = tableData.find((record) => record.id === id);
    // console.log(recordToEdit);
    const course = recordToEdit.courses.map((course) => course.title);
    // console.log(course)
    if (recordToEdit && course) {
      setSelectedCourse(course);
      setAdminRatio(recordToEdit.adminRatio);
      setReferalRatio(recordToEdit.referalRatio);
      setRatioName(recordToEdit.ratioName);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteRatio(id));

      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the coupon:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = {
        referalRatio,
        adminRatio,
        ratioName,
        id:editMode
      };
//  console.log(data)
      const res = await dispatch(updateRatio(data));

      if (res.success) {
        message.success(res.message);
      } else {
        message.error("Failed to add ratio. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
      message.error(error.response.data.message);
    }
  };
  console.log(selectedCourse);
  return (
    <>
      {editMode && (
        <Form
          name="myForm"
          onFinish={handleUpdate}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            selectedCourse,
            adminRatio,
            referalRatio,
            ratioName,
          }}
        >
          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="Select Course"
                name="selectedCourse"
                rules={[{ required: true, message: "Please select courses" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  // onChange={handleCourseChange}
                  disabled={editMode}
                  value={selectedCourse} 
                >
                  {course?.data?.map((course) => (
                    <Select.Option key={course.id} value={course.id}>
                      {course.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="Admin commission"
                name="adminRatio"
                rules={[
                  { required: true, message: "Please enter admin commission" },
                ]}
              >
                <Input onChange={(e) => setAdminRatio(e.target.value)}/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="User commission"
                name="referalRatio"
                rules={[
                  { required: true, message: "Please enter user commission" },
                ]}
              >
                <Input onChange={(e) => setReferalRatio(e.target.value)} />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="Ratio Name"
                name="ratioName"
                rules={[{ required: true, message: "Please enter ratio name" }]}
              >
                <Input onChange={(e) => setRatioName(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button className="create-new-form-btn" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
        )}
        {showAddForm && ( <Form
          name="myForm"
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="Select Course"
                name="selectedCourses"
                rules={[{ required: true, message: "Please select courses" }]}
              >
                <Select style={{ width: "100%" }} onChange={handleCourseChange}>
                  {course?.data?.map((course) => (
                    <Select.Option key={course.id} value={course.id}>
                      {course.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="Admin commission"
                name="adminRatio"
                rules={[
                  { required: true, message: "Please enter admin commission" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="User commission"
                name="referalRatio"
                rules={[
                  { required: true, message: "Please enter user commission" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24} md={8}>
              <Form.Item
                label="Ratio Name"
                name="ratioName"
                rules={[{ required: true, message: "Please enter ratio name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button className="create-new-form-btn" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>)}
       
   

      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          margin: "10px",
          borderRadius: "5px",
        }}
      >
        {/* <h1 style={{fontFamily:'Rajdhani',fontSize:'16px'}}>Affiliate Course Commission</h1> */}
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default Affiliate;
