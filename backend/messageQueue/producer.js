const connectQueue = require('./connection');

async function sendMessage(queue, message) {
    try {
        const channel = await connectQueue(); // ✅ reuses same shared channel

        await channel.assertQueue(queue, { durable: true });

        channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message)),
            { persistent: true }
        );

        console.log("📤 Message sent:", message);

    } catch (error) {
        console.error("❌ Error sending message:", error.message); // ✅ .message instead of full error object
    }
    // ✅ No channel.close() here — shared channel must stay open for reuse
}

module.exports = sendMessage;