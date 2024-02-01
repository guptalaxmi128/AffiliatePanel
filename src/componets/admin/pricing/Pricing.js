import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import JoditEditor from "jodit-react";
import free from "../../../assets/img/free.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCourse, updateCourse } from "../../../actions/course/course";
import "./Pricing.css";
import { useDispatch, useSelector } from "react-redux";

const Pricing = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.course);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFreeModalVisible, setIsFreeModalVisible] = useState(false);
  const [oneTimeVisible, setOneTimeVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState([]);
  const [editorValue, setEditorValue] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  useEffect(() => {
    if (courses) {
      setCourse(courses.data);
    }
  }, [courses]);

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showFreeModal = () => {
    setIsFreeModalVisible(true);
  };

  const handleFreeModalOk = async () => {
    try {
      const values = await form.validateFields();
      const cleanedDescription = editorValue.replace(
        /<p>|<\/p>|<br>/g,
        ""
      );

      const additionalData = {
        id: courseId,
        subTitle: values.subtitle,
        discription: cleanedDescription,
        isPaid: false,
        title: courseTitle,
      };

      const res = await dispatch(updateCourse(additionalData));

      if (res.success) {
        message.success(res.message);
        setIsFreeModalVisible(false);
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleFreeModalCancel = () => {
    setIsFreeModalVisible(false);
  };

  const showOneTimeModal = () => {
    setOneTimeVisible(true);
  };

  const handleOneTimeModalOk = async () => {
    try {
      const values = await form.validateFields();
      const cleanedDescription = description.replace(
        /<p>|<\/p>|<br>/g,
        ""
      );
      const additionalData = {
        id: id,
        subTitle: values.subtitle,
        discription: cleanedDescription ,
        title: title,
        currency:selectedCurrency,
        price:values.price
      };

      const res = await dispatch(updateCourse(additionalData));

      if (res.success) {
        message.success(res.message);
        setOneTimeVisible(false);
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleOneTimeModalCancel = () => {
    setOneTimeVisible(false);
  };

  const showPaymentModal = () => {
    setPaymentVisible(true);
  };

  const handlePaymentModalOk = () => {
    form.validateFields().then(() => {
      setPaymentVisible(false);
    });
  };

  const handlePaymentModalCancel = () => {
    setPaymentVisible(false);
  };

  const showSubscriptionModal = () => {
    setSubscriptionVisible(true);
  };

  const handleSubscriptionOk = () => {
    form.validateFields().then(() => {
      setSubscriptionVisible(false);
    });
  };

  const handleSubscriptionCancel = () => {
    setSubscriptionVisible(false);
  };
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleCourseChange = (value, option) => {
    const courseId = value;
    const courseTitle = option?.children;
    // console.log("Selected Course ID:", courseId);
    // console.log("Selected Course Title:", courseTitle);
    setCourseId(courseId);
    setCourseTitle(courseTitle);
  };

  const handleOneTimeCourseChange = (value, option) => {
    const courseId = value;
    const courseTitle = option?.children;

    setId(courseId);
    setTitle(courseTitle);
  };

  return (
    <div className="pricing-preview-container">
      <div className="pricing-preview-subcontainer">
        <h2>Pricing</h2>
        <Button className="pricing-plan-btn" onClick={showModal}>
          Add Pricing Plan
        </Button>
      </div>
      <div className="pricing-subcontainer0">
        <h1>Create a Pricing Plan</h1>
        <p>
          Add a pricing plan to your course so your students can compensate you.
        </p>
        <Button className="pricing-plan-btn" onClick={showModal}>
          Add Pricing Plan
        </Button>
      </div>
      <Modal
        title={
          <span style={{ fontSize: "22px", fontFamily: "Rajdhani" }}>
            Set a price
          </span>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          className="modal-container"
          style={{ cousor: "pointer" }}
          onClick={showFreeModal}
        >
          <div className="modal-image-container">
            <img src={free} alt="free" className="price-plan" />
          </div>
          <div className="modal-text-container">
            <h1>Free</h1>
            <p>Allow access to your content free of charge</p>
          </div>
        </div>

        <div
          className="modal-container"
          style={{ marginTop: "10px", cousor: "pointer" }}
          onClick={showOneTimeModal}
        >
          <div className="modal-image-container">
            <img src={free} alt="free" className="price-plan" />
          </div>
          <div className="modal-text-container">
            <h1>One-time purchase</h1>
            <p>Set up a one time payment</p>
          </div>
        </div>

        <div
          className="modal-container"
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={showPaymentModal}
        >
          <div className="modal-image-container">
            <img src={free} alt="free" className="price-plan" />
          </div>
          <div className="modal-text-container">
            <h1>Payment Plan</h1>
            <p>Set a fixed number of monthly payments.</p>
          </div>
        </div>

        <div
          className="modal-container"
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={showSubscriptionModal}
        >
          <div className="modal-image-container">
            <img src={free} alt="free" className="price-plan" />
          </div>
          <div className="modal-text-container">
            <h1>Subscription</h1>
            <p>Set up a recurring payments</p>
          </div>
        </div>
      </Modal>
      {/* Separate modal for the "Free" part */}
      <Modal
        title={
          <>
            <span style={{ fontSize: "22px", fontFamily: "Rajdhani" }}>
              Free Plan
            </span>
            <p style={{ fontSize: "18px", fontFamily: "Rajdhani" }}>
              Students can access your product by signing up for an account.
              There is no price.
            </p>
          </>
        }
        visible={isFreeModalVisible}
        onOk={handleFreeModalOk}
        onCancel={handleFreeModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Select Course"
            name="selectedCourse"
            rules={[{ required: true, message: "Please select courses" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select Courses"
              onChange={handleCourseChange}
            >
              {course.map((course) => (
                <Select.Option key={course.id} value={course.id}>
                  {course.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Subtitle"
            rules={[
              {
                required: true,
                message: "Please enter subtitle",
              },
            ]}
          >
            <Input placeholder="Short description" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Detailed Description"
            rules={[
              {
                required: true,
                message: "Please enter detail description",
              },
            ]}
          >
            <ReactQuill onChange={(value) => setEditorValue(value)} />
          </Form.Item>
        </Form>
      </Modal>
      {/* Separate modal for the "One Time" part */}
      <Modal
        title={
          <>
            <span style={{ fontSize: "22px", fontFamily: "Rajdhani" }}>
              One-time purchase
            </span>
            <p style={{ fontSize: "18px", fontFamily: "Rajdhani" }}>
              Students can fully access your product by paying a one-time
              amount.
            </p>
          </>
        }
        open={oneTimeVisible}
        onOk={handleOneTimeModalOk}
        onCancel={handleOneTimeModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item label="Currency" name="currency">
              <Select placeholder="Select currency" style={{ width: "220px" }}   onChange={(value) => setSelectedCurrency(value)}>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="INR">INR</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please enter price",
                },
              ]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Price" type="number" />
            </Form.Item>
          </div>
          <Form.Item
            label="Select Course"
            name="selectedCourse"
            rules={[{ required: true, message: "Please select courses" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select Courses"
              onChange={handleOneTimeCourseChange}
            >
              {course.map((course) => (
                <Select.Option key={course.id} value={course.id}>
                  {course.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Subtitle"
            rules={[
              {
                required: true,
                message: "Please enter subtitle",
              },
            ]}
          >
            <Input placeholder="Short description" />
          </Form.Item>
          <Form.Item
            name="detailedDescription"
            label="Detailed Description"
            rules={[
              {
                required: true,
                message: "Please enter detail description",
              },
            ]}
          >
            <ReactQuill
              onChange={(value) => setDescription(value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Separate modal for the "payment" part */}
      <Modal
        title={
          <>
            <span style={{ fontSize: "22px", fontFamily: "Rajdhani" }}>
              Payment Plan
            </span>
            <p style={{ fontSize: "18px", fontFamily: "Rajdhani" }}>
              Students will pay a set amount of monthly fees for indefinite full
              access to your product.
            </p>
          </>
        }
        open={paymentVisible}
        onOk={handlePaymentModalOk}
        onCancel={handlePaymentModalCancel}
      >
        <Form
          form={form}
          //  onFinish={onFinish}
          layout="vertical"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="Price">
              <Select placeholder="Select currency" style={{ width: "220px" }}>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="INR">INR</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter amount",
                },
              ]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Amount" type="number" />
            </Form.Item>
          </div>
          <Form.Item
            name="noOfMonthlyPayment"
            label="Number of Monthly Payment"
            rules={[
              {
                required: true,
                message: "Number of payments should be between 2 and 36",
              },
            ]}
          >
            <Input placeholder="Number of Monthly Payment" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Subtitle"
            rules={[
              {
                required: true,
                message: "Please enter subtitle",
              },
            ]}
          >
            <Input placeholder="Short description" />
          </Form.Item>
          <Form.Item
            name="detailedDescription"
            label="Detailed Description"
            rules={[
              {
                required: true,
                message: "Please enter detail description",
              },
            ]}
          >
            <ReactQuill
            //   value={editorValue}
            //   onChange={(value) => setEditorValue(value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Separate modal for the "subscription" part */}
      <Modal
        title={
          <>
            <span style={{ fontSize: "22px", fontFamily: "Rajdhani" }}>
              Subscription
            </span>
            <p style={{ fontSize: "18px", fontFamily: "Rajdhani" }}>
              Students will have access to your product as long as they continue
              to pay their fee.
            </p>
          </>
        }
        open={subscriptionVisible}
        onOk={handleSubscriptionOk}
        onCancel={handleSubscriptionCancel}
      >
        <Form
          form={form}
          //  onFinish={onFinish}
          layout="vertical"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="Price">
              <Select placeholder="Select currency" style={{ width: "220px" }}>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="INR">INR</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter amount",
                },
              ]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Amount" type="number" />
            </Form.Item>
          </div>
          <Form.Item label="Frequency">
            <Select placeholder="Select frequency" style={{ width: "100%" }}>
              <Select.Option value="everyWeek">Every Week</Select.Option>
              <Select.Option value="everyTwoWeeks">Every 2 Weeks</Select.Option>
              <Select.Option value="everyMonth">Every Month</Select.Option>
              <Select.Option value="everyThreeMonths">
                Every 3 Months
              </Select.Option>
              <Select.Option value="everySixMonths">
                Every 6 Months
              </Select.Option>
              <Select.Option value="everyYear">Every Year</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Subtitle"
            rules={[
              {
                required: true,
                message: "Please enter subtitle",
              },
            ]}
          >
            <Input placeholder="Short description" />
          </Form.Item>
          <Form.Item
            name="detailedDescription"
            label="Detailed Description"
            rules={[
              {
                required: true,
                message: "Please enter detail description",
              },
            ]}
          >
            <ReactQuill
            //   value={editorValue}
            //   onChange={(value) => setEditorValue(value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Pricing;
