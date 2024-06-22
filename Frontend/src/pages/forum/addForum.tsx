import React, { useState } from "react";
import "./addForum.css";
import StudentNav from "../../global/components/navbar/student/student_navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../global/components/footer/Footer";

const AddForum = () => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const [question, setQuestion] = useState("");
  const [detailSnippet, setDetailSnippet] = useState("");
  const [courseName, setCourseName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (question === "" || detailSnippet === "" || courseName === "") {
      setErrorMessage("* All fields must be filled");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3002/forum/postForum",
        {
          course: { color: "rgb(241, 124, 65)", courseName },
          detailSnippet,
          question,
          forumDetail: {
            imageURL: "",
            sender: {
              senderEmail: user.email,
              senderImageUrl: user.imageURL || "",
            },
          },
        },
        {
          headers: {
            auth: `Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/reply");
      }
      if (response.status !== 200) {
        throw new Error("Failed to add forum");
      }

      setQuestion("");
      setDetailSnippet("");
      setCourseName("");
      setColor("");
    } catch (error) {
      console.error("Error adding forum:", error);
    }
  };

  return (
    <>
      <StudentNav />
      <Link to={"/reply"} className="backForumAdd">
        Back
      </Link>
      <div className="forum-page">
        <div className="forum-header">
          <h1>FORUM PAGE</h1>
          <p>#sharingiscaring</p>
        </div>
        <form className="forum-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Question's Title:</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type here ..."
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={detailSnippet}
              onChange={(e) => setDetailSnippet(e.target.value)}
              placeholder="Type here ..."
            />
          </div>
          <div className="form-group">
            <label>Related Course name to this question:</label>
            <textarea
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Type here ..."
            />
          </div>
          <p>{errorMessage}</p>
          <button type="submit" className="submit-button">
            Post Question
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddForum;
