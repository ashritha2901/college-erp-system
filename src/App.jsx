import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import AdminModule from "./pages/AdminModule";
import StudentDashboard from "./pages/student/StudentDashboard";
import Attendance from "./pages/student/Attendance";
import ForgotPassword from "./pages/ForgotPassword";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import RegisterCourse from "./pages/RegisterCourse";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route path="/admin" element={<AdminModule />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/register-course" element={<RegisterCourse />} />
    </Routes>
  );
}

export default App;
