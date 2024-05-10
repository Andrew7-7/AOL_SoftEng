import "./App.css";
// import { Route, Routes } from "react-router-dom";

// import StudentNav from "../public/components/navbar/student/student_navbar";

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
import PickTutorPage from "./pages/pickTutor/view/pick_tutor_page.tsx";
function App() {
  return (
    <>
      <Routes>
        {/* Is Banned */}
        <Route path="/banned" element={<IsBanned />}></Route>

        {/* Verify Token */}
        <Route element={<VerifyToken />}>
          <Route path="/" element={<HomePage />}></Route>

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
            </Route>

            <Route element={<CheckRole role={"student"} />}>
              <Route path="/:courseId/pickTutor" element={<PickTutorPage />} />
            </Route>

            {/* Tutor Only Pages */}
            <Route element={<CheckRole role={"tutor"} />}>
              <Route path="/tutorDummy" element={<TutorDummy />}></Route>
            </Route>

            {/* Admin Only Pages */}
            <Route element={<CheckRole role={"admin"} />}>
              <Route path="/adminDummy" element={<AdminDummy />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
