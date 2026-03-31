import { useState } from "react";

function RegisterCourse() {
  const [studentId, setStudentId] = useState("69c2b7daa07479eba3772466");
  const [courseName, setCourseName] = useState("AI");
  const [result, setResult] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/student/register-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentId, courseName })
      });

      const data = await res.json();
      setResult(JSON.stringify(data));

    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Registration</h2>

      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID"
      /><br /><br />

      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
      /><br /><br />

      <button onClick={handleRegister}>Register</button>

      <p>{result}</p>
    </div>
  );
}

export default RegisterCourse;