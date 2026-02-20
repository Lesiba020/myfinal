import { useState } from "react";
import API from "../api";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setAuth(true);
      alert("✅ Login successful");
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
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <h2 style={{ marginBottom: "18px", color: "#1e293b" }}>Login</h2>
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
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;