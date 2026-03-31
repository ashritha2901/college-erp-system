const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const studentController = require("../controllers/studentController");
const auth = require("../middleware/auth");
const redisClient = require("../config/redis");
const sendMessage = require("../messageQueue/producer");

/* ===========================
   REGISTER STUDENT (MQ + DUPLICATE HANDLING)
=========================== */
router.post("/register", async (req, res) => {
  try {
    const studentData = req.body;

    const newStudent = await Student.create(studentData);

    // ✅ Send to RabbitMQ
    await sendMessage("studentQueue", {
      type: "NEW_STUDENT",
      data: newStudent
    });

    console.log("Message sent to RabbitMQ");

    res.status(201).json(newStudent);

  } catch (err) {

    // ✅ Handle duplicate email
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Student already exists"
      });
    }

    res.status(500).json({ message: err.message });
  }
});


/* ===========================
   GET STUDENT (WITH REDIS CACHE)
=========================== */
router.get("/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const cachedStudent = await redisClient.get(email);

    if (cachedStudent) {
      console.log("⚡ Serving from Redis cache");
      return res.json(JSON.parse(cachedStudent));
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await redisClient.setEx(email, 60, JSON.stringify(student));

    console.log("📦 Serving from MongoDB");

    res.json(student);

  } catch (err) {
    res.status(500).json({
      error: "Server Error",
      details: err.message
    });
  }
});


/* ===========================
   REGISTER COURSE (CONCURRENCY)
=========================== */
router.post("/register-course", studentController.registerCourse);
router.post("/delete-course", studentController.deleteCourse);

module.exports = router;