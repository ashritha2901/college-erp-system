const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Faculty Service Running");
});

app.get("/faculty", (req, res) => {
  res.send("Faculty route working through gateway");
});

app.listen(5003, () => {
  console.log("Faculty Service running on port 5003");
});