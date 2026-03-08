const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

/* GET notifications for a user */

router.get("/:email", async (req,res)=>{

const notifications = await Notification.find({
email:req.params.email
}).sort({createdAt:-1});

res.json(notifications);

});

module.exports = router;