const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB Compass
mongoose.connect("mongodb://localhost:27017/collegeERP")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const Student = mongoose.model("Student", {
  email: String,
  name: String,
  roll: String,
  course: String,
  attendance: Array,
  marks: Array,
  timetable: Array
});
app.get("/student/:email", async (req,res)=>{
  const student = await Student.findOne({email:req.params.email});
  res.json(student);
});
// schema
const Attendance = mongoose.model("Attendance", {
  name: String,
  course: String,
  attendance: String
});

const User = mongoose.model("User", {
  email: String,
  password: String,
  role: String
});

app.post("/login", async (req,res)=>{
  const {email, password} = req.body;

  const user = await User.findOne({email, password});

  if(!user){
    return res.status(401).json({message:"Invalid login"});
  }

  res.json(user);
});

// add attendance
app.post("/attendance", async (req,res)=>{
  const data = new Attendance(req.body);
  await data.save();
  res.json(data);
});

// view attendance
app.get("/attendance", async (req,res)=>{
  const data = await Attendance.find();
  res.json(data);
});

app.get("/faculty/:email", async (req,res)=>{

const faculty = await User.findOne({email:req.params.email})

res.json(faculty)

})

app.put("/faculty/update-attendance", async (req,res)=>{

console.log("Request Body:", req.body)

const {email, subject, attendance} = req.body

const student = await Student.findOne({email})

if(!student){
return res.status(404).json({message:"Student not found"})
}

student.attendance = student.attendance.map(a => {

if(a.subject === subject){
return {...a, percent: Number(attendance)}
}

return a

})

await student.save()

res.json({message:"Attendance updated successfully"})

})

app.put("/faculty/update-marks", async (req,res)=>{

const {email, subject, marks} = req.body

try{

const student = await Student.findOne({email})

if(!student){
return res.status(404).json({message:"Student not found"})
}

for(let i=0;i<student.marks.length;i++){

if(student.marks[i].subject === subject){

student.marks[i].score = Number(marks)

}

}

await student.save()

res.json({message:"Marks updated successfully"})

}catch(err){

console.log(err)
res.status(500).json({message:"Update failed"})

}

})

app.listen(5000, ()=>{
  console.log("Server running on port 5000");
});
app.get("/faculty/students/:email", async (req,res)=>{

const facultyEmail = req.params.email
const students = await Student.find()

let result = []

students.forEach(student=>{

if(student.marks){

student.marks.forEach(m=>{

if(m.faculty === facultyEmail){

// find attendance for the same subject
let att = student.attendance.find(
a => a.subject === m.subject
)

result.push({
roll: student.roll,
name: student.name,
email: student.email,
subject: m.subject,
marks: m.score,
attendance: att ? att.percent : 0
})

}

})

}

})

res.json(result)

})