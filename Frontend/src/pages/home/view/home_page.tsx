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
    "http://localhost:3002/home/getStudentActiveCourse/" + email
  ).data;

  if (!studentData) {
    return <p>there's no active Course</p>;
  }

  return (
    <div>
      <p className="section-title">Active Course</p>
      <div className="active-course-list-home">
        {data.map((d: any) =>
          studentData.indexOf(d.id) != -1 ? (
            <Card
              key={d.id}
              title={d.CourseName}
              session={d.Sessions}
              chapter={d.Chapters}
              img={d.CourseImage}
              id={d.id}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const data = useFetch("http://localhost:3002/home/getCourses").data;
  const data2 = useFetch("http://localhost:3002/home/getPopularCourse").data;

  const [userEmail, setUserEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    setUserEmail(user?.email);
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
    slidesToScroll: 1,
    swipeToSlide: true,
    infinite: false,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      {/* {data2? <p>{data2[0]}</p>:null} */}
      <StudentNav />
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
              {isLogin && <Link to="/register">Get Started</Link>}
            </div>
          </div>
        )}

        <p className="section-title">Popular Course</p>

        <div className="popolarCourseSliderContainer">
          <Slider {...settings}>
            {data2 != null
              ? data
                  .slice(0, 4)
                  .map((d: any) =>
                    data2.indexOf(d.id) !== -1 ? (
                      <Card
                        key={d.id}
                        title={d.CourseName}
                        session={d.Sessions}
                        chapter={d.Chapters}
                        img={d.CourseImage}
                        id={d.id}
                      />
                    ) : null
                  )
              : null}
            <LastCard />
          </Slider>
        </div>
        {isLogin && <ActiveCourse email={userEmail} data={data} />}
      </div>
    </>
  );
};

export default HomePage;
