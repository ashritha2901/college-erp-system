const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  email: String,
  name: String,
  roll: String,
  course: String,
  attendance: Array,
  marks: Array,
  timetable: Array
});

module.exports = mongoose.model("Student", StudentSchema);