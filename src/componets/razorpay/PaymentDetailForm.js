import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message, Row, Col } from "antd";
import { useParams, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo_white.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addPayment } from "../../actions/paymentForm/paymentForm";
import {
  getUserCoupon,
  updateUserCoupon,
} from "../../actions/userCoupon/userCoupon";

const { Option } = Select;

const PaymentDetailsForm = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [msg, setMsg] = useState("");
  const [discount,setDiscount]=useState('');
  // const coupon = useSelector((state) => state.userCoupon.usercoupon);
  const { price, couponCode } = location.state || {};
  // console.log(price)


  useEffect(() => {
    dispatch(getUserCoupon());
  }, [dispatch]);

  const [form] = Form.useForm();

  function generateRandomReceipt() {
    return new Date().getTime().toString();
  }

  useEffect(() => {
    if (price) {
      form.setFieldsValue({
        originalAmount: price,
        couponCode,
      });
    }
  }, [price, form]);

  const initialReceipt = generateRandomReceipt();

  const handleApplyCoupon = async () => {
    try {
      const data = {
        couponCode,
        courseId,
      };
      const res = await dispatch(updateUserCoupon(data));
      if (res.success) {
        message.success(res.message);
        if (res.data.discountAmount && res.data.saveAmount) {
          setMsg(
            `Your new total is ₹${res.data.discountAmount} & You saved ₹${res.data.saveAmount}! 🎉🎉`
          );
          setDiscount(res.data.discountAmount)
        }
      } else {
        message.error("Failed to apply coupon. Please try again.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      message.error(
        "An error occurred while applying the coupon. Please try again."
      );
    }
  };

  const handleFinish = (values) => {
    const { originalAmount, couponCode, ...paymentInfoWithoutOriginalAmount } = values;
    let amountToSend = originalAmount * 100; 

   
    if (couponCode) {
      const discountAmount = discount;
      amountToSend = discountAmount * 100;
    }
    const paymentInfo = {
      id: courseId,
      amount: amountToSend.toString(),
      ...paymentInfoWithoutOriginalAmount,
    };

    if (couponCode) {
      paymentInfo.couponCode = couponCode;
    }
    console.log(paymentInfo);

    dispatch(addPayment(paymentInfo))
      .then((response) => {
        console.log(response.data.id);
        message.success("Payment details added successfully!");

        const options = {
          key: "rzp_test_BLGDf7OyFZNBwg",
          name: "Affiliate Indians",
          description: "Some Description",
          order_id: response.data.id,
          handler: async (response) => {
            try {
              const paymentId = response.razorpay_payment_id;
              // const url = `http://localhost:5000/api/user/verifyPayment`;
              // const url = `http://3.224.85.30/api/user/verifyPayment`;
              const url =`https://affiliate-indian.onrender.com/api/user/verifyPayment`
              const captureResponse = await axios.post(url, { response });
              console.log(captureResponse.data);
              console.log(paymentId);
            } catch (err) {
              console.log(err);
            }
          },
          // callback_url: "http://localhost:5000/api/user/verifyPayment",
          // callback_url:`http://3.224.85.30/api/user/verifyPayment`,
          callback_url:`https://affiliate-indian.onrender.com/api/user/verifyPayment`,
          redirect: true,
          theme: {
            color: "#686CFD",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <div>
      <div className="signup-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" className="login-logo" width={200} />
        </div>

        <div className="signup-form-container" style={{ width: "350px" }}>
          <h2>Payment Details</h2>
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            initialValues={{ currency: "INR" }}
          >
            <Form.Item
              name="originalAmount"
              label="Amount"
              rules={[{ required: true, message: "Please enter the amount" }]}
            
            >
              <Input type="number" placeholder="Amount"   disabled />
            </Form.Item>
            <Form.Item
              name="currency"
              label="Currency"
              rules={[{ required: true, message: "Please select a currency" }]}
            >
              <Select placeholder="Select currency">
                <Option value="INR">INR</Option>
                <Option value="USD">USD</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="receipt"
              label="Receipt"
              rules={[
                { required: true, message: "Please enter receipt information" },
              ]}
              initialValue={initialReceipt}
            >
              <Input placeholder="Enter receipt information" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="couponCode"
                  label="Coupon Code"
                  // rules={[
                  //   { required: true, message: "Please enter receipt information" },
                  // ]}
                >
                  <Input placeholder="Coupon Code" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item>
                  <Button
                    type="default"
                    onClick={handleApplyCoupon}
                    style={{ marginTop: "30px" }}
                  >
                    Apply Coupon
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={24}>
                {msg && (
                  <span style={{ marginLeft: "5px", color: "green" }}>
                    {msg}
                  </span>
                )}
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginTop:'20px'}}>
                Pay Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;
