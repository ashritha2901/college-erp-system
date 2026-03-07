import axios from "axios";
import { useEffect, useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {

const [student,setStudent] = useState(null)
const [page,setPage] = useState("profile")

useEffect(()=>{

const email = localStorage.getItem("email")

axios.get(`http://localhost:5000/student/${email}`)
.then(res=>{
  console.log("Student data:", res.data)
  setStudent(res.data)
})

},[])


// GPA CALCULATION
const calculateGPA = (semester) => {

if(!student || !student.marks) return "N/A"

const semSubjects = student.marks.filter(m => m.semester === semester)

if(semSubjects.length === 0) return "N/A"

let totalPoints = 0
let totalCredits = 0

semSubjects.forEach(m=>{

let gradePoint = 0

if(m.score>=90) gradePoint=10
else if(m.score>=80) gradePoint=9
else if(m.score>=70) gradePoint=8
else if(m.score>=60) gradePoint=7
else gradePoint=6

totalPoints += gradePoint * m.credit
totalCredits += m.credit

})

return (totalPoints/totalCredits).toFixed(2)

}


// CGPA CALCULATION
const calculateCGPA = () => {

if(!student || !student.marks) return "N/A"

let totalPoints = 0
let totalCredits = 0

student.marks.forEach(m=>{

let gradePoint = 0

if(m.score>=90) gradePoint=10
else if(m.score>=80) gradePoint=9
else if(m.score>=70) gradePoint=8
else if(m.score>=60) gradePoint=7
else gradePoint=6

totalPoints += gradePoint * m.credit
totalCredits += m.credit

})

return (totalPoints/totalCredits).toFixed(2)

}


if(!student) return <p>Loading...</p>

return(

<div className="dashboard">

{/* TOP NAVBAR */}

<div className="topnav">

<h2>🎓 College ERP</h2>

<div className="navlinks">

<button onClick={()=>setPage("profile")}>Profile</button>
<button onClick={()=>setPage("attendance")}>Attendance</button>
<button onClick={()=>setPage("marks")}>Marks</button>
<button onClick={()=>setPage("timetable")}>Timetable</button>

</div>

</div>


<div className="content">

<h1>Welcome {student.name}</h1>


{/* PROFILE */}

{page==="profile" && (

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

{student.attendance && student.attendance.length > 0 ? (

<table>

<thead>
<tr>
<th>Subject</th>
<th>Attendance</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{student.attendance.map((a,i)=>{

let message=""

if(a.percent >= 90) message="Great, keep going!"
else if(a.percent >= 80) message="Good job"
else if(a.percent >= 75) message="Cautious"
else message="Debarred"

return(

<tr key={i}>
<td>{a.subject}</td>
<td>{a.percent}%</td>
<td>{message}</td>
</tr>

)

})}

</tbody>

</table>

) : (

<p>No attendance available</p>

)}

</div>

)}



{/* MARKS */}

{page==="marks" && (

<div className="card">

<h2>Marks</h2>


{/* GPA CARDS */}

<div className="gpa-cards">

<div className="gpa-card">
<h3>Sem 1</h3>
<p>{calculateGPA(1)}</p>
</div>

<div className="gpa-card">
<h3>Sem 2</h3>
<p>{calculateGPA(2)}</p>
</div>

<div className="gpa-card">
<h3>Sem 3</h3>
<p>{calculateGPA(3)}</p>
</div>

<div className="gpa-card">
<h3>Sem 4</h3>
<p>{calculateGPA(4)}</p>
</div>

<div className="gpa-card cgpa">
<h3>CGPA</h3>
<p>{calculateCGPA()}</p>
</div>

</div>


{/* MARKS TABLE */}

<table>

<thead>

<tr>
<th>Subject</th>
<th>Marks</th>
<th>Grade</th>
</tr>

</thead>

<tbody>

{student.marks.map((m,i)=>{

let grade="C"

if(m.score>=90) grade="A"
else if(m.score>=80) grade="B"

return(

<tr key={i}>

<td>{m.subject}</td>
<td>{m.score}</td>
<td>{grade}</td>

</tr>

)

})}

</tbody>

</table>

</div>

)}



{/* TIMETABLE */}

{page==="timetable" && (

<div className="card">

<h2>Weekly Timetable</h2>

<table className="timetable">

<thead>
<tr>
<th>Slot</th>
<th>Mon</th>
<th>Tue</th>
<th>Wed</th>
<th>Thu</th>
<th>Fri</th>
</tr>
</thead>

<tbody>

{student.timetable.map((t,i)=>(

<tr key={i}>

<td>{t.slot}</td>

<td>{t.mon || "Free"}</td>
<td>{t.tue || "Free"}</td>
<td>{t.wed || "Free"}</td>
<td>{t.thu || "Free"}</td>
<td>{t.fri || "Free"}</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</div>

</div>

)

}

export default StudentDashboard