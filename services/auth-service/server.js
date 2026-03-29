const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth Service Running");
});

app.get("/auth", (req, res) => {
  res.send("Auth route working through gateway");
});

app.post("/login", (req, res) => {
  res.json({
    message: "Login handled by Auth Service"
  });
});

app.listen(5001, () => {
  console.log("Auth Service running on port 5001");
});