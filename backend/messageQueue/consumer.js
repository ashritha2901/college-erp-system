const mongoose = require("mongoose");
const connectQueue = require("./connection");
const Notification = require("../models/Notification");

mongoose.connect("mongodb://localhost:27017/collegeERP")
    .then(() => console.log("MongoDB connected in consumer"))
    .catch(err => console.error("MongoDB connection error:", err));

async function receiveMessage(queue) {
    const channel = await connectQueue();

    // ✅ Assert queue with autoDelete: false so it survives
    await channel.assertQueue(queue, { 
        durable: true,
        autoDelete: false  // ← ADD THIS
    });

    // ✅ Prefetch keeps connection alive
    channel.prefetch(1);

    console.log("Waiting for messages...");

    channel.consume(queue, async (msg) => {
        try {
            const data = JSON.parse(msg.content.toString());
            console.log("Received:", data);

            let message = "";
            let email = "";

            if (data.type === "NEW_STUDENT") {
                message = `New student registered: ${data.data.email}`;
                email = data.data.email;
            } else if (data.type === "MARKS_UPDATED") {
                message = `Marks updated for ${data.data.subject}: ${data.data.marks}`;
                email = data.data.email;
            } else {
                message = "Unknown event received";
            }

            await Notification.create({
                type: data.type,
                email: email,
                message: message,
                createdAt: new Date()
            });

            console.log("Notification saved to DB");
            channel.ack(msg);

        } catch (error) {
            console.error("Error processing message:", error);
        }
    });
}

receiveMessage("studentQueue");