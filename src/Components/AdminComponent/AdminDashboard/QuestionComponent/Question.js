import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../SubjectComponent/Subject.module.css";

function Question() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get("http://localhost:3000/question");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, []);

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
              <th>Option Four</th>
              <th>Question Answer</th>
              <th>Subject Name</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((data, i) => (
              <tr key={i}>
                <td>{data.question_name}</td>
                <td>{data.option_one}</td>
                <td>{data.option_two}</td>
                <td>{data.option_three}</td>
                <td>{data.option_four}</td>
                <td>{data.question_answer}</td>
                <td>{data.subject_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Question;
