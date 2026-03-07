const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const JWT_SECRET = "collegeerpsecret";
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/collegeERP")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* ---------------- STUDENT MODEL ---------------- */

const Student = mongoose.model("Student",{
email:String,
name:String,
roll:String,
course:String,
attendance:Array,
marks:Array,
timetable:Array
})

app.get("/student/:email",async(req,res)=>{

const student = await Student.findOne({email:req.params.email})
res.json(student)

})


/* ---------------- USER MODEL ---------------- */

const User = mongoose.model("User",{
email:String,
password:String,
role:String,
name:String
})




/* ---------------- LOGIN API ---------------- */

app.post("/login", async (req,res)=>{

const {email,password} = req.body

try{

const user = await User.findOne({email})

if(!user){
return res.status(401).json({message:"User not found"})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.status(401).json({message:"Wrong password"})
}

const token = jwt.sign(
{ id:user._id, role:user.role },
JWT_SECRET,
{ expiresIn:"1h" }
)

res.json({
token,
role:user.role,
email:user.email
})

}catch(err){

console.log(err)
res.status(500).json({message:"Login failed"})

}

})

app.post("/signup", async (req,res)=>{

const {name,email,password,role} = req.body

try{

const existingUser = await User.findOne({email})

if(existingUser){
return res.status(400).json({message:"User already exists"})
}

const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashedPassword,
role
})

await user.save()

res.json({message:"User created successfully"})

}catch(err){

console.log(err)
res.status(500).json({message:"Signup failed"})

}

})

/* ---------------- FACULTY PROFILE ---------------- */

app.get("/faculty/:email",async(req,res)=>{

const faculty = await User.findOne({email:req.params.email})

res.json(faculty)

})


/* ---------------- UPDATE ATTENDANCE ---------------- */

app.put("/faculty/update-attendance",async(req,res)=>{

const {email,subject,attendance} = req.body

const student = await Student.findOne({email})

if(!student){
return res.status(404).json({message:"Student not found"})
}

student.attendance = student.attendance.map(a=>{

if(a.subject === subject){
return {...a,percent:Number(attendance)}
}

return a

})

await student.save()

res.json({message:"Attendance updated successfully"})

})


/* ---------------- UPDATE MARKS ---------------- */

app.put("/faculty/update-marks",async(req,res)=>{

const {email,subject,marks} = req.body

const student = await Student.findOne({email})

if(!student){
return res.status(404).json({message:"Student not found"})
}

student.marks = student.marks.map(m=>{

if(m.subject === subject){
return {...m,score:Number(marks)}
}

return m

})

await student.save()

res.json({message:"Marks updated successfully"})

})


/* ---------------- FACULTY STUDENTS ---------------- */

app.get("/faculty/students/:email",async(req,res)=>{

const facultyEmail = req.params.email
const students = await Student.find()

let result = []

students.forEach(student=>{

student.marks.forEach(m=>{

if(m.faculty === facultyEmail){

let att = student.attendance.find(
a=>a.subject === m.subject
)

result.push({
roll:student.roll,
name:student.name,
email:student.email,
subject:m.subject,
marks:m.score,
attendance:att ? att.percent : 0
})

}

})

})

res.json(result)

})


app.listen(5000,()=>{
console.log("Server running on port 5000")
})