const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    roll: {
      type: String,
      required: true,
      unique: true
    },

    // ✅ Multiple courses (important for your concurrency logic)
    courses: {
      type: [String],
      default: []
    },

    // ✅ Attendance as structured data
    attendance: [
      {
        subject: String,
        percentage: Number
      }
    ],

    // ✅ Marks structured
    marks: [
      {
        subject: String,
        score: Number
      }
    ],

    // ✅ Timetable structure
    timetable: [
      {
        day: String,
        subject: String,
        time: String
      }
    ],

    // 🔥 IMPORTANT: Optimistic Locking field
    version: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Student", StudentSchema);