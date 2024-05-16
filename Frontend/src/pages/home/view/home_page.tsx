import { useState, useRef, useEffect } from "react";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import salyPic from "../../../global/assets/Saly-38.png";
import { Card, LastCard } from "../../../global/components/homepage/popular_course_card";
import "./home_css.css";
import { List } from "../../../global/components/homepage/featured_card";
import { useDraggable } from "react-use-draggable-scroll";
import useFetch  from "../../../global/hooks/useFetch"
import { Link, Route, Routes, useNavigate } from "react-router-dom";


const ActiveCourse = ({email, data}:any) => {
  const studentData:any = useFetch("http://localhost:3002/home/getStudent").data
  const userEmail = email;
  // console.log(studentData)
  let a:any = [];
  studentData.map((data:any) => (data.email == userEmail? a = Object.values(data.activeCourse) : null))

  return (
    <div>
      <p className = "section-title">Active Course</p>
      <div className="active-course-list">
        {data.map((d:any) => a.indexOf(d.CourseID) != -1?
              (<Card 
                title = {d.CourseName} 
                session = {d.Sessions}
                chapter = {d. Chapters}
                img = {d.CourseImage}
              />) : null
        )}
      </div>
    </div>
  ) 
}

const HomePage = () => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  // let data = null;
  const data = useFetch("http://localhost:3002/home/getCourses").data

  const [userEmail, setUserEmail] = useState("")
  const [isLogin, setIsLogin] = useState(false);

  useEffect (() => {
    const user= JSON.parse(window.localStorage.getItem("user") || "{}");
    setUserEmail(user?.username)

    if(userEmail == null){
      setIsLogin(false)
    }else{
      setIsLogin(true)
    }
  }, [])

  return (
    <>
    <Link to={"/1/pickTutor"}>Pcik Tutor Dummy</Link>
      <StudentNav />
      <div className="banner">
        <div className="banner-text">
          <p>UNLEASH YOUR CODING POTENTIAL WITH</p>
          <img src={"https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/asset%2FGroup%20140.png?alt=media&token=ab225761-6015-4d39-8d54-2fdb452749dc"} />
        </div>
        <div className="banner-picture">
          <img src={salyPic} />
        </div>
      </div>

      <div className="content">
        <p className="section-title">Featured</p>
        <div className="featured-list">
          <List />
        </div>

        <div className="getStarted">
          <div className="getStarted-button">
            <Link to="/activecourse">Get Started</Link>
          </div>
        </div>

        <p className="section-title">Popular Course</p>
        <div className="popularCourse"  {...events} ref={ref}>
            {data != null? (data.map((d:any) =>
              <Card 
                title = {d.CourseName} 
                session = {d.Sessions}
                chapter = {d. Chapters}
                img = {d.CourseImage}
              />
            )): null}
          <LastCard/>
        </div>
        {/* {isLogin && <ActiveCourse email = {userEmail} data = {data} />} */}
      </div>
    </>
  );
};

export default HomePage;