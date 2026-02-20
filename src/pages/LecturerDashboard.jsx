import { useState } from "react";
import API from "../api";

function LecturerDashboard() {
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [language, setLanguage] = useState("java");
  const [deadline, setDeadline] = useState("");
  const [score, setScore] = useState(100);
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newCases = [...testCases];
    newCases[index][field] = value;
    setTestCases(newCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/assignments", {
        title,
        module,
        language,
        deadline,
        score,
        testCases,
      });
      alert("✅ Assignment created!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create assignment");
    }
  };

  // Styling
  const containerStyle = {
    maxWidth: "520px",
    margin: "40px auto",
    padding: "32px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    fontFamily: "Segoe UI, Arial, sans-serif"
  };
  const headingStyle = {
    color: "#1e293b",
    marginBottom: "18px"
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  };
  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "15px"
  };
  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "4px"
  };
  const testCaseBoxStyle = {
    background: "#f1f5f9",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    gap: "8px"
  };
  const buttonStyle = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px"
  };
  const addButtonStyle = {
    ...buttonStyle,
    background: "#64748b",
    fontSize: "14px",
    padding: "7px 14px",
    marginTop: "0"
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Lecturer Dashboard - Create Assignment</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Title</label>
          <input
            style={inputStyle}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Module</label>
          <input
            style={inputStyle}
            placeholder="Module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Language</label>
          <select
            style={inputStyle}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Deadline</label>
          <input
            style={inputStyle}
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Score</label>
          <input
            style={inputStyle}
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>

        <div>
          <h4 style={{ margin: "18px 0 8px 0", color: "#334155" }}>Test Cases</h4>
          {testCases.map((tc, i) => (
            <div key={i} style={testCaseBoxStyle}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Input"
                value={tc.input}
                onChange={(e) => handleTestCaseChange(i, "input", e.target.value)}
                required
              />
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Expected Output"
                value={tc.expectedOutput}
                onChange={(e) => handleTestCaseChange(i, "expectedOutput", e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" style={addButtonStyle} onClick={handleAddTestCase}>
            + Add Test Case
          </button>
        </div>
        <button type="submit" style={buttonStyle}>Create Assignment</button>
      </form>
    </div>
  );
}

export default LecturerDashboard;