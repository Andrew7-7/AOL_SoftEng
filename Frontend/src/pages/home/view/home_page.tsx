import { useState, useRef } from "react";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import salyPic from "../../../global/assets/Saly-38.png";
import { Link } from "react-router-dom";
import { Card, LastCard } from "../../../global/components/homepage/popular_course_card";
import "./home_css.css";
import { List } from "../../../global/components/homepage/featured_card";
import { useDraggable } from "react-use-draggable-scroll";
import useFetch  from "../../../global/hooks/useFetch"

interface Data {

} 

const HomePage = () => {
  const imgPlaceHolder =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  const titlePlaceHolder = "Introduction to C programming";

  const [img, setImg] = useState(imgPlaceHolder);
  const [title, setTitle] = useState(titlePlaceHolder);
  const [session, setSession] = useState("10");
  const [chapter, setChapter] = useState("8");


  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); 
  const data:any = useFetch("http://localhost:3002/course/getCourses").data
  // const { data } = useFetch("http://localhost:3002/tutor/getTutors");

  // console.log(useFetch("http://localhost:3002/course/getPopularCourses"))
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");

  const activeCourse = () => {
    <p className = "section-title">Active Course</p>
  }

  return (
    <>
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
          {data.slice(0, 6).map((d:any) =>
            <Card 
              title = {d.CourseName} 
              session = {d.Sessions}
              chapter = {d. Chapters}
              img = {d.CourseImage}
            />
          )}
          <LastCard />
          {/* <Card img={img} title={title} session={session} chapter={chapter} /> */}
        </div>

          
      </div>
    </>
  );
};

export default HomePage;
