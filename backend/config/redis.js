
const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379"
});

redisClient.connect()
.then(()=>console.log("Redis Connected"))
.catch(err=>console.log(err));

module.exports = redisClient;