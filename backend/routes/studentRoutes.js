const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const auth = require("../middleware/auth");
const redisClient = require("../config/redis")
router.get("/:email", async(req,res)=>{

const email = req.params.email

/* CHECK CACHE FIRST */

const cachedStudent = await redisClient.get(email)

if(cachedStudent){
console.log("Serving from Redis cache")
return res.json(JSON.parse(cachedStudent))
}

/* FETCH FROM DATABASE */

const student = await Student.findOne({email})

if(!student){
return res.status(404).json({message:"Student not found"})
}

/* SAVE IN CACHE */

await redisClient.setEx(email,60,JSON.stringify(student))

console.log("Serving from MongoDB")

res.json(student)

})

module.exports = router;