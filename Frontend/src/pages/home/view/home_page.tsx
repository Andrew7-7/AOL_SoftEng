import React, { useEffect } from "react";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <StudentNav />
      <Link to="/activecourse">ActiveCourse</Link>
      <Link to={"/1/pickTutor"}>Pcik Tutor Dummy</Link>
    </>
  );
};

export default HomePage;
