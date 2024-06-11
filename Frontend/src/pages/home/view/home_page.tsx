import { useState, useRef, useEffect } from "react";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import salyPic from "../../../global/assets/Saly-38.png";
import {
  Card,
  LastCard,
} from "../../../global/components/homepage/popular_course_card";
import "./home_css.css";
import { List } from "../../../global/components/homepage/featured_card";
import useFetch from "../../../global/hooks/useFetch";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ActiveCourse = ({ email, data }: any) => {
  const studentData: any = useFetch(
    "http://localhost:3002/home/getStudent"
  ).data;
  const userEmail = email;
  let a: any = [];
  if (studentData != null)
    studentData.map((data: any) =>
      data.email == userEmail ? (a = Object.values(data.activeCourse)) : null
    );

  return (
    <div>
      <p className="section-title">Active Course</p>
      <div className="active-course-list-home">
        {data != null
          ? data.map((d: any) =>
              a.indexOf(d.CourseID) != -1 ? (
                <Card
                  title={d.CourseName}
                  session={d.Sessions}
                  chapter={d.Chapters}
                  img={d.CourseImage}
                  id={d.id}
                />
              ) : null
            )
          : null}
      </div>
    </div>
  );
};

const HomePage = () => {
  //   const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  //   const { events } = useDraggable(ref);
  // let data = null;
  const data = useFetch("http://localhost:3002/home/getCourses").data;
  console.log(data);

  const [userEmail, setUserEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    setUserEmail(user?.username);

    if (userEmail == null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  });

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    infinite: false,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <StudentNav />
      {/* <Link to={"/1/pickTutor"}>Pcik Tutor Dummy</Link> */}
      <div className="bannerHome">
        <div className="banner-text-home">
          <p>UNLEASH YOUR CODING POTENTIAL WITH</p>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/asset%2FGroup%20140.png?alt=media&token=ab225761-6015-4d39-8d54-2fdb452749dc"
            }
          />
        </div>
        <div className="banner-picture-home">
          <img src={salyPic} />
        </div>
      </div>

      <div className="content">
        <p className="section-title">Featured</p>
        <div className="featured-list">
          <List />
        </div>

        {isLogin ? null : (
          <div className="getStartedHome">
            <div className="getStarted-button-home">
              <Link to="/register">Get Started</Link>
            </div>
          </div>
        )}

        <div className="popularCourseHomeDiv">
          <p className="section-title">Popular Course</p>
          <Link to="/activecourse" className="viewAllHome">View All</Link>
        </div>

        <Slider {...settings}>
          {data != null
            ? data
                .slice(0, 6)
                .map((d: any) => (
                  <Card
                    title={d.CourseName}
                    session={d.Sessions}
                    chapter={d.Chapters}
                    img={d.CourseImage}
                    id={d.id}
                  />
                ))
            : null}
          {/* <LastCard /> */}
        </Slider>
        {isLogin && <ActiveCourse email={userEmail} data={data} />}
      </div>
    </>
  );
};

export default HomePage;
