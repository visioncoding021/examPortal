import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import style from "../../SubjectComponent/Subject.module.css";

function ViewQuestion() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [updatedQ, setUpdatedQ] = useState({});
  const [display, setDisplay] = useState(false);
  const [check, setCheck] = useState(false);
  const [d, setD] = useState(false);

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const response = await axios.get("http://localhost:3000/question");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getAllQuestions();
  }, []);

  const history = useHistory();

  const handleEditQuestion = (questionId) => {
    setDisplay(true);
    setUpdatedQ(questions.find((q) => q.id === questionId) || {});
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const onTextFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedQ((prev) => ({ ...prev, [name]: value }));
  };

  const updateQuestion = async () => {
    try {
      await axios.put(`http://localhost:3000/question/${updatedQ.id}`, updatedQ);
      setCheck(true);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:3000/question/${questionId}`);
      setD(true);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (check || d) {
    return <ViewQuestion />;
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h2>Question List</h2>
      </div>

      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th>Question Name</th>
              <th>Option one</th>
              <th>Option two</th>
              <th>Option three</th>
              <th>Option four</th>
              <th>Question Answer</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((data) => {
              if (parseInt(data.exam_id) === parseInt(id)) {
                return (
                  <tr key={data.id}>
                    <td>{data.question_name}</td>
                    <td>{data.option_one}</td>
                    <td>{data.option_two}</td>
                    <td>{data.option_three}</td>
                    <td>{data.option_four}</td>
                    <td>{data.question_answer}</td>
                    <td>
                      <button onClick={() => handleEditQuestion(data.id)}>Edit</button>
                      <button onClick={() => deleteQuestion(data.id)}>Delete</button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <div id={style.addSubjectBox}>
        <button onClick={() => history.push("/AdminDashboard/Exam")}>Go Back</button>
      </div>

      {display && (
        <div id={style.addBox}>
          <label>Enter Question</label>
          <input value={updatedQ.question_name} onChange={onTextFieldChange} name="question_name" type="text" placeholder="Enter Question" />
          {/* Add other input fields */}
          <div id={style.buttonBox}>
            <button onClick={updateQuestion}>Update Question</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewQuestion;
