let redisClient;

try {
  const redis = require("redis");

  redisClient = redis.createClient({
    url: "redis://127.0.0.1:6379"
  });

  redisClient.on("error", (err) => {
    console.log("⚠️ Redis not available, using fallback");
  });

  (async () => {
    try {
      await redisClient.connect();
      console.log("✅ Redis Connected");
    } catch (err) {
      console.log("⚠️ Redis Connection Failed (fallback mode)");
    }
  })();

} catch (err) {
  console.log("⚠️ Redis package not found, using fallback");
}

// 🔥 FALLBACK (NO REDIS)
const fallback = {
  async set() { return "OK"; },
  async get() { return null; },
  async del() { return; }
};

// 👉 Export Redis if available, else fallback
module.exports = redisClient || fallback;