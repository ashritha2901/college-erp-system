const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const auth = require("../middleware/auth");

router.get("/:email", auth, async(req,res)=>{

const student = await Student.findOne({email:req.params.email});

res.json(student);

});

module.exports = router;