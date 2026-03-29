const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Service Running");
});

app.get("/student", (req, res) => {
  res.send("Student route working through gateway");
});

app.listen(5002, () => {
  console.log("Student Service running on port 5002");
});