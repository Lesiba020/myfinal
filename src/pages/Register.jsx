import { useState } from "react";
import API from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("✅ Registration successful, you can login now");
    } catch (err) {
      alert("❌ " + err.response.data.error);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f5f9",
    fontFamily: "Segoe UI, Arial, sans-serif"
  };
  const cardStyle = {
    background: "#fff",
    padding: "36px 32px",
    borderRadius: "12px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };
  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    marginBottom: "16px",
    width: "100%"
  };
  const buttonStyle = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 0",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    marginTop: "8px"
  };
  const titleStyle = {
    marginBottom: "24px",
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: "2rem",
    letterSpacing: "1px"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome Auto Code Grader</h1>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <h2 style={{ marginBottom: "18px", color: "#1e293b" }}>Register</h2>
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            style={inputStyle}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;