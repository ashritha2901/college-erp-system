const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: String,
  seats: Number
});

module.exports = mongoose.model("Course", CourseSchema);