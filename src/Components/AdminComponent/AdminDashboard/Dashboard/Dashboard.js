import style from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [examCount, setExamCount] = useState("Loading...");
  const [questionCount, setQuestionCount] = useState("Loading...");
  const [userCount, setUserCount] = useState("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const examResponse = await axios.get("http://localhost:3000/exam");
        setExamCount("We have total " + examResponse.data.length + " exams");

        const questionResponse = await axios.get("http://localhost:3000/question");
        setQuestionCount("We have total " + questionResponse.data.length + " questions");

        const userResponse = await axios.get("http://localhost:3000/user");
        setUserCount("We have total " + userResponse.data.length + " users");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    }
    fetchData();
  }, []);

  const history = useHistory();

  function navigateTo(path) {
    history.push(`/AdminDashboard/${path}`);
  }

  return (
    <div className={style.dashboard}>
      <div className={style.heading}>
        <h1>Dashboard</h1>
      </div>

      <div className={style.box} onClick={() => navigateTo('Exam')}>
        <p className={style.count}>{examCount}</p>
        <button className={style.detailsButton}>View Details</button>
      </div>

      <div className={style.box} onClick={() => navigateTo('Question')}>
        <p className={style.count}>{questionCount}</p>
        <button className={style.detailsButton}>View Details</button>
      </div>

      <div className={style.box} onClick={() => navigateTo('StudentList')}>
        <p className={style.count}>{userCount}</p>
        <button className={style.detailsButton}>View Details</button>
      </div>
    </div>
  );
}

export default Dashboard;
