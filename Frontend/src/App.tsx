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
import AdminDummy from "./pages/admin/dummy/permissionManagement.tsx";
import IsBanned from "./pages/error/isBanned/isBanned";
// import ContactSidebar from "./pages/sidebar/contactSidebar";
import ChatPage from "./pages/chat/chatPage";
import ForumPage from "./pages/forum/forumPage";
import RepliesPage from "./pages/replies/RepliesPage";
import AddForum from "./pages/forum/addForum.tsx";

import PickTutorPage from "./pages/pickTutor/view/pick_tutor_page.tsx";
import ActiveCourse from "./pages/activecourse/view/activecourse_page";
import TutorDetailPage from "./pages/tutorDetail/view/tutor_detail_page.tsx";
import CourseDetailPage from "./pages/coursedetail/view/course_detail_page.tsx";
import AccountManagementPage from "./pages/admin/accountManagement/view/accountManagementPage";
import CourseManagementPage from "./pages/admin/courseManagement/view/course_management_page.tsx";
import CourseUpdatePage from "./pages/admin/courseUpdate/course_update_page.tsx";
import CreateCoursePage from "./pages/admin/createCourse/create_course_page.tsx";
import ActiveClass from "./pages/tutor/activeClass/view/activeClass.tsx";
import ActiveClassDetail from "./pages/tutor/activeClassDetail/view/activeClassDetail.tsx";
import CoursesPage from "./pages/applyCourses/courseList.tsx";
import PaymentPage from "./pages/paymentpage/view/payment_page.tsx";
import ConfirmedPage from "./pages/paymentpage/view/confirmed_page.tsx";
import ReportReviewPage from "./pages/admin/reportReview/reportReview.tsx";
import PermissionManagementPage from "./pages/admin/permissionManagement/view/permissionManagement_page.tsx";
import PermissionManagementDetailPage from "./pages/admin/permissionManagement/view/permissionManagementDetail_page.tsx";

function App() {
  return (
    <>
      <Routes>
        {/* Is Banned */}
        <Route path="/banned" element={<IsBanned />}></Route>

					{/* Butuh Login */}
					<Route element={<NeedLogin />}>
						<Route path="/chat/:tutorId" element={<ChatPage />}></Route>
						<Route path="/reply" element={<ForumPage />}></Route>
						<Route path="/replies/:forumId" element={<RepliesPage />}></Route>
						{/* Student Only Pages */}
						<Route element={<CheckRole role={"student"} />}>
							<Route path="/profile" element={<ProfilePage />}></Route>
						</Route>
						<Route
							path="/activecourse/:courseId"
							element={<CourseDetailPage />}
						/>
						<Route path="/activecourse" element={<ActiveCourse />}></Route>
						<Route path="/:courseId/pickTutor" element={<PickTutorPage />} />
						<Route
							path="/:courseId/pickTutor/:tutorId"
							element={<TutorDetailPage />}
						/>
						<Route
							path="/:courseId/:tutorId/payment"
							element={<PaymentPage />}
						/>
						<Route
							path="/:courseId/:tutorId/payment/confirmed"
							element={<ConfirmedPage />}
						/>
						{/* Tutor Only Pages */}
						<Route element={<CheckRole role={"tutor"} />}>
							<Route path="/tutorDummy" element={<TutorDummy />}></Route>
							<Route path="/activeClass" element={<ActiveClass />}></Route>
							<Route
								path="/activeClassDetail/:id"
								element={<ActiveClassDetail />}
							/>
						</Route>
						{/* Admin Only Pages */}
						<Route element={<CheckRole role={"admin"} />}>
							<Route path="/adminDummy" element={<AdminDummy />}></Route>
							<Route
								path="/permissionManagement"
								element={<PermissionManagementPage />}
							/>
							<Route
								path="/permissionManagement/:permissionId"
								element={<PermissionManagementDetailPage />}
							/>
							<Route
								path="/accountManagement"
								element={<AccountManagementPage />}
							/>
							<Route
								path="/courseManagement"
								element={<CourseManagementPage />}
							/>
							<Route
								path="/courseManagement/:courseId"
								element={<CourseUpdatePage />}
							/>
							<Route path="/reportReview" element={<ReportReviewPage />} />
							<Route path="/createCourse" element={<CreateCoursePage />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
