const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const User = require("../models/User");
const redisClient = require("../config/redis");

// ✅ IMPORT PRODUCER
const sendMessage = require("../messageQueue/producer");


/* ===========================
   GET FACULTY PROFILE
=========================== */

router.get("/:email", async (req, res) => {
  try {
    const faculty = await User.findOne({ email: req.params.email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json(faculty);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ===========================
   GET STUDENTS UNDER FACULTY
=========================== */

router.get("/students/:email", async (req, res) => {
  try {
    const facultyEmail = req.params.email;

    const students = await Student.find();
    let result = [];

    students.forEach(student => {
      if (student.marks) {
        student.marks.forEach(m => {
          if (m.faculty === facultyEmail) {

            let att = student.attendance.find(
              a => a.subject === m.subject
            );

            result.push({
              roll: student.roll,
              name: student.name,
              email: student.email,
              subject: m.subject,
              marks: m.score,
              attendance: att ? att.percent : 0
            });

          }
        });
      }
    });

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ===========================
   UPDATE MARKS (MQ INTEGRATION)
=========================== */

router.put("/update-marks", async (req, res) => {
  try {

    const { email, subject, marks } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // UPDATE MARKS
    student.marks = student.marks.map(m => {
      if (m.subject === subject) {
        return { ...m, score: Number(marks) };
      }
      return m;
    });

    await student.save();

    // DELETE CACHE
    await redisClient.del(email);

    // ✅ SEND MESSAGE TO RABBITMQ (INSTEAD OF DIRECT DB SAVE)
    await sendMessage("studentQueue", {
      type: "MARKS_UPDATED",
      data: {
        email: email,
        subject: subject,
        marks: marks
      }
    });

    console.log("Marks update event sent to RabbitMQ");

    // SOCKET EVENT (optional, keep it)
    const io = req.app.get("io");

    io.emit("notification", {
      email,
      message: `Marks updated for ${subject}`
    });

    res.json({ message: "Marks updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});


module.exports = router;