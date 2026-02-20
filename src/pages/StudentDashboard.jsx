import { useEffect, useState } from "react";
import API from "../api";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");

  const studentId = localStorage.getItem("studentId"); // Or use token payload
  const [submissions, setSubmissions] = useState([]);

  // Fetch student's submissions with grades
  useEffect(() => {
    if (!studentId) return;
    API.get(`/submissions/student/${studentId}`)
      .then(res => setSubmissions(res.data))
      .catch(err => console.error(err));
  }, [studentId]);

  // Fetch assignments
  useEffect(() => {
    API.get("/assignments")
      .then(res => {
        setAssignments(res.data);
        console.log("Assignments fetched:", res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssignment) return alert("Select an assignment");

    try {
      const res = await API.post("/submissions", {
        student: studentId,
        assignmentId: selectedAssignment,
        code,
        language
      });
      alert(`✅ Submission saved! Grade: ${res.data.grade}`);
      setCode("");
      setSelectedAssignment("");
      const updated = await API.get(`/submissions/student/${studentId}`);
      setSubmissions(updated.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit");
    }
  };

  // Full page styles
  const pageStyle = {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "Segoe UI, Arial, sans-serif",
    padding: "0",
    margin: "0"
  };
  const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "40px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    display: "flex",
    flexDirection: "column",
    gap: "32px"
  };
  const headingStyle = {
    color: "#2563eb",
    marginBottom: "8px",
    fontSize: "2.2rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    textAlign: "center"
  };
  const sectionStyle = {
    marginBottom: "16px"
  };
  const labelStyle = {
    display: "block",
    margin: "18px 0 6px 0",
    fontWeight: "bold"
  };
  const selectStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    marginBottom: "8px",
    fontSize: "15px"
  };
  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontFamily: "monospace",
    fontSize: "15px",
    marginBottom: "12px",
    resize: "vertical"
  };
  const buttonStyle = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "12px 0",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px"
  };
  const tableContainerStyle = {
    marginTop: "24px",
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)"
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff"
  };
  const thStyle = {
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    fontWeight: "bold",
    border: "none"
  };
  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
    textAlign: "center"
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Student Dashboard</h1>

        <form onSubmit={handleSubmit} style={sectionStyle}>
          <label style={labelStyle}>Assignments</label>
          <select
            style={selectStyle}
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
          >
            <option value="">Select Assignment</option>
            {assignments.map(a => (
              <option key={a._id} value={a._id}>
                {a.title} ({a.language} - {a.module})
              </option>
            ))}
          </select>

          <label style={labelStyle}>Submit Code</label>
          <textarea
            style={textareaStyle}
            rows="10"
            cols="50"
            placeholder="Paste your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <label style={labelStyle}>Language</label>
          <select
            style={selectStyle}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>

        <div style={tableContainerStyle}>
          <h2 style={{ color: "#1e293b", marginBottom: "16px", textAlign: "center" }}>Your Grades</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Assignment</th>
                <th style={thStyle}>Module</th>
                <th style={thStyle}>Language</th>
                <th style={thStyle}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td style={tdStyle} colSpan={4}>No submissions yet.</td>
                </tr>
              ) : (
                submissions.map(sub => (
                  <tr key={sub._id}>
                    <td style={tdStyle}>{sub.assignment.title}</td>
                    <td style={tdStyle}>{sub.assignment.module}</td>
                    <td style={tdStyle}>{sub.language}</td>
                    <td style={tdStyle}>{sub.grade}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;