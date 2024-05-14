import { useState, useRef } from "react";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import salyPic from "../../../global/assets/Saly-38.png";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../../global/components/homepage/popular_course_card";
import "./home_css.css";
import { List } from "../../../global/components/homepage/featured_card";
import { useDraggable } from "react-use-draggable-scroll";

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
          <Card img={img} title={title} session={session} chapter={chapter} />
          <Card img={img} title={title} session={session} chapter={chapter} />
          <Card img={img} title={title} session={session} chapter={chapter} />
          <Card img={img} title={title} session={session} chapter={chapter} />
          <Card img={img} title={title} session={session} chapter={chapter} />
        </div>    
      </div>

    </>
  );
};

export default HomePage;
