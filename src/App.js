import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScheduleBookingTable from "./componets/scheduleBooking/scheduleBookingTable/ScheduleBookingTable";
import MainCurriculum from "./componets/admin/course/curriculum/maincurriculum/MainCurriculum";
import AdminCurriculum from "./componets/admin/course/curriculum/AdminCurriculum";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-users" element={<RegisterUsers />} />{" "}
          {/* for user register */}
          <Route path="/admin/*" element={<CreatorLayout />} />
          {/* <Route path="/curriculum" element={<AdminCurriculum />} /> */}
          <Route path="/curriculum" element={<ShowCourseTable />} />
          <Route path="get-course/courses/:courseId" element={<CourseLayout />} />
          <Route path="/allcourse" element={<CourseTable />} />
          <Route path="/add-advisor" element={<AddAdvisor />} />
          <Route path="/view-advisor" element={<ViewAdvisor />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/schedule-call" element={<ScheduleCall />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/lesson/*" element={<LessonLayout />} />
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
          <Route path="/enrolled/:id" element={<Curriculum />} />
          <Route path="/lecture" element={<Lectures />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
