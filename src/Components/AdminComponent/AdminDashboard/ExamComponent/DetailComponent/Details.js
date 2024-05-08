import style from "../../SubjectComponent/Subject.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
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
    async function getExamDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/Exam/${id}`);
        setExam(response.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        // Handle error
      }
    }
    getExamDetails();
  }, [id]);

  let history = useHistory();

  function handleGoBack() {
    history.push("/AdminDashboard/Exam");
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Exam Details</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <tbody>
            <tr>
              <th>Exam Name</th>
              <td>{exam.exam_name}</td>
            </tr>
            <tr>
              <th>Exam Description</th>
              <td>{exam.exam_desc}</td>
            </tr>
            <tr>
              <th>Exam Creation Date</th>
              <td>{new Date(exam.exam_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>Exam Total Marks</th>
              <td>{exam.exam_marks}</td>
            </tr>
            <tr>
              <th>Exam Total Question</th>
              <td>{exam.exam_totalQuestion}</td>
            </tr>
            <tr>
              <th>Exam Pass Marks</th>
              <td>{exam.exam_passMarks}</td>
            </tr>
            <tr>
              <th>Exam Level</th>
              <td>{exam.exam_level}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </>
  );
}

export default Details;
