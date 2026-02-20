import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LecturerDashboard from "./pages/LecturerDashboard";
import StudentDashboard from "./pages/StudentDashboard";



function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth(false);
  };

  if (!auth) {
    return (
      <div>
        <Login setAuth={setAuth} />
        <Register />
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Role: {role}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* Render dashboards based on role */}
      {role === "lecturer" && <LecturerDashboard />}
      {role === "student" && <StudentDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;

