import React, { useState, useEffect } from "react";
import { Input, Tabs, message, Button, Select } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse } from "../../../../actions/course/course";
import { addForm} from "../../../../actions/addForm/addForm";
import "./StepForm.css";

const { TabPane } = Tabs;

const StepForm = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const [previewMode, setPreviewMode] = useState(false);
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCoursePrice, setSelectedCoursePrice] = useState(null);
  const [selectedCouponCode, setSelectedCouponCode] = useState(null);
  const [javaScriptCode,setJavaScriptCode]=useState('javascript');

  const handleCopyClick = () => {
    setCopied(true);
    message.success("Code copied to clipboard!");
  };

  console.log("templateId", id);

  const handleCourseChange = (value) => {
    const selectedCourse = course.data.find((course) => course.id === value);

    if (selectedCourse) {
      setSelectedCourseId(selectedCourse.id);
      setSelectedCoursePrice(selectedCourse.price);
    }
    const coupon = selectedCourse?.course_coupons.find(
      (coupon) => coupon.courseId === value
    );
    if (coupon) {
      setSelectedCouponCode(coupon.coupon.couponCode);
    } else {
      setSelectedCouponCode(null);
    }
  };
  // console.log(course);
  // console.log(selectedCourseId)
  // console.log(selectedCouponCode)

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const [currentStep, setCurrentStep] = useState(1);
  const [activeStep, setActiveStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    setActiveStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    setActiveStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        courseId: selectedCourseId,
        templateId: id,
        registrationDetailsFields: ['name', 'email', 'mobileNumber'],
        paymentFields: ['amount', 'currency', 'receiptNo', 'couponCode'],
        HTMLCode: generateFormCode(
          selectedCourseId,
          selectedCoursePrice,
          selectedCouponCode
        ),
        javaScriptCode:javaScriptCode,
      };
      const res = await dispatch(addForm(data));

      if (res.success) {
        message.success(res.message);
      } else {
        console.error("API error:", res.message);
        message.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  function generateFormCode(courseId, amount, coupon) {
    console.log(courseId);
    console.log(amount);
    console.log(coupon);

    const formHtml = `
        <div>
        <div id="userDetails" style="display: block">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value=""
            required
            id="name"
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 100%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          />
          <label for="email">Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            required
            id="email"
            value=""
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 100%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          />
          <label for="mobileNumber">Mobile Number</label>
          <input
            type="number"
            name="mobileNumber"
            placeholder="Mobile Number"
            required
            id="mobileNumber"
            value=""
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 100%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          />
          <div style="margin: 5px">
          <input type="checkbox" id="termAndConditionAccepted" />
          <label for="termAndConditionAccepted"
            >I accept the terms and conditions</label
          >
        </div>
          <button
            type="button"
            style="
              background: #ddb42c;
              border: none;
              border-radius: 5px;
              padding: 6px 15px;
              font-weight: 500;
              font-size: 14px;
              color: #000;
              font-family: sans-serif;
              margin: 0;
              display: flex;
              width: 100%;
              height: 40px;
              justify-content: center;
              align-items: center;
            "
            onclick="submitUserDetails(); return false;"
          >
            Next
          </button>
        </div>
        <div
          id="loadingIndicator"
          style="display: none; text-align: center"
        >
          Loading...
        </div>
        <div id="paymentDetails" style="display: none">
          <label for="amount">Amount</label>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value="${amount}"
            required
            id="amount"
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 100%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          />

          <label for="receipt">Receipt</label>
          <input
            type="text"
            name="receipt"
            placeholder="Receipt"
            value=""
            required
            id="receipt"
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 100%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          />

          <label for="currency">Currency</label>
          <select
            name="currency"
            id="currency"
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 100%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
          <div style="display:flex">
          <label for="coupon">Coupon Code</label>
          <input
            type="text"
            name="coupon"
            placeholder="Coupon Code"
            value="${coupon}"
           
            id="coupon"
            style="
              box-sizing: border-box;
              padding: 4px 11px;
              color: rgba(0, 0, 0, 0.88);
              margin: 5px;
              font-size: 14px;
              line-height: 1.5714285714285714;
              list-style: none;
              position: relative;
              display: inline-block;
              width: 50%;
              min-width: 0;
              background-color: #ffffff;
              background-image: none;
              border-width: 1px;
              border-style: solid;
              border-color: #d9d9d9;
              border-radius: 6px;
              transition: all 0.2s;
            "
          />
          <button
          type="button"
          style="
            background: #ddb42c;
            border: none;
            border-radius: 5px;
            padding: 6px 15px;
            font-weight: 500;
            font-size: 14px;
            color: #000;
            font-family: sans-serif;
            margin: 0;
            display: flex;
            width: 50%;
            height: 40px;
            justify-content: center;
            align-items: center;
          "
        >
          Apply Coupon
        </button>
          </div>
          <button
            type="button"
            style="
              background: #ddb42c;
              border: none;
              border-radius: 5px;
              padding: 6px 15px;
              font-weight: 500;
              font-size: 14px;
              color: #000;
              font-family: sans-serif;
              margin: 0;
              display: flex;
              width: 100%;
              height: 40px;
              justify-content: center;
              align-items: center;
            "
              id="payNowButton"
          >
            Pay Now
          </button>
        </div>
      </div>
        `;

    const stepHeaderHtml = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
        <div style="flex: 1; padding: 12px; text-align: center; cursor: pointer; border: 1px solid #d9d9d9; background-color: #f2f2f2; font-size: 18px; font-family: Rajdhani, sans-serif; ${
          activeStep === 1 ? "background-color: #fff; color: #f2d872;" : ""
        }"   id="userDetailsSection">
          1. User Details
        </div>
        <div style="flex: 1; padding: 12px; text-align: center; cursor: pointer; border: 1px solid #d9d9d9; background-color: #f2f2f2; font-size: 18px; font-family: Rajdhani, sans-serif; ${
          activeStep === 2 ? "background-color: #fff; color: #f2d872;" : ""
        }"    id="paymentDetailsSection">
          2. Payment Details
        </div>
      </div>
    `;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Form Title</title>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    </head>
    <body>
    <div style="display: flex; height:80vh; justify-content: center; align-items: center;">
      <form id="myForm"  method="post" >
        <div style="margin-bottom: 10px; width:350px; box-shadow: 0 4px 8px 0 rgba(242, 216, 114, 0.2);padding:20px;align-items:center">
          ${stepHeaderHtml}
          ${formHtml}
        </div>
      </form>
    </div>
    <script>
    const options = {
      key: "rzp_test_BLGDf7OyFZNBwg",
      name: "Affiliate Indians",
      description: "Some Description",
      order_id: "",
      handler: async (response) => {
        console.log(response);
        try {
          const paymentId = response.razorpay_payment_id;
          const url = 'https://affiliate-indian.onrender.com/api/user/verifyPayment';
          const captureResponse = await axios.post(url, { response });
          console.log(captureResponse.data);
          console.log(paymentId);
          // document.getElementById("myForm").submit();
        } catch (err) {
          console.log(err);
        }
      },
      callback_url: 'https://affiliate-indian.onrender.com/api/user/verifyPayment',
      redirect: true,
      theme: {
        color: "#686CFD",
      },
    };

    function generateRandomReceipt() {
      return new Date().getTime().toString();
    }

    async function submitUserDetails() {
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var mobileNumber = document.getElementById("mobileNumber").value; 
       var termAndConditionAccepted = document.getElementById(
        "termAndConditionAccepted"
      ).checked;
     

      if (!name || !email || !mobileNumber) {
        alert("Please fill in all required fields");
        return false;
      }

      var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailFormat)) {
        alert("Please enter a valid email address");
        return false;
      }
      if (!termAndConditionAccepted) {
        alert("Please accept the terms and conditions");
        return false;
      }
     
      document.getElementById("loadingIndicator").style.display = "block";
      console.log("formData", {
        name,
        email,
       mobileNumber
      });

    

          document.getElementById("userDetails").style.display = "none";
          document.getElementById("paymentDetails").style.display = "block";
          document.getElementById("paymentDetailsSection").style.color = "#ddb42c";
          document.getElementById("userDetailsSection").style.color = "#000";
     
    document
      .getElementById("myForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Submitting payment details");
      });
    }

    document.getElementById("paymentDetails").addEventListener("click", async function (event) {
      event.preventDefault();
      var receipt = generateRandomReceipt();
      var amount = "${amount}";
      var currency = document.getElementById("currency").value;
      document.getElementById("receipt").value = receipt;

     

      if (!receipt) {
        alert("Receipt generation failed");
        return;
      }

      var id = "${courseId}";
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await fetch(\`https://affiliate-indian.onrender.com/api/user/createPayment/\${id}\`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: \`Bearer \${authToken}\`,
          },
          body: JSON.stringify({
            amount: amount,
            receipt: receipt,
            currency: currency,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            console.log(data);
            const orderId = data.data.id;
            options.order_id = orderId;
            console.log("Razorpay order_id:", orderId);
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            rzp1.on("payment.failed", function (response) {
              // Handle failed payment
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);
            });
            rzp1.on("payment.success", function (response) {
              // Handle successful payment
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              // Submit the form after handling Razorpay response
              document.getElementById("myForm").submit();
            });
          } else {
            alert("Payment creation failed. Please try again.");
          }
        } else {
          console.error("API error:", response);
          alert("API error. Please try again.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Fetch error. Please try again.");
      }
    });
  </script>
    </body>
    </html>
  `;
  }

  return (
    <>
      <div className="header">
        <div>
          <span className="template-name">Template Name</span>
          <span className="edit-icon">&#9998;</span>
        </div>
        <div className="action-buttons">
          <button
            className="action-button"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Exit Preview" : "Preview"}
          </button>

          <button
            className="action-button"
            onClick={() =>
              generateFormCode(
                selectedCourseId,
                selectedCoursePrice,
                selectedCouponCode
              )
            }
          >
            Save
          </button>

          <button
            className="action-button"
            onClick={() => {
              setShowGeneratedCode(!showGeneratedCode);
            }}
          >
            Publish
          </button>
        </div>
      </div>

      <div className="template-container">
        <div className="left-side">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              marginTop: "30px",
              marginBottom: "30px",
              marginLeft: "60px",
              marginRight: "60px",
              borderRadius: "5px",
            }}
          >
            {previewMode ? (
              <div
                dangerouslySetInnerHTML={{ __html: generateFormCode() }}
              ></div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <form id="dynamic-form" className="registration-form">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        padding: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                        border: "1px solid #d9d9d9",

                        backgroundColor: activeStep === 1 ? "#f2f2f2" : "#fff",
                      }}
                    >
                      <h4 style={{ fontFamily: "Rajdhani" }}>
                        1. User Details
                      </h4>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        padding: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                        border: "1px solid #d9d9d9",

                        backgroundColor: activeStep === 2 ? "#f2f2f2" : "#fff",
                      }}
                    >
                      <h4 style={{ fontFamily: "Rajdhani" }}>
                        {" "}
                        2. Payment Details
                      </h4>
                    </div>
                  </div>
                  {currentStep === 1 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <label htmlFor="name">Name</label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                      <label htmlFor="email">Email</label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                      <label htmlFor="mobile">Mobile Number</label>
                      <Input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                      <label htmlFor="course">Course</label>

                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Course"
                        onChange={handleCourseChange}
                      >
                        {course?.data?.map((course) => (
                          <Select.Option key={course.id} value={course.id}>
                            {course.title}
                          </Select.Option>
                        ))}
                      </Select>
                      <Button
                        type="button"
                        onClick={() =>
                          handleNextStep(
                            selectedCourseId,
                            selectedCoursePrice,
                            selectedCouponCode
                          )
                        }
                        className="next-step-btn"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="hidden"
                        name="courseId"
                        value={selectedCourseId}
                      />
                      <label htmlFor="amount">Amount</label>
                      <Input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        style={{ marginBottom: "10px" }}
                        value={selectedCoursePrice}
                        required
                      />

                      <label htmlFor="currency">Currency</label>
                      <Select
                        name="currency"
                        id="currency"
                        style={{ marginBottom: "10px" }}
                        required
                      >
                        <Select.Option value="USD">USD</Select.Option>
                        <Select.Option value="INR">INR</Select.Option>
                      </Select>

                      <label htmlFor="receiptNumber">Receipt No</label>
                      <Input
                        type="text"
                        name="receiptNumber"
                        placeholder="Enter receipt number"
                        style={{ marginBottom: "10px" }}
                        required
                      />
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "10px" }}>
                          <label htmlFor="couponCode">Coupon Code</label>
                          <Input
                            type="text"
                            name="couponCode"
                            placeholder="Enter coupon code"
                            style={{ marginBottom: "10px" }}
                            value={selectedCouponCode}
                          />
                        </div>

                        <Button
                          type="default"
                          // onClick={handleSubmit}
                          style={{ marginTop: "30px" }}
                        >
                          Apply Coupon
                        </Button>
                      </div>

                      <Button
                        type="button"
                        onClick={handleSubmit}
                        className="next-step-btn"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>

        <div
          className="right-side"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="HTML" key="1">
              {showGeneratedCode && (
                <div style={{ position: "relative" }}>
                  <pre>
                    <code>
                      {generateFormCode(
                        selectedCourseId,
                        selectedCoursePrice,
                        selectedCouponCode
                      )}
                    </code>
                  </pre>
                  <div style={{ position: "absolute", top: 0, right: 0 }}>
                    <CopyToClipboard
                      text={generateFormCode(
                        selectedCourseId,
                        selectedCoursePrice,
                        selectedCouponCode
                      )}
                      onCopy={handleCopyClick}
                    >
                      <Button type="primary" size="small">
                        Copy
                      </Button>
                    </CopyToClipboard>
                    {copied && (
                      <span style={{ marginLeft: "5px", color: "green" }}>
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </TabPane>
            <TabPane tab="JS" key="2"></TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default StepForm;
