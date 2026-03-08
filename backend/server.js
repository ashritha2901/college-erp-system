const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");

const redisClient = require("./config/redis");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{origin:"*"}
});

app.set("io", io);

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/collegeERP")
.then(()=>console.log("MongoDB Connected"));

app.use("/auth", authRoutes);
app.use("/faculty", facultyRoutes);
app.use("/student", studentRoutes);

io.on("connection",(socket)=>{
  console.log("User connected:",socket.id);
});

server.listen(5000,()=>{
  console.log("Server running on port 5000");
});