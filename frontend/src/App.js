import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [assignments, setAssignments] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictRisk = async () => {

    if (!attendance || !marks || !assignments) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

      const res = await axios.post(`${API}/predict`, {
        attendance: parseFloat(attendance),
        marks: parseFloat(marks),
        assignments: parseInt(assignments)
      });



      setResult(res.data);

    } catch (error) {
      alert("Cannot connect to backend");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <div className="card">
        <h1>🎓 Student Dropout Risk Predictor</h1>

        <input placeholder="Attendance (%)"
          onChange={e => setAttendance(e.target.value)} />

        <input placeholder="Marks"
          onChange={e => setMarks(e.target.value)} />

        <input placeholder="Assignments Submitted"
          onChange={e => setAssignments(e.target.value)} />

        <button onClick={predictRisk}>Predict</button>

        {loading && <p className="loading">Analyzing student performance...</p>}

        {result && (
          <div className={result.prediction === "At Risk" ? "result risk" : "result safe"}>
            <h2>{result.prediction}</h2>
            <p>Risk Probability: {result.risk_probability}%</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default App;
