const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/collegeERP")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);

app.listen(5000,()=>{
console.log("Server running on port 5000");
});