import React from "react";
import { Tabs } from "antd";
import Coupon from "./Coupon";
import AllCoupon from "./allCoupon/AllCoupon";
// import "./RegistrationForm.css";


const { TabPane } = Tabs;





const CouponCode = () => {
  return (
    <div className="registration-form-container">
    <div className="registration-form-subcontainer">
      <Tabs defaultActiveKey="1" tabPosition="top">
        <TabPane tab="Create New" key="1">
         <Coupon />
        </TabPane>
        <TabPane tab="All Coupons" key="2">
       <AllCoupon />
        </TabPane>
      </Tabs>
      </div>
    </div>
  );
};

export default CouponCode;
