import "./App.css";
import { Route, Routes } from "react-router-dom";

import StudentNav from "../public/components/navbar/student/student_navbar";

// Pages
import HomePage from "./pages/home/view/home_page";
import LoginPage from "./pages/login/view/login_page";
import RegisterPage from "./pages/register/view/register_page";
import AlreadyLoggedIn from "./middleware/alreadyLoggedIn";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        {/* Kalau udah login gabisa login register lagi */}
        <Route element={<AlreadyLoggedIn />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
