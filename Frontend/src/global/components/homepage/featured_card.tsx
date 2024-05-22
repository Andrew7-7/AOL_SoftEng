import { Link } from "react-router-dom";
import "./featured_card.css";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedCard1 = () => {

  return (
    <>
      <div className="main-card">
        <div className="left-card1">
          <p>Get 50% Off On HTML Programming Language</p>
          <div>
            <img
              className="discountIcon"
              src="https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/asset%2F50%25off.png?alt=media&token=66cb3eca-4410-48f4-b49c-58874f80d7e8"
            />
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="right-card1">
          <img src="https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/asset%2Ffeatured-card-1.png?alt=media&token=918819c7-fc72-46e7-9fae-63935bfb7f44" />
        </div>
      </div>
    </>
  );
};

const FeaturedCard2 = () => {
  return (
    <>
      <div className="main-card2">
        <p>Get 40% Off On C Programming Language</p>
        <div className = "card2-detail">
          <img
            className="clogo"
            src="https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/asset%2FClogo.png?alt=media&token=30b13dbc-5b5c-41df-bcf9-fbd8882a55a4"
          />
          <Link to="/">Learn More</Link>
        </div>
      </div>
    </>
  );
};

export const List = () => {
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 6000,
  }

  return(
    <div style = {{position:"relative"}}>
      <Slider className="featured-list" {...settings} >
        <FeaturedCard1/>
        <FeaturedCard2 />
      </Slider>
      <button className="buttonNext">
        <img src="https://www.freeiconspng.com/uploads/arrow-icon--myiconfinder-23.png"/>
        </button>
        <button className="buttonPrev">
          <img src="https://www.freeiconspng.com/uploads/arrow-icon--myiconfinder-23.png"/>
        </button>
    </div>  
  )
}
