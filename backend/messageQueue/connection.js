const amqp = require('amqplib');

let connection = null;
let channel = null;

async function connectQueue() {
    try {
        if (channel) return channel;

        console.log('Connecting to RabbitMQ...');
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();

        // ✅ Assert queue HERE so it always exists
        await channel.assertQueue('studentQueue', {
            durable: true,
            autoDelete: false
        });

        console.log('✅ RabbitMQ Connected & studentQueue ready');

        connection.on('close', () => {
            console.warn('⚠️ RabbitMQ connection closed');
            channel = null;
            connection = null;
        });

        connection.on('error', (err) => {
            console.error('❌ RabbitMQ error:', err.message);
            channel = null;
            connection = null;
        });

        return channel;

    } catch (error) {
        console.error('❌ RabbitMQ Connection Failed:', error.message);
        throw error;
    }
}

module.exports = connectQueue;