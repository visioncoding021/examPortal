import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Subject.module.css";

function Subject() {
  const [display, setDisplay] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.get("http://localhost:3000/subject");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    fetchSubjects();
  }, [status]);

  const handleAddSubject = () => {
    setDisplay(true);
  };

  const handleCloseAdd = () => {
    setDisplay(false);
    setNewSubject("");
  };

  const handleInput = (e) => {
    setNewSubject(e.target.value);
  };

  const handleAddNewSubject = async () => {
    try {
      await axios.post("http://localhost:3000/subject", { subject_name: newSubject });
      setStatus("added");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/subject/${id}`);
      setStatus("deleted");
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  return (
    <div id={style.content}>
      <div id={style.displayHeadingBox}>
        <h2>Subject List</h2>
      </div>
      <div id={style.tableBox}>
        <table>
          <thead>
            <tr>
              <th id={style.center}>Subject Name</th>
              <th id={style.center}>Options</th>
            </tr>
          </thead>
          <tbody id={style.tbody}>
            {subjects.map((data, i) => (
              <tr key={i}>
                <td>{data.subject_name}</td>
                <td>
                  <button onClick={() => deleteSubject(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id={style.addSubjectBox}>
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>
      <div id={style.addBox} style={{ display: display ? "block" : "none" }}>
        <label htmlFor="">Enter Subject</label>
        <input type="text" value={newSubject} onChange={handleInput} placeholder="Enter Subject name" />
        <div id={style.buttonBox}>
          <button onClick={handleAddNewSubject}>Add</button>
          <button onClick={handleCloseAdd}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Subject;
