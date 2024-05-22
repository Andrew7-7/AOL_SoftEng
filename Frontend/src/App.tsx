import "./App.css";
import { Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/home/view/home_page";
import LoginPage from "./pages/login/view/login_page";
import RegisterPage from "./pages/register/view/register_page";
import AlreadyLoggedIn from "./middleware/alreadyLoggedIn";
import VerifyToken from "./middleware/verifyToken";
import ProfilePage from "./pages/profile/view/profile_page";
import NeedLogin from "./middleware/needLogin";
import CheckRole from "./middleware/checkRole";
import TutorDummy from "./pages/tutor/dummy/tutorDummy";
import AdminDummy from "./pages/admin/dummy/adminDummy";
import IsBanned from "./pages/error/isBanned/isBanned";
import ChatPage from "./pages/chat/chatPage";
import PickTutorPage from "./pages/pickTutor/view/pick_tutor_page.tsx";
import ActiveCourse from "./pages/activecourse/view/activecourse_page";
import TutorDetailPage from "./pages/tutorDetail/view/tutor_detail_page.tsx";
import CourseDetailPage from "./pages/coursedetail/view/course_detail_page.tsx";
import CourseDescriptionPage from "./pages/coursedetail/view/CourseDescriptionPage.tsx";
import AccountManagementPage from "./pages/admin/accountManagement/view/accountManagementPage";
function App() {
  return (
    <>
      <Routes>
        {/* Is Banned */}
        <Route path="/banned" element={<IsBanned />}></Route>

        <Route path="/" element={<HomePage />}></Route>
        {/* Verify Token */}
        <Route element={<VerifyToken />}>
          {/* Kalau udah login gabisa login register lagi */}
          <Route element={<AlreadyLoggedIn />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>

          {/* Butuh Login */}
          <Route element={<NeedLogin />}>
            {/* Student Only Pages */}
            <Route element={<CheckRole role={"student"} />}>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="/activecourse" element={<ActiveCourse />}></Route>
              <Route path="/:courseId/pickTutor" element={<PickTutorPage />} />
              <Route path="/pickTutor/:tutorId" element={<TutorDetailPage />} />
              <Route path="/activecourse/:courseId" element={<CourseDetailPage />} />
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/contoh" element={<CourseDescriptionPage />}></Route>
            </Route>

            {/* Tutor Only Pages */}
            <Route element={<CheckRole role={"tutor"} />}>
              <Route path="/tutorDummy" element={<TutorDummy />}></Route>
            </Route>

            {/* Admin Only Pages */}
            <Route element={<CheckRole role={"admin"} />}>
              <Route path="/adminDummy" element={<AdminDummy />}></Route>
              <Route
                path="/accountManagement"
                element={<AccountManagementPage />}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
