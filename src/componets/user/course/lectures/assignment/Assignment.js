import React,{ useState} from "react";
import { Form, Input,  Row, Col, Button, Checkbox } from "antd";


const Assignment = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinish1 = (values) => {
    console.log("Form values:", values);
  };

  const onFinish2 = (values) => {
    console.log("Form values:", values);
  };
    return (
        <div>
              <div className="container-fluid" >
            <div className="rows">
              <div className="col-lg-12 col-md-12 custom-container">
                <div className="nested-container">
                  <h2>Your Assignments</h2>
                  <div className="inner-sub-container">
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">Assignment</p>
                        <p className="content2">1</p>
                      </div>
                    </div>
                    <p className="item-box1">
                      Schedule your 1-On-1 Business Plan Call with an Advisor
                      and claim your bonuses. We recommend choosing time as soon
                      as possible - our most successful students got started on
                      their Business Plan right away.
                    </p>
                    <button className="schedule-btn">SCHEDULE CALL</button>
                  </div>
                  <div className="inner-sub-container2">
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">Assignment</p>
                        <p className="content2">2</p>
                      </div>
                    </div>
                    <p className="item-box2">
                      Why did you join Affiliate Indians ?
                      <Form name="myForm1" onFinish={onFinish}    style={{ width: '250px' }} >
                      <Form.Item
                        name="reason"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please provide a reason for joining Affiliate Indians.",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={5}
                          placeholder="TO EARN RS. 5-LAKH PER MONTH."
                          className="assign-area"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                        //   type="primary"
                          htmlType="submit"
                          className="call-btn"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                    </p>
                  
                  </div>
                  <div className="inner-sub-container2">
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">Assignment</p>
                        <p className="content2">3</p>
                      </div>
                    </div>
                    <p className="item-box2">
                    How much you want to earn per month?
                      <Form name="myForm2" onFinish={onFinish1}    style={{ width: '250px' }} >
                      <Form.Item
                        name="earn"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please write your view",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={5}
                          placeholder="Write your views..."
                          className="assign-area"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                        //   type="primary"
                          htmlType="submit"
                          className="call-btn"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                    </p>
                  
                  </div>
                  <div className="inner-sub-container2">
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">Assignment</p>
                        <p className="content2">4</p>
                      </div>
                    </div>
                    <p className="item-box2">
                    What is your goal (car/house/laptop/bike,etc.) for this year?
                      <Form name="myForm3" onFinish={onFinish2}    style={{ width: '250px' }} >
                      <Form.Item
                        name="goal"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please write your view",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={5}
                          placeholder="Write your views..."
                          className="assign-area"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                        //   type="primary"
                          htmlType="submit"
                          className="call-btn1"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                    </p>
                  
                  </div>
                  <div className="inner-sub-container">
                    <div className="item-container">
                      <div className="item-box">
                        <p className="content1">Assignment</p>
                        <p className="content2">5</p>
                      </div>
                    </div>
                    <p className="item-box1">
                    IMPORTANT: Make sure to mark this lesson complete and click Continue To Next Step. The next lesson will not unlock unless you do.
                    </p>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid" style={{ padding: "25px" }}>
          <div className="col-lg-12 col-md-12 custom-container1">
      <Row gutter={16}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <div>
            <label className="lesson">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              &nbsp; Mark This Lesson Complete
            </label>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <div>
            <Button  className="continue-btn">
              Continue To Next Step
            </Button>
          </div>
        </Col>
        </Row>
        </div>
        </div>
        </div>
    );
}



export default Assignment;