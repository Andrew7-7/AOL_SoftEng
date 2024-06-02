import { ChangeEvent, useState } from "react";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import InputForm from "../../../global/components/textBox/InputForm";
import "./create_course.css";
import SelectForm from "../../../global/components/selectForm/SelectForm";
import trashcanRedIcon from "../../../global/assets/trash_can.svg";

const CreateCoursePage = () => {
  const [courseFormData, setCourseFormData] = useState({
    courseName: "",
    courseDescription: "",
    skill: "",
    hourPerSession: "",
    chapterBreakdowns: [""],
  });

  const skillLevelOption = [
    {
      id: "Beginer",
      name: "Beginer",
    },
    {
      id: "Intermediate",
      name: "Intermediate",
    },
    {
      id: "Advanced",
      name: "Advanced",
    },
  ];

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "hourPerSession") {
      const num = parseFloat(value);
      if (num < 1) {
        setCourseFormData((prevData) => ({
          ...prevData,
          [name]: "1", // Set the value to 1 if it is less than 1
        }));
        return;
      }
    }

    setCourseFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChapterBreakdownChange = (index: number, newValue: string) => {
    setCourseFormData((prevData) => {
      const updatedChapterBreakdowns = prevData.chapterBreakdowns.map(
        (item, i) => (i === index ? newValue : item)
      );
      return { ...prevData, chapterBreakdowns: updatedChapterBreakdowns };
    });
  };

  const addChapterBreakdown = () => {
    setCourseFormData((prevData) => ({
      ...prevData,
      chapterBreakdowns: [...prevData.chapterBreakdowns, ""],
    }));
  };

  const deleteChapterBreakdown = (index: number) => {
    if (courseFormData.chapterBreakdowns.length == 1) {
      return;
    }
    setCourseFormData((prevData) => {
      const updatedChapterBreakdowns = prevData.chapterBreakdowns.filter(
        (_, i) => i !== index
      );
      return { ...prevData, chapterBreakdowns: updatedChapterBreakdowns };
    });
  };

  return (
    <div className="create-course-page">
      <AdminNav clickedItem="Course" />
      <div className="content-section">
        <div className="page-center">
          <div className="content-container">
            <div className="header-section">
              <div className="header">Create Course</div>
              <form className="form-container">
                <div className="left">
                  <InputForm
                    label="Course name"
                    name="courseName"
                    onChange={handleInputChange}
                    placeHolder="Insert course name"
                    type="text"
                    value={courseFormData.courseName}
                  />
                  <InputForm
                    label="Course description"
                    name="courseDescription"
                    onChange={handleInputChange}
                    placeHolder="Insert course description"
                    type="textarea"
                    value={courseFormData.courseDescription}
                  />
                  <SelectForm
                    label="Select skill level"
                    name="skill"
                    onChange={handleInputChange}
                    value={courseFormData.skill}
                    options={skillLevelOption}
                  />
                  <InputForm
                    label="Hour per session"
                    name="hourPerSession"
                    onChange={handleInputChange}
                    placeHolder="Insert hour per session"
                    type="number"
                    value={courseFormData.hourPerSession}
                  />
                </div>
                <div className="right">
                  <p className="chapter-breakdown-label">Chapter breakdowns</p>
                  <div className="chapter-breakdown-outer-container">
                    {courseFormData.chapterBreakdowns.map((chapter, index) => (
                      <div className="chapter-breakdown-container">
                        <InputForm
                          key={index}
                          label=""
                          type="text"
                          placeHolder={`Insert chapter ${index + 1}`}
                          value={chapter}
                          name=""
                          onChange={(e) =>
                            handleChapterBreakdownChange(index, e.target.value)
                          }
                        />
                        {/* {index != 0 && ( */}
                        <div
                          className="delete-button"
                          onClick={() => deleteChapterBreakdown(index)}
                        >
                          <img className="red" src={trashcanRedIcon} alt="" />
                        </div>
                        {/* )} */}
                      </div>
                    ))}
                    <div className="add-button" onClick={addChapterBreakdown}>
                      + Add chapter
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
