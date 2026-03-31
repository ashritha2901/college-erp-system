const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: String,
    message: String,
    createdAt: Date
});

module.exports = mongoose.model("Notification", notificationSchema);