import axios from "axios";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "./StudentDashboard.css";

const socket = io("http://localhost:5000");

const StudentDashboard = () => {

  const [student, setStudent] = useState(null);
  const [page, setPage] = useState("profile");
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!email) {
      setStudent({});
      return;
    }

    axios.get(`http://localhost:5000/student/${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStudent(res.data))
    .catch(err => {
      console.error(err);
      setStudent({});
    });

    axios.get(`http://localhost:5000/notifications/${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setNotifications(res.data.map(n => ({ message: n.message })));
    })
    .catch(err => console.error(err));

    socket.on("notification", (data) => {
      if (data.email === email) {
        setNotifications(prev => [
          { message: data.message },
          ...prev
        ]);
      }
    });

    axios.get("http://localhost:5000/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));

  }, []);

  // ✅ REGISTER
  const handleRegister = async (courseName) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/student/register-course",
        {
          studentId: student._id,
          courseName
        }
      );

      setMessage(res.data.message);

      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      const updated = await axios.get(
        `http://localhost:5000/student/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudent(updated.data);

      // 🔥 refresh courses
      const courseRes = await axios.get("http://localhost:5000/courses");
      setCourses(courseRes.data);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  // ✅ DELETE (FINAL FIXED)
  const handleDelete = async (courseName) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/student/delete-course",
        {
          studentId: student._id,
          courseName
        }
      );

      setMessage(res.data.message);

      // 🔥 INSTANT UI UPDATE (IMPORTANT)
      setStudent(prev => ({
        ...prev,
        courses: prev.courses.filter(c => c !== courseName)
      }));

      // 🔥 refresh courses (seat update)
      const courseRes = await axios.get("http://localhost:5000/courses");
      setCourses(courseRes.data);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  if (student === null) return <p>Loading...</p>;
  if (Object.keys(student).length === 0) return <p>Error loading student</p>;

  return (
    <div className="dashboard">

      <div className="topnav">

        <h2>🎓 College ERP</h2>

        <div className="nav-right">

          <div className="notif-bell" onClick={() => setShowNotif(!showNotif)}>
            🔔 {notifications.length}
          </div>

          {showNotif && (
            <div className="notif-panel">
              {notifications.length === 0 && <p>No notifications</p>}
              {notifications.map((n, i) => (
                <div key={i} className="notif-item">
                  {n.message}
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="navlinks">
          <button onClick={() => setPage("profile")}>Profile</button>
          <button onClick={() => setPage("attendance")}>Attendance</button>
          <button onClick={() => setPage("marks")}>Marks</button>
          <button onClick={() => setPage("timetable")}>Timetable</button>
          <button onClick={() => setPage("register")}>Register Course</button>
        </div>

      </div>

      <div className="content">

        <h1>Welcome {student.name}</h1>

        {/* REGISTERED COURSES */}
        {student.courses && student.courses.length > 0 && (
          <div className="card">
            <h2>Registered Courses</h2>

            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {student.courses.map((c, i) => (
                  <tr key={i}>
                    <td>{c}</td>
                    <td>
                      <button onClick={() => handleDelete(c)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PROFILE */}
        {page === "profile" && (
          <div className="card">
            <h2>Student Profile</h2>
            <div className="profilegrid">
              <p><b>Name:</b> {student.name}</p>
              <p><b>Email:</b> {student.email}</p>
              <p><b>Course:</b> {student.course}</p>
              <p><b>Semester:</b> {student.semester}</p>
              <p><b>Roll Number:</b> {student.roll}</p>
              <p><b>Phone:</b> {student.phone}</p>
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {page === "attendance" && (
          <div className="card">
            <h2>Subject Attendance</h2>

            {student.attendance?.length > 0 ? (
              <table>
                <tbody>
                  {student.attendance.map((a, i) => (
                    <tr key={i}>
                      <td>{a.subject}</td>
                      <td>{a.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No attendance</p>}
          </div>
        )}

        {/* MARKS */}
        {page === "marks" && (
          <div className="card">
            {student.marks && student.marks.length > 0 ? (
              student.marks.map((m, i) => (
                <p key={i}>{m.subject} - {m.score}</p>
              ))
            ) : <p>No marks available</p>}
          </div>
        )}

        {/* TIMETABLE */}
        {page === "timetable" && (
          <div className="card">
            {student.timetable && student.timetable.length > 0 ? (
              student.timetable.map((t, i) => (
                <p key={i}>{t.day} - {t.subject}</p>
              ))
            ) : <p>No timetable available</p>}
          </div>
        )}

        {/* REGISTER COURSE */}
        {page === "register" && (
          <div className="card">
            <h2>Register Course</h2>

            {courses.length > 0 ? (
              <table>
                <tbody>
                  {courses.map((c, i) => (
                    <tr key={i}>
                      <td>{c.name}</td>
                      <td>{c.seats}</td>
                      <td>
                        <button onClick={() => handleRegister(c.name)}>
                          Register
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No courses available</p>}

            {message && <p>{message}</p>}
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;