import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import style from "../SubjectComponent/Subject.module.css";

function Exam() {
  const [display, setDisplay] = useState(false);
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState({
    exam_name: "",
    exam_desc: "",
    exam_level: "",
    exam_passMarks: "",
    exam_totalQuestion: "",
    exam_marks: "",
    exam_date: ""
  });

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await axios.get("http://localhost:3000/Exam");
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    }
    fetchExams();
  }, []);

  const handleAddExam = () => {
    setDisplay(true);
  };

  const handleCloseExam = () => {
    setDisplay(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExam(prevExam => ({
      ...prevExam,
      [name]: value,
      exam_date: new Date().toLocaleString()
    }));
  };

  const addNewExam = async () => {
    try {
      await axios.post("http://localhost:3000/Exam", exam);
      setExams([]); // To trigger re-render and fetch updated exam list
    } catch (error) {
      console.error("Error adding new exam:", error);
    }
  };

  const deleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/exam/${id}`);
      setExams([]); // To trigger re-render and fetch updated exam list
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Exam List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Exam Desc.</th>
              <th>Exam Creation Date</th>
              <th>Exam Level</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((data, i) => (
              <tr key={i}>
                <td>{data.exam_name}</td>
                <td>{data.exam_desc}</td>
                <td>{data.exam_date}</td>
                <td>{data.exam_level}</td>
                <td>
                  <NavLink exact to={`/AdminDashboard/Exam/Details/${data.id}`}>
                    <button>Details</button>
                  </NavLink>

                  <NavLink exact to={`/AdminDashboard/Exam/ViewQuestion/${data.id}`}>
                    <button>View Question</button>
                  </NavLink>

                  <NavLink exact to={`/AdminDashboard/Exam/AddQuestion/${data.id}`}>
                    <button>Add Question</button>
                  </NavLink>

                  <button onClick={() => deleteExam(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={handleAddExam}>Add Exam</button>
      </div>

      {display && (
        <div id={style.addBox}>
          <label htmlFor="exam_name">Enter Exam Name</label>
          <input onChange={handleInputChange} name="exam_name" type="text" placeholder="Enter Exam Name" />

          {/* Add other input fields */}

          <div id={style.buttonBox}>
            <button onClick={addNewExam}>Add</button>
            <button onClick={handleCloseExam}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Exam;
