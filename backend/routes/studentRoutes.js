const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const auth = require("../middleware/auth");
const redisClient = require("../config/redis");

// ✅ IMPORT MESSAGE QUEUE PRODUCER
const sendMessage = require("../messageQueue/producer");


/* ===========================
   GET STUDENT BY EMAIL (CACHE)
=========================== */

router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;

        /* CHECK CACHE FIRST */
        const cachedStudent = await redisClient.get(email);

        if (cachedStudent) {
            console.log("Serving from Redis cache");
            return res.json(JSON.parse(cachedStudent));
        }

        /* FETCH FROM DATABASE */
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        /* SAVE IN CACHE */
        await redisClient.setEx(email, 60, JSON.stringify(student));

        console.log("Serving from MongoDB");

        res.json(student);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* ===========================
   REGISTER STUDENT (MQ ADDED)
=========================== */

router.post("/register", async (req, res) => {
    try {
        const studentData = req.body;

        // SAVE TO DATABASE
        const newStudent = await Student.create(studentData);

        // ✅ SEND MESSAGE TO QUEUE
        await sendMessage("studentQueue", {
            type: "NEW_STUDENT",
            data: newStudent
        });

        console.log("Message sent to RabbitMQ");

        res.status(201).json(newStudent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;