import { ChangeEvent, useState } from "react";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import InputForm from "../../../global/components/textBox/InputForm";
import "./create_course.css";
import SelectForm from "../../../global/components/selectForm/SelectForm";
import trashcanRedIcon from "../../../global/assets/trash_can.svg";
import ErrorMessage from "../../../global/components/errorMessage/ErrorMessage";
import axios from "axios";
import LoadingMessage from "../../../global/components/loadingMessage/LoadingMessage";
import SuccessMessage from "../../../global/components/successMessage/SuccessMessage";
import WarningModal from "../../../global/components/warningModal/WarningModal";

const CreateCoursePage = () => {
  const [courseFormData, setCourseFormData] = useState({
    courseName: "",
    courseDescription: "",
    skill: "",
    totalSession: "",
    hourPerSession: "",
    chapterBreakdowns: [""],
  });

  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [success, setSuccess] = useState({
    message: "",
    show: false,
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "hourPerSession" || "totalSession") {
      const num = parseFloat(value);
      if (num < 1) {
        setCourseFormData((prevData) => ({
          ...prevData,
          [name]: "1",
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

  const handleError = (message: string) => {
    setError({
      message: message,
      show: true,
    });
    setTimeout(() => {
      setError({
        message: message,
        show: false,
      });
    }, 5000);
  };

  const handleSuccess = (message: string) => {
    setSuccess({
      message: message,
      show: true,
    });
    setTimeout(() => {
      setSuccess({
        message: message,
        show: false,
      });
    }, 5000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      courseFormData.courseName == "" ||
      courseFormData.courseDescription == "" ||
      courseFormData.hourPerSession == "" ||
      courseFormData.totalSession == "" ||
      courseFormData.skill == "" ||
      !selectedImage
    ) {
      handleError("Please input all required field");
      return;
    }

    for (const chapter of courseFormData.chapterBreakdowns) {
      if (chapter == "") {
        handleError("Please input all required fields");
        return;
      }
    }

    setSubmitLoading(true);
    try {
      const {
        courseName,
        courseDescription,
        skill,
        totalSession,
        hourPerSession,
        chapterBreakdowns,
      } = courseFormData;
      const res = await axios.post(
        "http://localhost:3002/course/createCourse",
        {
          courseName,
          courseDescription,
          skill,
          totalSession,
          hourPerSession,
          chapterBreakdowns,
          imageURL: selectedImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleSuccess(res.data.message);
    } catch (error: any) {
      console.log(error);
      return;
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="create-course-page">
      <ErrorMessage message={error.message} show={error.show} />
      <LoadingMessage show={submitLoading} />
      <SuccessMessage message={success.message} show={success.show} />
      <AdminNav clickedItem="Course" />
      <div className="content-section">
        <div className="page-center">
          <div className="header-section">
            <div className="header">Create Course</div>
          </div>
          <div className="content-container">
            <form className="form-outer-container">
              <div className="form-container">
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
                    label="Total sessions"
                    name="totalSession"
                    onChange={handleInputChange}
                    placeHolder="Insert total session"
                    type="number"
                    value={courseFormData.totalSession}
                  />
                  <InputForm
                    label="Hour per session"
                    name="hourPerSession"
                    onChange={handleInputChange}
                    placeHolder="Insert hour per session"
                    type="number"
                    value={courseFormData.hourPerSession}
                  />
                  <div className="image-input-form">
                    <div className="label">Course image</div>
                    <input
                      type="file"
                      id="imageInput"
                      onChange={handleImageChange}
                    />
                    <label className="custom-file-input" htmlFor="imageInput">
                      Upload image
                    </label>
                    {previewUrl && (
                      <>
                        <div className="image-preview">
                          <div>Image preview</div>
                          <img src={previewUrl} />
                        </div>
                      </>
                    )}
                  </div>
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
                        <div
                          className="delete-button"
                          onClick={() => deleteChapterBreakdown(index)}
                        >
                          <img className="red" src={trashcanRedIcon} alt="" />
                        </div>
                      </div>
                    ))}
                    <div className="add-button" onClick={addChapterBreakdown}>
                      + Add chapter
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="submit-button"
                type="submit"
                onClick={handleSubmit}
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
