import React from "react";
import { Tabs } from "antd";
import "./RegistrationForm.css";
import CreateNewForm from "./createNewForm/CreateNewForm";
import AllForms from "./AllForms/AllForms";
import DefaultCoupon from "./defaultCoupon/DefaultCoupon";
import Affiliate from "./affiliate/Affiliate";

const { TabPane } = Tabs;





const RegistrationForm = () => {
  return (
    <div className="registration-form-container">
    <div className="registration-form-subcontainer">
      <Tabs defaultActiveKey="1" tabPosition="top">
        <TabPane tab="Create New Form" key="1">
          <CreateNewForm />
        </TabPane>
        <TabPane tab="All Forms" key="2">
          <AllForms />
        </TabPane>
        <TabPane tab="Apply Default Coupon" key="3">
          <DefaultCoupon />
        </TabPane>
        <TabPane tab="Affiliate Course Commission" key="4">
         <Affiliate />
        </TabPane>
      </Tabs>
      </div>
    </div>
  );
};

export default RegistrationForm;
