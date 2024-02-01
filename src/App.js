import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScheduleBookingTable from "./componets/scheduleBooking/scheduleBookingTable/ScheduleBookingTable";
// import MainCurriculum from "./componets/admin/course/curriculum/maincurriculum/MainCurriculum";
// import AdminCurriculum from "./componets/admin/course/curriculum/AdminCurriculum";
import MyBooking from "./componets/scheduleBooking/myBooking/MyBooking";
import AddAdvisor from "./componets/admin/addAdvisor/AddAdvisor";
import CourseTable from "./componets/admin/courseTable/AllCourse";
import RegisterUser from "./componets/admin/registerUser/RegisterUser";
import ScheduleCall from "./componets/scheduleBooking/scheduleCall/ScheduleCall";
import CreatorLayout from "./componets/admin/creator-layout/CreatorLayout";
import Signup from "./componets/admin/creator-signup/Signup";
import Lectures from "./componets/user/course/lectures/Lectures";
import ViewAdvisor from "./componets/admin/viewAdvisor/ViewAdvisor";
import Curriculum from "./componets/user/course/curriculum/Curriculum";
import AllCourse from "./componets/user/course/allCourse/AllCourse";
import MyCourse from "./componets/user/course/MyCourse";
import Profile from "./componets/user/profile/Profile";
import MyLayout from "./componets/layout/MyLayout";
import FAQ from "./componets/user/faq/FAQ";
import Login from "./componets/login/Login";
import Home from "./componets/home/Home";
import Lead from "./componets/admin/lead/Lead";
import Members from "./componets/admin/members/Members";
import EWallet from "./componets/admin/eWallet/EWallet";
import SiteSetting from "./componets/admin/siteSetting/SiteSetting";
import CoursePreview from "./componets/admin/coursePreview/CoursePreview";
import SuperLayout from "./componets/superAdmin/superLayout/SuperLayout";
import LessonLayout from "./componets/admin/lessonLayout/LessonLayout";
import "./App.css";
import RegisterUsers from "./componets/user/register/RegisterUsers"; //for register user
import ShowCourseTable from "./componets/admin/showCourseTable/ShowCourseTable";
import CourseLayout from "./componets/admin/courseLayout/CourseLayout";
import LessonPreview from "./componets/lessonPreview/LessonPreview";
import SetupLayout from "./componets/SetupLayout/SetupLayout";
import PaymentDetailsForm from "./componets/razorpay/PaymentDetailForm";
import NewFormPage from "./componets/admin/forms/newFormPage/NewFormPage";
import Formats from "./componets/admin/forms/formats/Formats";
import Inline from "./componets/admin/forms/template/inline/Inline";
import EditForm from './componets/admin/forms/editForm/EditForm';
import StepForm from "./componets/admin/forms/stepForm/StepForm";
import AuthorDetails from "./componets/authorDetails/AuthorDetails";
import SendOtp from "./componets/user/forgetPassword/sendOtp/SendOtp";
import VerifyOtp from "./componets/user/forgetPassword/verifyOtp/VerifyOtp";
import GeneratePassword from "./componets/user/forgetPassword/generatePassword/GeneratePassword";
import SalesPage from "./componets/salesPage/SalesPage";
import UserLogin from "./componets/user/userLogin/UserLogin";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />    {/* for user login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/sign_in" element={<UserLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-users" element={<RegisterUsers />} />
          <Route path="/forget-password" element={<SendOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/generate-otp" element={<GeneratePassword />} />
          <Route path="/sales-page" element={<SalesPage />} />
          {/* for user register */}
          <Route path="/admin/*" element={<CreatorLayout />} />
          {/* <Route path="/curriculum" element={<AdminCurriculum />} /> */}
          <Route path="/curriculum" element={<ShowCourseTable />} />
          <Route path="/get-course/courses/:courseId" element={<CourseLayout />} />
          <Route path="/lesson/:lessonId" element={<LessonPreview />} />
          <Route path="/allcourse" element={<CourseTable />} />
          <Route path="/add-advisor" element={<AddAdvisor />} />
          <Route path="/view-advisor" element={<ViewAdvisor />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/schedule-call" element={<ScheduleCall />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/lesson/:lessonId/*" element={<LessonLayout />} />
          <Route path="/site-setting" element={<SiteSetting />} />
          <Route path="/preview" element={<CoursePreview />} />
          <Route path="/ewallet" element={<EWallet />} />
          <Route path="/schedule-booking" element={<ScheduleBookingTable />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/members" element={<Members />} />
          <Route path="/courses/new" element={<CreatorLayout />} />
          <Route path="/super-admin/*" element={<SuperLayout />} />
          <Route path="/user/*" element={<MyLayout />} />
          <Route path="/my-courses" element={<MyCourse />} />
          <Route path="/all-courses" element={<AllCourse />} />
          <Route path="/user/enrolled/:courseId" element={<Curriculum />} />
          <Route path="/lecture/:courseId" element={<Lectures />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin/course/setup/:courseId" element={<SetupLayout />} />
          <Route path="/payment/:courseId" element={<PaymentDetailsForm />} />
          <Route path="/forms/new" element={<NewFormPage />}/>
          <Route path="/forms/formats" element={<Formats />}/>  
          <Route path="/inline" element={<Inline />}/> 
          {/* <Route path="inline/edit/:id" element={<EditForm />}/>  */}
          <Route path="inline/edit/:id" element={<StepForm />}/> 
          <Route path="/admin/author-details/:courseId" element={<AuthorDetails />} />
        {/* Other routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
