import React, { ChangeEvent, useEffect, useState } from "react";
import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./activeClass_css.css";
import peopleImage from "../../../../global/assets/ic_baseline-people.png";
import prevImage from "../../../../global/assets/left.png";
import nextImage from "../../../../global/assets/next.png";
import axios from "axios";
import { IClass } from "../../../../global/model/class-interface";
import { useNavigate } from "react-router-dom";

const ActiveClass = () => {
  const [classList, setClassList] = useState<IClass[]>([]);
  const [searchClass, setSearchClass] = useState<IClass[]>([]);

  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const accToken = window.localStorage.getItem("accToken");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  useEffect(() => {
    const getActiveClass = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/tutor/getActiveClass",
          { tutorEmail: user.email },
          {
            headers: {
              auth: `Bearer ${accToken}`,
            },
          }
        );
        if (res.status === 200) {
          setClassList(res.data);
          setSearchClass(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getActiveClass();
  }, []);
  const ActiveClassCard = ({
    id,
    title,
    classID,
    totalPeople,
    totalSession,
    totalDone,
  }: {
    id: string;
    title: string;
    classID: number;
    totalPeople: number;
    totalSession: number;
    totalDone: number;
  }) => {
    const handleActiveClick = () => {
      navigate(`/activeClassDetail/${id}`);
    };
    return (
      <>
        <div className="ActiveClassCard" onClick={handleActiveClick}>
          <div className="ActiveClassCardUpper">
            <p className="ActiveClassCardTitle">{title}</p>
            <p className="ActiveClassCardSubtitle">Class {classID}</p>
            <p className="ActiveClassCardSubtitle">
              <img className="peopleImage" src={peopleImage} /> {totalPeople}
            </p>
          </div>
          <div className="ActiveClassCardBottom">
            {totalDone} / {totalSession} session(s) completed
          </div>
        </div>
      </>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchClass.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (search === "") {
      setSearchClass(classList);
    } else {
      setSearchClass(
        classList.filter((item) =>
          item.course.courseName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <div className="outerDiv">
        <TutorNav clickedItem="Active Class" />
        <div className="activeClassRight">
          <p className="activeClassTitle">Active Class</p>
          <input
            className="searchBar"
            placeholder="Search"
            type="search"
            onChange={handleInputChange}
          ></input>
          <div className="activeClassCardContainer">
            {currentItems.map((item, index) => (
              <ActiveClassCard
                key={index}
                id={item.id}
                title={item.course.courseName}
                classID={item.classId}
                totalDone={
                  item.sessions.filter((session: any) => session.done).length
                }
                totalSession={item.course.totalSession}
                totalPeople={item.student.length}
              />
            ))}
          </div>
          <div className="pagination">
            <img
              onClick={() =>
                currentPage === 1 ? () => {} : paginate(currentPage - 1)
              }
              className="prevImage"
              src={prevImage}
            />
            {Array.from({
              length: Math.ceil(searchClass.length / itemsPerPage),
            }).map((_, index) => (
              <button
                className={`paginationButton ${
                  currentPage - 1 === index ? "paginationClicked" : null
                }`}
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <img
              onClick={() =>
                currentPage === Math.ceil(classList.length / itemsPerPage)
                  ? () => {}
                  : paginate(currentPage + 1)
              }
              className="prevImage"
              src={nextImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveClass;
