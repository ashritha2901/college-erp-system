import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";
import AttendanceChart from "./AttendanceChart";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="admin-container">

      <div className="sidebar">
        <h2>🎓 College ERP</h2>

        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        {role === "admin" && (
          <>
            <button onClick={() => navigate("/student")}>Students</button>
            <button onClick={() => navigate("/faculty")}>Faculty</button>
            <button onClick={() => navigate("/attendance")}>Attendance</button>
          </>
        )}

        <button
          className="logout"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div className="main">

        <h1>Welcome Admin 👋</h1>

        <div className="cards">
          <div className="card">👨‍🎓 Students<br />120</div>
          <div className="card">👨‍🏫 Faculty<br />25</div>
          <div className="card">📚 Courses<br />10</div>
          <div className="card">📝 Attendance<br />92%</div>
          
        </div>
<h2 style={{ marginTop: "40px" }}>Weekly Attendance</h2>
<AttendanceChart />

      </div>
    </div>
  );
};

export default DashboardLayout;
