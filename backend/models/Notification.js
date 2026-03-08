const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);