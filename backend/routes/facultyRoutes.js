const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const auth = require("../middleware/auth");

router.put("/update-marks", auth, async(req,res)=>{

const {email,subject,marks} = req.body;

const student = await Student.findOne({email});

student.marks = student.marks.map(m=>{
if(m.subject === subject){
return {...m, score:Number(marks)}
}
return m;
});

await student.save();

res.json({message:"Marks updated"});

});

module.exports = router;