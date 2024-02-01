import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Button,
  Input,
  Select,
  message,
  Form,
} from "antd";
import { HomeOutlined, CopyOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import rank from "../../../assets/img/affiliate.jpg";
import sales from "../../../assets/img/sales.png";
import checkout from "../../../assets/img/checkout.png";
import "./AffiliateBluePrint.css";
import { getAllCourseUser } from "../../../actions/allCourseUser/allCourseUser";
import { getUser } from "../../../actions/loginUser/loginUser";
import { getAffiliateUserId } from "../../../actions/userAffiliateLink/userAffiliateLink";
import { addSaleLink } from "../../../actions/addSaleLink/addSaleLink";

const { Option } = Select;

const AffiliateBluePrint = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [userCode, setUserCode] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTrackedTag, setSelectedTrackedTag] = useState(null);
  const [selectedCourseCheck, setSelectedCourseCheck] = useState(null);
  const [selectedTrackedTagCheck, setSelectedTrackedTagCheck] = useState(null);
  const [courses, setCourses] = useState([]);
  const [affiliateLink, setAffiliateLink] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [domain, setDomain] = useState(
    "https://affiliateindians.com/3step-htas"
  );
  // const [trackingTag, setTrackingTag] = useState("guruji");
  const course = useSelector((state) => state.allCourseUser.courses);

  const users = useSelector((state) => state.loginUser.users);
  const affiliate = useSelector((state) => state.userAffiliateLink.userLink);
  const [affiliateId, setAffiliateId] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (course.data) {
      setCourses(course.data);
    }
  }, [course.data]);
  useEffect(() => {
    if (users.data) {
      setUserCode(users.data.userCode);
    }
  }, [users.data]);

  useEffect(() => {
    if (affiliate.data) {
      setAffiliateId(affiliate.data.aid);
    }
  }, [affiliate.data]);

  useEffect(() => {
    if (selectedCourse) {
      dispatch(getAffiliateUserId(selectedCourse.id));
    }
  }, [dispatch, selectedCourse]);
  // console.log(affiliateId);

  useEffect(() => {
    dispatch(getAllCourseUser());
  }, [dispatch]);

  const handleCopyClick = () => {
    if (generatedLink) {
      navigator.clipboard
        .writeText(generatedLink)
        .then(() => {
          // alert("Generated link copied to clipboard");
          alert(`${generatedLink}`);
        })
        .catch((error) => {
          console.error("Error copying to clipboard: ", error);
        });
    }
  };

  // const generateLink = (selectedCourse, userCode, trackedTag) => {
  //   const userSegment = userCode ? `user/${userCode}` : "";
  //   const tagSegment = trackedTag ? `tag/${trackedTag}` : "";
  //   return `${domain}/course/${selectedCourse.title}/${userSegment}/${tagSegment}`;
  // };

  const generateCheckLink = (selectedCourse, userCode, trackedTag) => {
    const userSegment = userCode ? `user/${userCode}` : "";
    const tagSegment = trackedTag ? `tag/${trackedTag}` : "";
    return `${domain}/course/${selectedCourse.title}/${userSegment}/${tagSegment}`;
  };
  const handleCourseSelect = (value) => {
    const course = courses.find((course) => course.id === value);
    setSelectedCourse(course);
  };

  const handleChange = async () => {
    try {
      const data = {
        marketingTag:selectedTrackedTag,
        originalLink: domain,
        courseId: selectedCourse.id,
        aid: affiliateId,
      };

      console.log(data);
      const res = await dispatch(addSaleLink(data));
      console.log("Response:", res);
      if (res.success) {
        message.success(res.message);
        setGeneratedLink(res.data.generatedLink)
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  console.log(generatedLink)
  // useEffect(() => {
  //   if (selectedCourse && userCode) {
  //     const link = generateLink(selectedCourse, userCode, selectedTrackedTag);
  //     setGeneratedLink(link);
  //   }
  // }, [selectedCourse, selectedTrackedTag, userCode]);

  const handlePreviewInNewWindow = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank");
    }
  };

  const handleCourseSelectCheck = (value) => {
    console.log("Selected Course ID:", value);
    const course = courses.find((course) => course.id === value);
    setSelectedCourseCheck(course);
  };

  const handleTrackedTagSelectCheck = (value) => {
    setSelectedTrackedTagCheck(value);
  };

  useEffect(() => {
    if (selectedCourseCheck && userCode) {
      const link = generateCheckLink(
        selectedCourseCheck,
        userCode,
        selectedTrackedTagCheck
      );
      setAffiliateLink(link);
    }
  }, [selectedCourseCheck, selectedTrackedTagCheck, userCode]);

  const handlePreviewInNewWindowCheck = () => {
    if (affiliateLink) {
      window.open(affiliateLink, "_blank");
    }
  };

  const handleCheckCopyClick = () => {
    if (affiliateLink) {
      navigator.clipboard
        .writeText(affiliateLink)
        .then(() => {
          // alert("Generated link copied to clipboard");
          alert(`${affiliateLink}`);
        })
        .catch((error) => {
          console.error("Error copying to clipboard: ", error);
        });
    }
  };

  useEffect(() => {
    console.log('generatedLink in useEffect:', generatedLink);
    form.setFieldsValue({
      affiliateLink: generatedLink,
    });
  }, [generatedLink, form]);

  console.log('generatedLink before return:', generatedLink);

  return (
    <div className="blueprint-outer-container">
      <div className="blueprint-breadcrumb">
        <div className="blueprint-breadcrumb0">
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Rajdhani",
              padding: 0,
              margin: 0,
            }}
          >
            Affiliate Indians Blueprint
          </p>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/user">
                <HomeOutlined />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Affiliate Indians Blueprint</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="blueprint-container">
        <Row>
          <Col lg={14} xs={24}>
            <div className="blueprint-subcontainer0 blueprint-background">
              <div className="text-overlay">
                <h2>Welcome to Funnel</h2>
                <p>
                  Choose the links from below and start promoting our products
                </p>
              </div>
            </div>
          </Col>
          <Col lg={10} xs={24}>
            <div className="blueprint-subcontainer1">
              <img src={rank} alt="rank" className="rank-img" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <div className="rows">
          <div className="col-lg-12 col-md-12 blueprint-custom-container">
            <div className="blueprint-nested-container">
              <h2>Sales Page</h2>
              <div className="rows">
                <div className="col-lg-12 col-md-12 ">
                  <Row gutter={16}>
                    <Col xl={10} lg={12} xs={24}>
                      <img
                        src={sales}
                        alt="sales"
                        style={{ height: "300px", width: "100%" }}
                      />
                      <Button
                        className="preview-next-window-btn"
                        onClick={handlePreviewInNewWindow}
                      >
                        Preview in New Window
                      </Button>
                    </Col>

                    <Col xl={12} lg={12} xs={24}>
                      <Form
                        form={form}
                        name="myForm"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ originalLink: domain }}
                       
                      >
                        <Col xs={12} sm={16} md={16} lg={8} xl={24}>
                          <Form.Item label="Domain" name="originalLink">
                            <Input placeholder="Domain" />
                          </Form.Item>
                        </Col>

                        <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                          <Form.Item label="Select Course">
                            <Select
                              defaultValue="Select Course"
                              style={{ width: "100%" }}
                              onChange={handleCourseSelect}
                            >
                              <Option value="Select Course" disabled>
                                Select Course
                              </Option>
                              {courses.map((course) => (
                                <Option
                                  key={course.id}
                                  value={course.id}
                                  style={{ color: "black" }}
                                >
                                  {course.title}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <div
                          style={{
                            marginTop: "5px",
                            display: "flex",
                          }}
                        >
                          <Col xs={12} sm={16} md={16} lg={8} xl={24}>
                            <Form.Item label="Tracking Tag" name="marketingTag">
                              <Input placeholder="Enter Tag" value={selectedTrackedTag} onChange={(e)=>setSelectedTrackedTag(e.target.value)}/>
                            </Form.Item>
                          </Col>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "0 auto",
                          }}
                        >
                          <Button
                            type="submit"
                            className="copy-blueprint-btn"
                           onClick={handleChange}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                      { generatedLink &&  <div
                        style={{
                          marginTop: "5px",
                          display: "flex",
                        }}
                      >
                        <Col xs={16} sm={16} md={16} lg={8} xl={24}>
                          <div>
                            <Form
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              form={form}
                            >
                              <Form.Item
                                label="Affiliate Link"
                                name="affiliateLink"
                              >
                                <Input placeholder="Affiliate Link"  />
                              </Form.Item>
                            </Form>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <Button
                            className="copy-blueprint-btn"
                            icon={<CopyOutlined />}
                            onClick={handleCopyClick}
                          >
                            Copy
                          </Button>
                        </Col>
                      </div>}
                     
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Checkout page */}
        <div className="rows">
          <div
            className="col-lg-12 col-md-12 blueprint-custom-container"
            style={{ marginTop: "10px" }}
          >
            <div className="blueprint-nested-container">
              <h2>Checkout Page</h2>
              <div className="rows">
                <div className="col-lg-12 col-md-12 ">
                  <Row gutter={16}>
                    <Col xl={10} lg={12} xs={24}>
                      <img
                        src={checkout}
                        alt="checkout"
                        style={{ height: "300px", width: "100%" }}
                      />
                      <Button
                        className="preview-next-window-btn"
                        onClick={handlePreviewInNewWindowCheck}
                      >
                        Preview in New Window
                      </Button>
                    </Col>

                    <Col xl={12} lg={12} xs={24}>
                      <Form
                        // form={form}
                        name="myForm"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                      >
                        <div
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                            <Form.Item label="Select Course">
                              <Select
                                defaultValue="Select Course"
                                style={{ width: "100%" }}
                                onChange={handleCourseSelectCheck}
                              >
                                <Option value="Select Course" disabled>
                                  Select Course
                                </Option>
                                {courses.map((course) => (
                                  <Option
                                    key={course.id}
                                    value={course.id}
                                    style={{ color: "black" }}
                                  >
                                    {course.title}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </div>
                        <div
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          <Col xs={12} sm={16} md={16} lg={8} xl={24}>
                            <Form.Item label="Tracking Tag" name="trackingTag">
                              <Input placeholder="Enter Tag" />
                            </Form.Item>
                          </Col>
                          <Col lg={4}>
                            <Button
                              type="default"
                              className="add-blueprint-btn"
                            >
                              Add
                            </Button>
                          </Col>
                        </div>
                      </Form>
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        <Col xs={16} sm={16} md={16} lg={24} xl={24}>
                          <div>
                            <h3 className="affiliate-blueprint">
                              Generated Link:
                            </h3>
                            <Input
                              placeholder="Generated Link"
                              value={affiliateLink}
                              readOnly
                            />
                          </div>
                        </Col>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "0 auto",
                        }}
                      >
                        <Button
                          type="default"
                          className="copy-blueprint-btn"
                          onClick={handleCheckCopyClick}
                        >
                          Copy
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateBluePrint;
