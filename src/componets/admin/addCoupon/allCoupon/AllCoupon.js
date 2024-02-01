import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  message,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "../../../../actions/addCoupon/addCoupon";
import "./AllCoupon.css";

const AllCoupon = () => {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon.coupon);
  const [coupons, setCoupons] = useState([]);
  const [editCouponId, setEditCouponId] = useState(null);
  const [form] = Form.useForm();
  const [couponType, setCouponType] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [amount, setAmount] = useState(null);
  const [validTill, setValidTill] = useState(null);
  const [couponName, setCouponName] = useState("");

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  useEffect(() => {
    if (coupon) {
      setCoupons(coupon.data);
    }
  }, [coupon]);

  function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
      return formattedDate;
    }
    return "";
  }

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const handleCouponTypeChange = (value) => {
    setCouponType(value);
  };


  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteCoupon(id));
  
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the coupon:", error);
    }
  };
  
  const handleEdit = (id) => {
    setEditCouponId(id);
    const couponToEdit = coupons.find((coupon) => coupon.id === id);
// console.log(couponToEdit.validTill)
    if (couponToEdit && couponToEdit.validTill) {
      const timestamp = parseInt(couponToEdit.validTill);
      if (!isNaN(timestamp)) {
        const formattedDate = new Date(timestamp).toISOString().split("T")[0];
        const res = moment(formattedDate);
        setCouponName(couponToEdit.couponName);
        setValidTill(res);
        setCouponType(couponToEdit.couponType);
        setAmount(couponToEdit.integerValue);
        setPercentage(couponToEdit.percentageValue);
      } else {
        console.error("Invalid timestamp:", couponToEdit.validTill);
      }
    } else {
      console.error(
        "Invalid couponToEdit object or validTill value:",
        couponToEdit
      );
    }
  };

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const couponData = {
        id:editCouponId,
        couponName,
        couponType,
        validTill: String(validTill),
        integerValue: String(amount),
        percentageValue: String(percentage),
      };

      const res = await dispatch(updateCoupon(couponData));
      console.log(res);

      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const tableContentStyle = {
    fontFamily: "Rajdhani",
    textAlign: "center",
  };

  const columns = [
    {
      title: "Coupon Name",
      dataIndex: "couponName",
      key: "couponName",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Valid Till",
      dataIndex: "validTill",
      key: "validTill",
      render: (text) => formatDate(text),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Coupon Type",
      dataIndex: "couponType",
      key: "couponType",
      render: (text, record) => {
        if (text === "INTEGER") {
          return `Amount`;
        } else if (text === "PERCENT") {
          return `Percentage`;
        } else {
          return "Unknown Coupon Type";
        }
      },
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Amount",
      dataIndex: "integerValue",
      key: "integerValue",
      render: (text, record) => (record.couponType === "INTEGER" ? text : "-"),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
    {
      title: "Percentage",
      dataIndex: "percentageValue",
      key: "percentageValue",
      render: (text, record) =>
        record.couponType === "PERCENT" ? `${text}%` : "-",
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
          <Button className="allcoupon-edit-btn" onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button type="danger" onClick={()=>handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
      onCell: () => {
        return {
          style: tableContentStyle,
        };
      },
    },
  ];

  return (
    <>
      <Table dataSource={coupons} columns={columns} />
      {editCouponId && (
        <Form
          name="myForm"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleUpdate}
          initialValues={{
            couponName,
            couponType,
            validTill,
            amount,
            percentage,
          }}
        >
          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24} md={12}>
              <Form.Item
                label="Coupon Slug"
                name="couponName"
                rules={[
                  { required: true, message: "Please enter coupon slug" },
                ]}
              >
                <Input onChange={(e) => setCouponName(e.target.value)} />
              </Form.Item>
            </Col>

            <Col lg={12} sm={24} xs={24} md={12}>
              <Form.Item
                label="Valid till"
                name="validTill"
                rules={[
                  { required: true, message: "Please select valid till" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(date) => {
                    const timestamp = new Date(date).getTime();
                    const adjustedTimestamp = timestamp - 330 * 60 * 1000;
                    setValidTill(adjustedTimestamp);
                  }}
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24} md={12}>
              <Form.Item
                label="Select Coupon Type"
                name="couponType"
                rules={[
                  { required: true, message: "Please select coupon type" },
                ]}
              >
                <Select
                  placeholder="Select coupon type"
                  style={{ width: "100%" }}
                  onChange={handleCouponTypeChange}
                >
                  <Select.Option value="INTEGER">Add Amount</Select.Option>
                  <Select.Option value="PERCENT">Add Percentage</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {couponType === "INTEGER" && (
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item
                  label="Add Amount"
                  name="amount"
                  rules={[{ required: true, message: "Please enter amount" }]}
                >
                  <Input onChange={(e) => setAmount(e.target.value)} />
                </Form.Item>
              </Col>
            )}
            {couponType === "PERCENT" && (
              <Col lg={12} sm={24} xs={24} md={12}>
                <Form.Item
                  label="Add Percentage"
                  name="percentage"
                  rules={[
                    { required: true, message: "Please enter percentage" },
                  ]}
                >
                  <Input onChange={(e) => setPercentage(e.target.value)} />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Form.Item>
            <Button className="allcoupon-btn" htmlType="submit" >
              Update Coupon
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AllCoupon;
