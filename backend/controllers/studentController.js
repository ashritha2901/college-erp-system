const redis = require("../config/redis");
const Student = require("../models/Student");
const Course = require("../models/Course");

exports.registerCourse = async (req, res) => {
  const { studentId, courseName } = req.body;

  const lockKey = `lock:course:${courseName}`;

  try {
    // 🔐 Acquire Lock (Concurrency Control)
    const isLocked = await redis.set(lockKey, "locked", {
      NX: true,
      EX: 10
    });

    if (!isLocked) {
      console.log("❌ Lock NOT acquired for:", courseName);
      return res.status(400).json({
        message: "⚠️ Another registration is in progress. Try again."
      });
    }

    console.log("🔐 Lock acquired for:", courseName);

    // 🔍 Fetch Student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // ❌ Prevent duplicate course registration
    if (student.courses.includes(courseName)) {
      return res.status(400).json({
        message: "⚠️ Course already registered"
      });
    }

    // 🔍 Fetch Course
    const course = await Course.findOne({ name: courseName });

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // ❌ Seat limit check
    if (course.seats <= 0) {
      return res.status(400).json({
        message: "❌ No seats available"
      });
    }

    // 🧪 OPTIONAL: Delay for demo (uncomment for testing concurrency)
    // await new Promise(resolve => setTimeout(resolve, 5000));

    // ✅ Critical Section
    course.seats -= 1;
    student.courses.push(courseName);

    await course.save();
    await student.save();

    console.log("✅ Course registered:", courseName);

    res.status(200).json({
      message: "✅ Course registered successfully",
      remainingSeats: course.seats,
      student
    });

  } catch (err) {
    console.error("❌ Error:", err.message);

    res.status(500).json({
      message: "❌ Server Error",
      error: err.message
    });

  } finally {
    // 🔓 Release Lock
    try {
      await redis.del(lockKey);
      console.log("🔓 Lock released for:", courseName);
    } catch (e) {
      console.error("Error releasing lock:", e.message);
    }
  }
};


exports.deleteCourse = async (req, res) => {
  const { studentId, courseName } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findOne({ name: courseName });

    if (!student || !course) {
      return res.status(404).json({ message: "Not found" });
    }

    // ❌ VERY IMPORTANT FIX
    if (!student.courses.includes(courseName)) {
      return res.status(400).json({
        message: "Course not registered"
      });
    }

    // ✅ remove only once
    student.courses = student.courses.filter(c => c !== courseName);

    // ✅ increase seat only once
    course.seats += 1;

    await student.save();
    await course.save();

    res.json({ message: "Course deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};