import { combineReducers } from "redux";
import addAdmin from "./addAdmin/addAdmin";
import user from "./userType/userType";
import loginUser from "./loginUser/loginUser";
import course from "./course/course";
import section from "./section/section";
import changePassword from "./changeUserPassword/changeUserPassword";
import allCourseUser from "./allCourseUser/allCourseUser";
import lesson from "./lesson/lesson";
import video from "./addVideo/addVideo";
import pdf from "./addPdf/addPdf";
import userCourse from "./userCourse/userCourse";
import payment from "./paymentForm/paymentForm";
import userSection from "./userSection/userSection";
import userLesson from "./userLesson/userLesson";
import coupon from "./addCoupon/addCoupon";
import quiz from "./addQuiz/addQuiz";
import userQuiz from "./userQuiz/userQuiz";
import upsell from "./addUpsell/addUpsell";
import userAccount from "./userAccount/userAccount";
import ratio from "./addRatio/addRatio";
import userCoupon from "./userCoupon/userCoupon";
import template from "./addTemplate/addTemplate";
import assignment from "./addAssignment/addAssignment";
import userAssignment from "./userAssignment/userAssignment";
import form from "./addForm/addForm";
import forgetPassword from "./forgetPassword/forgetPassword";
import scheduleCall from "./scheduleCall/scheduleCall";
import userScheduleCall from "./userScheduleCall/userScheduleCall";
import userAffiliateLink from "./userAffiliateLink/userAffiliateLink";
import linkRequest from "./affiliateLink/affiliateLink";
import ppt from "./addPPT/addPPT";
import adminUser from "./adminUser/adminUser";
import saleLink from "./addSaleLink/addSaleLink";
import adminSaleLink from "./addAdminSaleLink/addAdminSaleLink";
import publicCourse from "./publicCourse/publicCourse";

export const reducers = combineReducers({
    addAdmin,
    user,
    loginUser,
    course,
    section,
    lesson,
    video,
    pdf,
    coupon,
    quiz,
    upsell,
    ratio,
    template,
    assignment,
    form,
    scheduleCall,
    linkRequest,
    ppt,
    adminUser,
    adminSaleLink,
    //for user
  
    forgetPassword,
    changePassword, 
    allCourseUser, 
    userCourse,
    payment,
    userSection,
    userLesson,
    userQuiz,
    userAccount,
    userCoupon,
    userAssignment,
    userScheduleCall,
    userAffiliateLink,
    saleLink,

    //public course
    publicCourse

    
});
