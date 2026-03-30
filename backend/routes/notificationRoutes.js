const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");


/* ===========================
   GET ALL NOTIFICATIONS (for demo)
=========================== */

router.get("/", async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 });

        res.json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* ===========================
   GET NOTIFICATIONS BY EMAIL
=========================== */

router.get("/:email", async (req, res) => {
    try {
        const notifications = await Notification.find({
            email: req.params.email
        }).sort({ createdAt: -1 });

        res.json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;