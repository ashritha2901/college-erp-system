import axios from "axios"
import {useEffect,useState} from "react"
import "./FacultyDashboard.css"

const FacultyDashboard = () => {

const [faculty,setFaculty] = useState(null)
const [students,setStudents] = useState([])
const [page,setPage] = useState("profile")

useEffect(()=>{

const email = localStorage.getItem("email")

// faculty profile
axios.get(`http://localhost:5000/faculty/${email}`)
.then(res=>setFaculty(res.data))

// students under faculty
axios.get(`http://localhost:5000/faculty/students/${email}`)
.then(res=>setStudents(res.data))

},[])

if(!faculty) return <p>Loading...</p>

return(

<div className="dashboard">

{/* TOP NAVBAR */}

<div className="topnav">

<h2>👩‍🏫 Faculty ERP</h2>

<div className="navlinks">

<button onClick={()=>setPage("profile")}>Profile</button>
<button onClick={()=>setPage("students")}>Students</button>
<button onClick={()=>setPage("marks")}>Update Marks</button>
<button onClick={()=>setPage("attendance")}>Attendance</button>

</div>

</div>

<div className="content">

<h1>Welcome {faculty.name}</h1>

{/* PROFILE */}

{page==="profile" && (

<div className="card">

<h2>Faculty Profile</h2>

<p><b>Name:</b> {faculty.name}</p>
<p><b>Email:</b> {faculty.email}</p>
<p><b>Role:</b> {faculty.role}</p>

</div>

)}

{/* STUDENTS */}

{page==="students" && (

<div className="card">

<h2>Your Students</h2>

<table>

<thead>

<tr>
<th>Roll</th>
<th>Name</th>
<th>Subject</th>
<th>Marks</th>
</tr>

</thead>

<tbody>

{students.map((s,i)=>(

<tr key={i}>
<td>{s.roll}</td>
<td>{s.name}</td>
<td>{s.subject}</td>
<td>{s.marks}</td>
</tr>

))}

</tbody>

</table>

</div>

)}

{/* UPDATE MARKS */}

{page==="marks" && (

<div className="card">

<h2>Update Marks</h2>

<table>

<thead>
<tr>
<th>Roll</th>
<th>Name</th>
<th>Subject</th>
<th>Marks</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{students.map((s,i)=>(

<tr key={i}>

<td>{s.roll}</td>
<td>{s.name}</td>
<td>{s.subject}</td>

<td>

<input
type="number"
defaultValue={s.marks}
onChange={(e)=> s.newMarks = e.target.value}
/>

</td>

<td>

<button onClick={()=>updateMarks(s)}>
Save
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

{/* ATTENDANCE */}

{page==="attendance" && (

<div className="card">

<h2>Update Attendance</h2>

<table>

<thead>
<tr>
<th>Roll</th>
<th>Name</th>
<th>Subject</th>
<th>Attendance</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{students.map((s,i)=>(

<tr key={i}>

<td>{s.roll}</td>
<td>{s.name}</td>
<td>{s.subject}</td>

<td>

<input
type="number"
defaultValue={s.attendance}
onChange={(e)=>{

s.newAttendance = e.target.value
setStudents([...students])

}}
/>

</td>

<td>

<button onClick={()=>updateAttendance(s)}>
Save
</button>

</td>

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

const updateMarks = async(student)=>{

await axios.put("http://localhost:5000/faculty/update-marks",{

email: student.email,
subject: student.subject,
marks: student.newMarks

})

alert("Marks Updated")

}

const updateAttendance = async(student)=>{

console.log("Updating:",student)

await axios.put("http://localhost:5000/faculty/update-attendance",{

email: student.email,
subject: student.subject,
attendance: student.newAttendance

})

alert("Attendance Updated")

}

export default FacultyDashboard